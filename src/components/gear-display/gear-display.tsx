"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
} from "@/components/ui"
import { GearItemSchema, GearSchema } from "@/schemas"
import { ItemPreview } from "../item-preview"
import { StickyBar } from "./sticky-bar"

export function GearDisplay({ gear }: { gear: GearSchema }) {
  return (
    <Card className="relative h-full w-full">
      <CardHeader>
        <CardTitle>Gear To Output</CardTitle>
        <CardDescription>
          Add the items you want and then export the gear as a simc output.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        <StickyBar />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))]">
          {Object.entries(gear).map(([slot, items], i) => {
            return <ItemPreviewList key={i} items={items} slot={slot} />
          })}
        </div>
      </CardContent>
    </Card>
  )
}

function ItemPreviewList({
  items,
  slot,
}: {
  items: GearItemSchema[]
  slot: string
}) {
  return (
    <section className="w-full space-y-6 rounded-lg">
      <Label className="text-xl font-semibold uppercase">
        {slot.split("_").join(" ")}
      </Label>
      {items.map((item) => (
        <ItemPreview key={item.unique_id} item={item} manage />
      ))}
    </section>
  )
}
