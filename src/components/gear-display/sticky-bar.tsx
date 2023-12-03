"use client"

import { inventoryTypeToSlot } from "@/lib/raidbots";
import axios from "axios";
import { ClipboardCopy } from "lucide-react";
import { MiniItemPreview } from "../item-preview";
import { Alert, AlertDescription, AlertTitle, Button, Command, CommandEmpty, CommandInput, CommandItem, CommandList, Popover, PopoverContent, PopoverTrigger } from "../ui";
import { GearOutputSchema } from "@/schemas";
import { UseFormReturn, useFormContext } from "react-hook-form";

export function StickyBar() {
    const form = useFormContext<GearOutputSchema>() 

    const { formState } = form;
    const [searchedItems, searchOpen] = form.watch(["searchedItems", "searchOpen"])


    return (
        <div className="sticky top-6 inset-x-0 z-50 flex justify-center">
        <div className="max-w-lg bg-muted/75 p-2 rounded-lg w-full grid grid-cols-2 gap-4">
          <Popover open={searchOpen} onOpenChange={form.setValue.bind(form, "searchOpen")}>
            <PopoverTrigger
              onClick={() => form.setValue("searchOpen", true)}
              asChild
              className="w-full max-w-lg"
            >
              <Button variant="outline">Add Item</Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder="Search Item..."
                  onChangeCapture={(event: any) => {
                    const inputValue =
             
                      event.target.value.toLowerCase();

                    if (inputValue === "") {
                      form.setValue("searchedItems", []);
                      return;
                    }

                    axios
                      .get("/api/items", {
                        params: {
                          query: inputValue,
                        },
                      })
                      .then((response) => {
                        form.setValue("searchedItems",response.data);
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
                        onSelect={(item) => handleSelectItem(item, form)}
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
    )
}

function handleSelectItem(item: string, form: UseFormReturn<GearOutputSchema>)
{

  const itemId = item.split("_")[1];

  const [searchedItems] = form.watch(["searchedItems"])

  const selectedItem = searchedItems.find(
    (item) => item.unique_id === itemId
  );

  if (!selectedItem) {
    return;
  }

  const slot = inventoryTypeToSlot(
    selectedItem.inventoryType
  );

  const existingItems = form.getValues(`gearInfo.${slot}`);


  if (existingItems) {
    const existingItem = form

      .getValues(`gearInfo.${slot}`)
      ?.find(

        (item) =>
          item.unique_id === selectedItem.unique_id
      );

    if (existingItem) {
      return;
    }
  }


  form.setValue(`gearInfo.${slot}`, [
    ...(existingItems || []),
    selectedItem,
  ]);

  form.setValue("searchOpen", false);
}