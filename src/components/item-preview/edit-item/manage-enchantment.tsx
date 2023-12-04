import {
  Button,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
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
import { UseFormReturn, useFieldArray, useFormContext } from "react-hook-form"
import enchantmentsData from "@/data/useable-enchantments.json"
import { EnchantmentPreview } from "../enchantment-preview"
import { useState } from "react"

export function ManageEnchantment({
  item,
  form,
}: {
  item: GearItemSchema
  form: UseFormReturn<GearOutputSchema>
}) {
  const slot = inventoryTypeToSlot(item.inventoryType)
  const { fields, update } = useFieldArray({
    control: form.control,
    name: `gearInfo.${slot}`,
    keyName: "useFieldArrayId3",
  })
  console.log("ManageEnchantment", fields)

  const index = fields.findIndex((field) => field.unique_id === item.unique_id)

  const [open, setOpen] = useState(false)

  const enchantments = enchantmentsData[slot]

  const { enchant_id } = fields[index]

  return (
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
                enchant_id && "text-muted-foreground",
              )}
            >
              {enchant_id ? (
                <EnchantmentPreview enchantmentId={parseInt(enchant_id)} />
              ) : (
                "Select enchantment"
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search enchantment..." className="h-9" />
            <CommandList className="max-h-72 overscroll-scroll">
              <CommandEmpty>No enchantment found.</CommandEmpty>
              {enchantments.map((enchantment) => (
                <CommandItem
                  value={`${enchantment.displayName}:${enchantment.id}`}
                  key={enchantment.id}
                  className="gap-x-2"
                  onSelect={(value) => {
                    const [_, enchantmentId] = value.split(":")

                    console.log(
                      "enchantmentIdResult",
                      enchantmentId === enchant_id ? undefined : enchantmentId,
                    )

                    update(index, {
                      ...fields[index],
                      enchant_id:
                        enchantmentId === enchant_id
                          ? undefined
                          : enchantmentId.toString(),
                    })

                    setOpen(false)
                  }}
                >
                  <EnchantmentPreview enchantmentId={enchantment.id} />
                  <CheckIcon
                    className={cn(
                      "h-4 w-4",
                      enchant_id === enchantment.id.toString()
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
  )
}
