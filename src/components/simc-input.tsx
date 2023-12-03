import { exampleInput } from "@/lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "./ui";
import { UseFormReturn } from "react-hook-form";
import Link from "next/link";

export function SimcInput({ form }: { form: UseFormReturn<any> }) {
  return (
    <Card className="h-full w-full overflow-scroll max-w-3xl relative">
      <CardHeader>
        <CardTitle>Simulation Craft Input</CardTitle>
        <CardDescription className="flex flex-col gap-y-2 w-full">
          Copy/paste the text from the SimulationCraft addon.
          <Link
            className="font-medium text-white underline"
            href="https://support.raidbots.com/article/54-installing-and-using-the-simulationcraft-addon"
          >
            How to install and use the SimC addon
          </Link>
          <Button
            className="self-end"
            type="button"
            onClick={() => form.setValue("simcInput", exampleInput)}
          >
            Show Example
          </Button>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <FormField
          control={form.control}
          name="simcInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Simc Input</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[200px]"
                  {...field}
                  placeholder="Paste your simc input here."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
