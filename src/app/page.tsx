"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosResponse } from "axios";
import { useCallback, useEffect } from "react";
import Script from "next/script";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { createGemTooltipUrl, createTooltipUrl } from "@/lib/wowhead";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronsUpDown, X } from "lucide-react";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { qualityTypeToColour, raidbotsQueryParamAdapter } from "@/lib/raidbots";
import { extractGearFromInput } from "@/lib/simc";
import {
  GetItemInfoResponse,
  GetItemInfoRequest,
} from "@/types/contracts/GetItemInfo";
import { gearOutputSchema } from "@/types/schemas/GearOutputSchema";

export default function Home() {
  type Schema = z.infer<typeof gearOutputSchema>;

  const form = useForm<Schema>({
    resolver: zodResolver(gearOutputSchema),
    defaultValues: {
      gearInfo: undefined,
      gearStats: undefined,
      simcInput: "",
    },
  });

  const [simcInput, gearInfo] = form.watch(["simcInput", "gearInfo"]);

  const fetchItemInfo = useCallback(
    async (gear: any, params: URLSearchParams) => {
      const response = await axios.post<
        string,
        AxiosResponse<GetItemInfoResponse>,
        GetItemInfoRequest
      >(
        "http://localhost:3000/api/item-info",
        { gear },
        {
          params,
        }
      );

      console.log("gearStats", gear);

      form.setValue("gearInfo", response.data);
    },
    [form]
  );

  function createQueryParamsFromInput(simcInput: string) {
    const lines: string[] = simcInput.split("\n");

    const possibleClassLines = [
      "deathknight=",
      "demonhunter=",
      "druid=",
      "hunter=",
      "mage=",
      "monk=",
      "paladin=",
      "priest=",
      "rogue=",
      "shaman=",
      "warlock=",
      "warrior=",
      "evoker=",
    ];

    const linesToKeep = [
      "level=",
      "race=",
      "region=",
      "server=",
      "role=",
      "professions=",
      "spec=",
      ...possibleClassLines,
    ];

    const filteredLines = lines.filter((line) => {
      // Only keep line if it starts with a lineToKeep.
      return linesToKeep.some((lineToKeep) => line.startsWith(lineToKeep));
    });

    const params = raidbotsQueryParamAdapter(filteredLines);

    return params;
  }

  useEffect(() => {
    if (simcInput) {
      // Your input data here
      const gear = extractGearFromInput(simcInput);

      const queryParams = createQueryParamsFromInput(simcInput);

      fetchItemInfo(gear, queryParams);
    }
  }, [simcInput, fetchItemInfo]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 md:p-6 w-full">
      <Form {...form}>
        <form className="flex flex-col items-center w-full justify-center">
          <Card className="h-full w-full overflow-scroll max-w-lg">
            <CardHeader>
              <CardTitle>Simulation Craft Input</CardTitle>
              <CardDescription className="flex flex-col gap-y-2 w-full">
                Copy/paste the text from the SimulationCraft addon.
                <Link
                  className="font-medium text-white underline"
                  href="https://support.raidbots.com/article/54-installing-and-using-the-simulationcraft-addon"
                >
                  How to install and use the SimC addon
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-y-4">
              <FormField
                control={form.control}
                name="simcInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Simc Input</FormLabel>
                    <FormControl>
                      <Textarea
                        className="min-h-[200px]"
                        {...field}
                        placeholder="Paste your simc input here."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          {gearInfo && (
            <Card className="h-full w-full overflow-scroll">
              <CardHeader>
                <CardTitle>Gear To Output</CardTitle>
                <CardDescription>
                  Add the items you want and then export the gear as a simc output.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
                {Object.entries(gearInfo).map(([slot, items]) => {
                  if (items.length === 0) {
                    return null;
                  }

                  return (
                    <section className="space-y-6 rounded-lg p-4" key={slot}>
                      <Popover>
                        <Label className="text-xl uppercase font-semibold">
                          {slot}
                        </Label>
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex flex-row items-start flex-wrap w-full gap-x-3 gap-y-4 relative bg-muted p-3 rounded-lg"
                          >
                            <Button
                              className="p-0.5 h-10 w-10 flex-none"
                              style={{
                                backgroundColor: qualityTypeToColour(
                                  item.quality
                                ),
                              }}
                            >
                              <Link
                                className="relative h-9 w-9 rounded-md overflow-hidden"
                                href={createTooltipUrl(item)}
                              >
                                <Image
                                  src={`https://www.raidbots.com/static/images/icons/56/${item.icon}.png`}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  alt={item.name}
                                />
                              </Link>
                            </Button>
                            <div className="space-y-1 w-full max-w-[calc(100%-3.25rem)] flex flex-col">
                              <h1 className="truncate text-base font-bold leading-5">
                                {item.name}
                              </h1>
                              <p className="truncate text-sm">
                                {item.itemLevel}
                              </p>
                              {item.socketInfo.PRISMATIC && (
                              <div className="flex flex-row gap-x-2">
                              {item.socketInfo.PRISMATIC.gems.map(
                                (gem, i) => (
                                  <Link
                                    key={i}
                                    className="relative h-5 w-5 rounded-md overflow-hidden"
                                    href={createGemTooltipUrl(gem)}
                                  >
                                    <Image
                                      src={`https://www.raidbots.com/static/images/icons/56/${gem.itemIcon}.png`}
                                      fill
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      alt={item.name}
                                    />
                                    {gem.craftingQuality && (
                                      <Image
                                        src={`https://www.raidbots.com/images/crafting-quality-${gem.craftingQuality}.png`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        alt="Crafting Quality"
                                      />
                                    )}
                                  </Link>
                                )
                              )}
                            </div>
                              )}
                            </div>

                            {/* {gearSlotOptionsConfig[item.slot].map((option) =>
                          renderGearConfigComponent(
                            option,
                            form.control,
                            `items.${index}.itemLevel`
                          )
                        )} */}
                            <Button
                              onClick={() => {
                                console.log("hi");
                              }}
                              variant="outline"
                              type="button"
                              className="h-10 w-10 rounded-full absolute -right-4 -top-4"
                            >
                              <X className="h-5 w-5 flex-shrink-0" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        ))}
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
                        <PopoverTrigger asChild>
                          <Button>Add Item</Button>
                        </PopoverTrigger>
                      </Popover>
                    </section>
                  );
                })}
                <div className="flex flex-row gap-x-2">
                  <Button type="submit">Output</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </form>
      </Form>
      <Script src="https://wow.zamimg.com/js/tooltips.js" />
      <Script src="/scripts/wowheadTooltip.js" />
    </main>
  );
}
