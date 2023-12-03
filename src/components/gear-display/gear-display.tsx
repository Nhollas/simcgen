"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Label,
} from "@/components/ui";
import { GearSchema } from "@/schemas";
import { ItemPreview } from "../item-preview";
import { StickyBar } from "./sticky-bar";

export function GearDisplay({
  gear
}: {
  gear: GearSchema;
}) {
  return (
    <Card className="h-full w-full relative">
      <CardHeader>
        <CardTitle>Gear To Output</CardTitle>
        <CardDescription>
          Add the items you want and then export the gear as a simc output.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-6">
        <StickyBar />
        <div className="grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8">
          {Object.entries(gear).map(([slot, items], i) => {
            if (items.length === 0) {
              return;
            }

            return (
              <section className="space-y-6 rounded-lg w-full" key={slot}>
                <Label className="text-xl uppercase font-semibold">
                  {slot.split("_").join(" ")}
                </Label>
                {items.map((item) => (
                  <ItemPreview key={item.unique_id} item={item} />
                ))}
              </section>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
