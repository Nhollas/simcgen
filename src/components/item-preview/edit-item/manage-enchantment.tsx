import {
  Button,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
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
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import enchantmentsData from "@/data/useable-enchantments.json"
import sugmaData from "@/data/enchantments.json"
import { EnchantmentPreview } from "../enchantment-preview"
import { useState } from "react"

export function ManageEnchantment({ item }: { item: GearItemSchema }) {
  const form = useFormContext<GearOutputSchema>()

  const slot = inventoryTypeToSlot(item.inventoryType)

  const [open, setOpen] = useState(false)

  const { fields } = useFieldArray({
    control: form.control,
    name: `gearInfo.${slot}`,
    keyName: "useFieldArrayId",
  })

  const index = fields.findIndex((field) => field.unique_id === item.unique_id)

  const enchantments = enchantmentsData[slot]

  return (
    <FormField
      control={form.control}
      name={`gearInfo.${slot}.${index}.enchant_id`}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Enchant</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className={cn(
                    "justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    <EnchantmentPreview enchantmentId={field.value} />
                  ) : (
                    "Select enchantment"
                  )}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search enchantment..."
                  className="h-9"
                />

                <CommandList className="max-h-72 overscroll-scroll">
                  <CommandEmpty>No enchantment found.</CommandEmpty>
                  {enchantments.map((enchantment) => (
                    <CommandItem
                      value={`${enchantment.displayName}:${enchantment.id}`}
                      key={enchantment.id}
                      className="gap-x-4"
                      onSelect={(value) => {
                        const [_, enchantmentId] = value.split(":")
                        form.setValue(
                          `gearInfo.${slot}.${index}.enchant_id`,
                          enchantmentId,
                        )

                        setOpen(false)
                      }}
                    >
                      <EnchantmentPreview
                        enchantmentId={enchantment.id.toString()}
                      />
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          field.value === enchantment.id.toString()
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
