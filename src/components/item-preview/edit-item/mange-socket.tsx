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
import { useState } from "react"
import { GemPreviews } from "../gem-previews"
import gems from "@/data/gems.json"
import { GemPreview } from "../gem-preview"

export function ManageSocket({
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
    keyName: "useFieldArrayId2",
  })

  console.log("ManageSocket", fields)

  const index = fields.findIndex((field) => field.unique_id === item.unique_id)
  const [open, setOpen] = useState(false)

  const { socketInfo } = fields[index]

  console.log("field", fields[index])

  return (
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
                "justify-between w-max gap-x-2",
                socketInfo.PRISMATIC && "text-muted-foreground",
              )}
            >
              {socketInfo.PRISMATIC ? (
                <>
                  <GemPreviews gems={socketInfo.PRISMATIC.gems} />
                </>
              ) : (
                "Select gem"
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search gem..." className="h-9" />
            <CommandList className="max-h-72 overscroll-scroll">
              <CommandEmpty>No Gem found.</CommandEmpty>
              {gems.map((gem) => (
                <CommandItem
                  value={`${gem.displayName}:${gem.id}`}
                  key={gem.id}
                  className="space-x-2"
                  onSelect={(value) => {
                    const [_, socketId] = value.split(":")
                    const gem = gems.find(
                      (socket) => socket.id.toString() === socketId,
                    )

                    if (!gem) return

                    if (
                      socketId === socketInfo.PRISMATIC?.gems[0].id.toString()
                    ) {
                      update(index, {
                        ...fields[index],
                        socketInfo: {},
                      })
                    } else {
                      update(index, {
                        ...fields[index],
                        socketInfo: {
                          ...fields[index].socketInfo,
                          PRISMATIC: {
                            // @ts-ignore
                            gems: [gem],
                            gemIds: [gem.id],
                            filled: 1,
                            total: 1,
                            hasUnique: !!gem.unique,
                            type: "PRISMATIC",
                            dynamicSlots: 1,
                            // staticSlots: 0, Not sure what this is for
                          },
                        },
                      })
                    }

                    setOpen(false)
                  }}
                >
                  <GemPreview gemId={gem.id} />
                  {socketInfo.PRISMATIC &&
                    socketInfo.PRISMATIC.gems[0].id.toString() ===
                      gem.id.toString() && <CheckIcon className="h-4 w-4" />}
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
