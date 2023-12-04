import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
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
import { CheckIcon, ChevronsUpDown } from "lucide-react"
import { useFieldArray, useFormContext } from "react-hook-form"
import enchantmentsData from "@/lib/data/useable-enchantments.json"
import sugmaData from "@/lib/data/enchantments.json"
import { EnchantmentPreview } from "../enchantment-preview"
import { useState } from "react"

const enchantDict = {
  head: [],
  neck: [],
  shoulder: [],
  back: [200031, 200032, 200033, 200034, 200035, 200036],
  chest: [],
  wrist: [],
  hands: [],
  waist: [],
  legs: [],
  feet: [],
  rings: [],
  trinkets: [],
  main_hand: [],
  off_hand: [],
}

export function ManageEnchantment({ item }: { item: GearItemSchema }) {
  const form = useFormContext<GearOutputSchema>()

  const slot = inventoryTypeToSlot(item.inventoryType)

  console.log(slot)

  const [open, setOpen] = useState(false)

  const { fields } = useFieldArray({
    control: form.control,
    name: `gearInfo.${slot}`,
    keyName: "useFieldArrayId",
  })

  const wepIds = [
    207087, 204623, 200050, 200052, 200054, 200056, 200058, 207086, 204622,
    200008, 200010, 200012, 200014, 200016, 207085, 204621, 199966, 199968,
    199970, 199972, 199974, 200051, 200053, 200055, 200057, 200059, 200009,
    200011, 200013, 200015, 200017, 199967, 199969, 199971, 199973, 199975,
  ]

  const wepEnchants = wepIds.map((id) => {
    const enchant = sugmaData.find((enchant) => enchant.itemId === id)
    return enchant
  })

  console.log("wepEnchants", wepEnchants)

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
                        const [enchantmentName, enchantmentId] =
                          value.split(":")
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
