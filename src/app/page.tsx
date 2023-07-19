"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Briefcase, ChevronsUpDown, X } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function formatItemName(name: string) {
  return name.toLowerCase().replace(/'/g, "").replace(/ /g, "-");
}

function formatBonusId(bonusId?: string) {
  if (!bonusId) {
    return "";
  }

  return bonusId.split("/").join(":");
}

export default function Home() {
  const [simcInput, setSimcInput] = useState("");
  const [setPieces, setSetPieces] = useState<string[] | undefined>(undefined);

  const formSchema = z.object({
    search: z.string(),
    items: z.array(
      z.object({
        itemId: z.string(),
        name: z.string(),
        itemLevel: z.number(),
      })
    ),
  });

  type GearSelection = z.infer<typeof formSchema>;

  const form = useForm<GearSelection>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      items: [],
    },
  });

  const {
    fields: items,
    append,
    remove,
  } = useFieldArray({
    name: "items",
    control: form.control,
  });

  console.log("items", items);

  function createWowheadTooltipUrl(item) {
    return `https://www.wowhead.com/item=${item.itemId}/${formatItemName(
      item.name
    )}?bonus=${formatBonusId(item.bonus_id)}&ilvl=${
      item.itemLevel
    }&spec=103&pcs=${setPieces?.join(":")}`;
  }

  async function getSearchedItems(searchQuery: string) {
    const queryParams = new URLSearchParams();

    queryParams.set("search", searchQuery);
    // classId=8&specId=64&plvl=70&locale=en_US

    queryParams.set("classId", "8");
    queryParams.set("specId", "64");
    queryParams.set("plvl", "70");
    queryParams.set("locale", "en_US");

    const response = await axios.get(`http://localhost:3000/api/item`, {
      params: queryParams,
    });

    return response.data;
  }

  async function submitGear(values) {}

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:3000/api/simc-items",
      simcInput
    );

    const gearItems = Object.values(response.data.items).map((item, index) => {
      return {
        key: Object.keys(response.data.items)[index],
        itemId: item.id,
        ...item,
      };
    });

    form.setValue("items", gearItems);

    const setPieces: string[] = [];

    for (const item of gearItems) {
      if (item.itemSetId) {
        setPieces.push(item.id);
      }
    }

    setSetPieces(setPieces);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 w-full max-w-xl">
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center justify-center"
      >
        <Card className="h-full w-full max-w-lg overflow-scroll">
          <CardHeader>
            <CardTitle>Simulation Craft Input</CardTitle>
            <CardDescription>
              Copy/paste the text from the SimulationCraft addon. How to install
              and use the SimC addon
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <Textarea
              className="min-h-[200px]"
              value={simcInput}
              onChange={(e) => setSimcInput(e.target.value)}
              placeholder="Paste your simc input here."
            />
          </CardContent>
          <CardFooter>
            <div className="flex flex-row gap-x-2">
              <Button type="submit">Submit</Button>
            </div>
          </CardFooter>
        </Card>
      </form>
      {items.length !== 0 && (
        <Card className="h-full w-full max-w-lg overflow-scroll">
          <CardHeader>
            <CardTitle>Gear To Output</CardTitle>
            <CardDescription>
              Export the selected gear as a simc output.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(submitGear)}
                className="space-y-6 w-full"
              >
                {items.map((item, index) => (
                  <Popover key={item.itemId}>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search Item..."
                          onChangeCapture={(event) => {
                            const inputValue =
                              // @ts-ignore
                              event.target.value.toLowerCase();
                          }}
                        />
                        <CommandEmpty>No Items Found.</CommandEmpty>
                        <CommandGroup>
                          <ScrollArea className="h-72"></ScrollArea>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                    <div
                      key={item.itemId}
                      className="flex flex-row items-end justify-center w-full gap-x-2 rounded-lg bg-muted p-2 py-4"
                    >
                      <Button
                        key={item.id}
                        className="p-0.5 h-10 w-10 bg-blue-800 flex-none"
                      >
                        <Link
                          className="relative h-9 w-9 rounded-md overflow-hidden"
                          href={createWowheadTooltipUrl(item)}
                        >
                          <Image
                            src={`https://www.raidbots.com/static/images/icons/56/${item.icon}.png`}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            alt={item.name}
                          />
                        </Link>
                      </Button>
                      <div className="space-y-2 w-full flex-auto flex flex-col">
                        <Label>Item Name</Label>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            className="flex flex-row justify-start gap-x-3 grow whitespace-nowrap overflow-hidden"
                          >
                            {item.name}
                            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                      </div>
                      <FormField
                        control={form.control}
                        name={`items.${index}.itemLevel`}
                        render={({ field }) => (
                          <FormItem className="space-y-2 w-full flex-auto flex flex-col">
                            <FormLabel className="whitespace-nowrap">
                              Item Level
                            </FormLabel>
                            <Input {...field} />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        onClick={() => {
                          console.log(index);
                          remove(index);
                        }}
                        variant="outline"
                        type="button"
                        className="h-10 w-10 rounded-full"
                      >
                        <X className="h-5 w-5 flex-shrink-0" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </Popover>
                ))}
                <div className="flex flex-row gap-x-2">
                  <Button type="submit">Output</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      <Script src="https://wow.zamimg.com/js/tooltips.js" />
      <Script src="/scripts/wowheadTooltip.js" />
    </main>
  );
}
