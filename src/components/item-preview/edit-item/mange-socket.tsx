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
import { useState } from "react"
import { GemPreviews } from "../gem-previews"
import gems from "@/data/gems.json"
import { GemPreview } from "../gem-preview"

export function ManageSocket({ item }: { item: GearItemSchema }) {
  const form = useFormContext<GearOutputSchema>()
  const slot = inventoryTypeToSlot(item.inventoryType)
  const { fields, update } = useFieldArray({
    control: form.control,
    name: `gearInfo.${slot}`,
    keyName: "useFieldArrayId",
  })
  const index = fields.findIndex((field) => field.unique_id === item.unique_id)
  const [open, setOpen] = useState(false)

  const field = fields[index]

  return (
    // <FormField
    //   control={form.control}
    //   name={`gearInfo.${slot}.${index}.socketInfo`}
    //   render={({ field }) => {
    //     console.log("field", field.value)

    // return (
    <FormItem className="flex flex-col">
      <FormLabel>Socket</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn(
                "justify-between w-max",
                !field.socketInfo && "text-muted-foreground",
              )}
            >
              {field.socketInfo.PRISMATIC ? (
                <>
                  <GemPreviews gems={field.socketInfo.PRISMATIC?.gems} />
                </>
              ) : (
                "Select gem"
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search enchantment..." className="h-9" />

            <CommandList className="max-h-72 overscroll-scroll">
              <CommandEmpty>No enchantment found.</CommandEmpty>
              {gems.map((gem) => (
                <CommandItem
                  value={`${gem.displayName}:${gem.id}`}
                  key={gem.id}
                  className="gap-x-4"
                  onSelect={(value) => {
                    const [_, socketId] = value.split(":")
                    const gem = gems.find(
                      (socket) => socket.id.toString() === socketId,
                    )

                    update(index, {
                      ...fields[index],
                      socketInfo: {
                        ...fields[index].socketInfo,
                        PRISMATIC: {
                          // @ts-ignore
                          gems: [gem],
                        },
                      },
                    })

                    setOpen(false)
                  }}
                >
                  <GemPreview gemId={gem.id} />
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      field.socketInfo.PRISMATIC?.gemIds
                        ? field.socketInfo.PRISMATIC?.gemIds[0]
                        : "" === gem.id.toString()
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
