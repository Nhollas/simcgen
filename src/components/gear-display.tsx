"use client";

import { inventoryTypeToSlot } from "@/lib/raidbots";
import axios from "axios";
import { ClipboardCopy } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";
import { useState } from "react";
import { GearOutputSchema, GearSchema, ItemSchema } from "@/schemas";
import { UseFormReturn } from "react-hook-form";
import { ItemPreview, MiniItemPreview } from "./item-preview";

export function GearDisplay({
  gear,
  form,
}: {
  gear: GearSchema;
  form: UseFormReturn<GearOutputSchema>;
}) {
  const { formState } = form;

  const [searchedItems, setSearchedItems] = useState<ItemSchema[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Card className="h-full w-full relative">
      <CardHeader>
        <CardTitle>Gear To Output</CardTitle>
        <CardDescription>
          Add the items you want and then export the gear as a simc output.
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

                      if (inputValue === "") {
                        setSearchedItems([]);
                        return;
                      }

                      axios
                        .get("/api/items", {
                          params: {
                            query: inputValue,
                          },
                        })
                        .then((response) => {
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
                            const itemId = item.split("_")[1];

                            const selectedItem = searchedItems.find(
                              (item) => item.unique_id === itemId
                            );

                            if (!selectedItem) {
                              return;
                            }

                            const slot = inventoryTypeToSlot(
                              selectedItem.inventoryType
                            );

                            // @ts-ignore
                            if (form.getValues(`gearInfo.${slot}`)) {
                              const existingItem = form
                                // @ts-ignore
                                .getValues(`gearInfo.${slot}`)
                                .find(
                                  // @ts-ignore
                                  (item) =>
                                    item.unique_id === selectedItem.unique_id
                                );

                              if (existingItem) {
                                return;
                              }
                            }

                            // @ts-ignore
                            form.setValue(`gearInfo.${slot}`, [
                              // @ts-ignore
                              ...gearInfo[slot],
                              selectedItem,
                            ]);

                            setSearchOpen(false);
                          }}
                        >
                          <MiniItemPreview item={item} />
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
          {Object.entries(gear).map(([slot, items], i) => {
            if (items.length === 0) {
              return;
            }

            return (
              <section className="space-y-6 rounded-lg w-full" key={slot}>
                <Label className="text-xl uppercase font-semibold">
                  {slot.split("_").join(" ")}
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
  );
}
