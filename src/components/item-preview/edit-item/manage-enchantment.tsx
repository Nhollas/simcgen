import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui"
import { inventoryTypeToSlot } from "@/lib/raidbots"
import { cn } from "@/lib/utils"
import { GearItemSchema, GearOutputSchema } from "@/schemas"
import { ChevronsUpDown } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import enchantmentsData from "@/lib/data/enchantments.json"
import { EnchantmentPreview } from "../enchantment-preview"

export function ManageEnchantment({ item }: { item: GearItemSchema }) {
  const form = useFormContext<GearOutputSchema>()

  console.log("form", form)

  const slot = inventoryTypeToSlot(item.inventoryType)

  const { fields } = useFieldArray({
    control: form.control,
    name: `gearInfo.${slot}`,
    keyName: "useFieldArrayId",
  })

  const index = fields.findIndex((field) => field.unique_id === item.unique_id)

  const enchantments = enchantmentsData.find(
    (enchantment) => enchantment.slot === slot,
  )

  console.log("enchantments", enchantments)

  return (
    <FormField
      control={form.control}
      name={`gearInfo.${slot}.${index}.enchant_id`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Enchant</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-[200px] justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    <EnchantmentPreview enchantmentId={field.value} />
                  ) : (
                    "Select enchantment"
                  )}
                  {/* {field.value
                    ? languages.find(
                        (language) => language.value === field.value,
                      )?.label
                    : "Select language"} */}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  placeholder="Search framework..."
                  className="h-9"
                />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {/* {languages.map((language) => (
                    <CommandItem
                      value={language.label}
                      key={language.value}
                      onSelect={() => {
                        form.setValue("language", language.value)
                      }}
                    >
                      {language.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          language.value === field.value
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))} */}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            This is the language that will be used in the dashboard.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
