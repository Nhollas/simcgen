"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
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

import enchantments from "@/lib/data/enchantments.json";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ClipboardCopy, RocketIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { inventoryTypeToSlot, qualityTypeToColour } from "@/lib/raidbots";
import {
  createQueryParamsFromInput,
  createSimcOutputFromInfo,
  extractCharacterInfoFromInput,
  extractGearFromInput,
} from "@/lib/simc";
import {
  GetItemInfoResponse,
  GetItemInfoRequest,
} from "@/types/contracts/GetItemInfo";
import {
  GearOutputSchema,
  GemSchema,
  gearOutputSchema,
} from "@/types/schemas/GearOutputSchema";
import { Badge } from "@/components/ui/badge";
import { ItemSchema } from "@/types/schemas/GetItemSchema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { exampleInput } from "@/lib/utils";

export default function Home() {
  const form = useForm<GearOutputSchema>({
    resolver: zodResolver(gearOutputSchema),
    defaultValues: {
      gearInfo: undefined,
      simcInput: localStorage?.getItem("simcInput") || "",
      characterInfo: undefined,
    },
  });

  const [searchedItems, setSearchedItems] = useState<ItemSchema[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const { watch, setValue, formState } = form;

  const [simcInput, gearInfo] = watch(["simcInput", "gearInfo"]);

  console.log("searchedItems", searchedItems);

  console.log("formstate", formState.errors);

  useEffect(() => {
    let isMounted = true;

    async function fetchItemInfo(gear: any, params: URLSearchParams) {
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

      if (isMounted) {
        console.log("response", response.data);
        setValue("gearInfo", response.data);
      }
    }

    const gear = extractGearFromInput(simcInput);
    const characterInfo = extractCharacterInfoFromInput(simcInput) as any;

    setValue("characterInfo", characterInfo);

    const queryParams = createQueryParamsFromInput(simcInput);

    fetchItemInfo(gear, queryParams);

    localStorage.setItem("simcInput", simcInput);

    return () => {
      isMounted = false;
    };
  }, [simcInput, setValue]);

  function handleSubmitTest(values: GearOutputSchema) {
    console.log("data", values);

    const simcExport = createSimcOutputFromInfo(values);

    console.log("simcExport", simcExport);

    // Make the user copy the output
    navigator.clipboard.writeText(simcExport);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 md:p-6 w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmitTest)}
          className="flex flex-col items-center w-full justify-center space-y-8"
        >
          <Card className="h-full w-full overflow-scroll max-w-3xl relative">
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
                <Button
                  className="self-end"
                  type="button"
                  onClick={() => form.setValue("simcInput", exampleInput)}
                >
                  Show Example
                </Button>
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
            <Card className="h-full w-full relative">
              <CardHeader>
                <CardTitle>Gear To Output</CardTitle>
                <CardDescription>
                  Add the items you want and then export the gear as a simc
                  output.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-6">
                <div className="sticky top-6 inset-x-0 z-50 flex justify-center">
                  <div className="max-w-lg bg-muted/75 p-2 rounded-lg w-full grid grid-cols-2 gap-4">
                    <Popover open={searchOpen} onOpenChange={setSearchOpen}>
                      <PopoverTrigger
                        onClick={() => setSearchOpen(true)}
                        asChild
                        className="w-full max-w-lg"
                      >
                        <Button variant="outline">Add Item</Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search Item..."
                            onChangeCapture={(event) => {
                              const inputValue =
                                // @ts-ignore
                                event.target.value.toLowerCase();

                              console.log("inputValue", inputValue);

                              if (inputValue === "") {
                                setSearchedItems([]);
                                return;
                              }

                              axios
                                .get("http://localhost:3000/api/items", {
                                  params: {
                                    query: inputValue,
                                  },
                                })
                                .then((response) => {
                                  console.log("response", response);
                                  setSearchedItems(response.data);
                                })
                                .finally(() => {});
                            }}
                          />

                          <CommandList className="max-h-72 overscroll-contain">
                            <CommandEmpty>No Items Found.</CommandEmpty>
                            {searchedItems?.map((item) => {
                              return (
                                <CommandItem
                                  key={item.unique_id}
                                  value={`${item.name}_${item.unique_id}`}
                                  onSelect={(item) => {
                                    console.log("item", item);
                                    const itemId = item.split("_")[1];

                                    const selectedItem = searchedItems.find(
                                      (item) => item.unique_id === itemId
                                    );

                                    if (!selectedItem) {
                                      return;
                                    }

                                    console.log("selectedItem", selectedItem);

                                    const slot = inventoryTypeToSlot(
                                      selectedItem.inventoryType
                                    );

                                    console.log("slot", slot);

                                    if (form.getValues(`gearInfo.${slot}`)) {
                                      const existingItem = form
                                        .getValues(`gearInfo.${slot}`)
                                        .find(
                                          (item) =>
                                            item.unique_id ===
                                            selectedItem.unique_id
                                        );

                                      if (existingItem) {
                                        return;
                                      }
                                    }

                                    form.setValue(`gearInfo.${slot}`, [
                                      ...gearInfo[slot],
                                      selectedItem,
                                    ]);

                                    setSearchOpen(false);
                                  }}
                                >
                                  <SmallItemPreview item={item} />
                                </CommandItem>
                              );
                            })}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Button type="submit">Output</Button>
                    {formState.isSubmitSuccessful && (
                      <Alert className="col-span-2">
                        <ClipboardCopy className="h-4 w-4" />
                        <AlertTitle>Output Copied</AlertTitle>
                        <AlertDescription>
                          The output has been copied to your clipboard.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
                  {Object.entries(gearInfo).map(([slot, items], i) => {
                    if (items.length === 0) {
                      return null;
                    }

                    return (
                      <section
                        className="space-y-6 rounded-lg w-full"
                        key={slot}
                      >
                        <Label className="text-xl uppercase font-semibold">
                          {slot}
                        </Label>
                        {items.map((item) => (
                          <ItemPreview key={item.unique_id} item={item} />
                        ))}
                      </section>
                    );
                  })}
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

function SmallItemPreview({ item }: { item: any }) {
  return (
    <div className="flex flex-row w-full gap-x-3 gap-y-2 relative bg-muted p-1.5 rounded-lg h-[50px] items-center">
      <Button
        className="p-0.5 h-full flex-none"
        style={{
          backgroundColor: qualityTypeToColour(item.quality),
        }}
      >
        <Link
          className="relative h-full aspect-square rounded-md overflow-hidden"
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
      <div className="space-y-1 flex flex-col truncate">
        <h1
          style={{ color: qualityTypeToColour(item.quality) }}
          className="truncate text-sm font-bold leading-5"
        >
          {item.name}
        </h1>
      </div>
    </div>
  );
}

function ItemPreview({ item }: { item: any }) {
  return (
    <div className="flex flex-row items-start w-full gap-x-3 gap-y-4 relative bg-muted p-3 rounded-lg h-[72px]">
      <Button
        className="p-0.5 h-full flex-none"
        style={{
          backgroundColor: qualityTypeToColour(item.quality),
        }}
      >
        <Link
          className="relative h-full aspect-square rounded-md overflow-hidden"
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
      <div className="space-y-1 flex flex-col truncate">
        <div className="flex flex-row gap-x-4">
          <h1
            style={{ color: qualityTypeToColour(item.quality) }}
            className="truncate text-base font-bold leading-5"
          >
            {item.name}
          </h1>
          {item.equipped && <Badge className="bg-yellow-500">Equipped</Badge>}
        </div>
        <div className="flex flex-row gap-x-2 items-center">
          <p className="text-sm leading-3 flex-shrink-0">{item.itemLevel}</p>
          {item.socketInfo.PRISMATIC && (
            <GemPreviews gems={item.socketInfo.PRISMATIC.gems} />
          )}
          {item.enchant_id && (
            <EnchantmentPreview enchantmentId={item.enchant_id} />
          )}
        </div>
      </div>
      <Button
        onClick={() => {}}
        variant="outline"
        type="button"
        className="h-10 w-10 rounded-full absolute -right-4 -top-4"
      >
        <X className="h-5 w-5 flex-shrink-0" />
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
}

function GemPreviews({ gems }: { gems: GemSchema[] }) {
  return (
    <div className="flex flex-row gap-x-2">
      {gems.map((gem, i) => (
        <Button
          key={i}
          className="p-0.5 h-6 w-6 rounded-md"
          style={{
            backgroundColor: qualityTypeToColour(gem.quality || 0),
          }}
        >
          <Link
            className="h-5 w-5 overflow-hidden relative rounded-md"
            href={createGemTooltipUrl(gem)}
          >
            <Image
              src={`https://www.raidbots.com/static/images/icons/56/${gem.itemIcon}.png`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt={gem.name}
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
        </Button>
      ))}
    </div>
  );
}

function EnchantmentPreview({ enchantmentId }: { enchantmentId: string }) {
  let enchantmentIdAsNumber = parseInt(enchantmentId);

  const enchantment = enchantments.find(
    (enchantment) => enchantment.id === enchantmentIdAsNumber
  );

  if (!enchantment) {
    return null;
  }

  return (
    <div className="flex flex-row gap-x-1 items-center truncate">
      <Button
        className="p-0.5 h-6 w-6 rounded-md flex-none"
        style={{
          backgroundColor: qualityTypeToColour(enchantment.quality || 0),
          color: "white",
        }}
      >
        <Link
          className="h-5 w-5 overflow-hidden relative rounded-md"
          href={`https://www.wowhead.com/item=${enchantment.itemId}`}
        >
          <Image
            src={`https://www.raidbots.com/static/images/icons/56/${enchantment.itemIcon}.png`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={enchantment.displayName}
          />
          {enchantment?.craftingQuality && (
            <Image
              src={`https://www.raidbots.com/images/crafting-quality-${enchantment.craftingQuality}.png`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Crafting Quality"
            />
          )}
        </Link>
      </Button>
      <p
        className="text-sm leading-4 truncate hidden sm:block"
        style={{
          color: qualityTypeToColour(2),
        }}
      >
        {enchantment.displayName}
      </p>
    </div>
  );
}
