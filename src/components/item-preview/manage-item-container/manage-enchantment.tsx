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
import { cn } from "@/lib/utils"
import { GearItemSchema } from "@/schemas"
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import enchantmentsData from "@/data/useable-enchantments.json"
import { EnchantmentPreview } from "../enchantment-preview"
import { useState } from "react"
import { GearSlot } from "@/lib/raidbots"

export function ManageEnchantment({
  item,
  index,
  slot,
  update,
}: {
  item: GearItemSchema
  index: number
  slot: GearSlot
  update: (index: number, value: GearItemSchema) => void
}) {
  const [open, setOpen] = useState(false)

  const enchantments = enchantmentsData[slot]

  const { enchant_id } = item

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
            <CommandList className="overscroll-scroll max-h-72">
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
                      ...item,
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
