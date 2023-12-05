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
import { useState } from "react"
import { GemPreviews } from "../gem-previews"
import gems from "@/data/gems.json"
import { GemPreview } from "../gem-preview"

export function ManageSocket({
  item,
  index,
  update,
}: {
  item: GearItemSchema
  index: number
  update: (index: number, value: GearItemSchema) => void
}) {
  const [open, setOpen] = useState(false)

  const { socketInfo } = item

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
                "w-max justify-between gap-x-2",
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
            <CommandList className="overscroll-scroll max-h-72">
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
                        ...item,
                        socketInfo: {},
                      })
                    } else {
                      update(index, {
                        ...item,
                        socketInfo: {
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
