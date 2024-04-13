import { createSimcOutputFromInfo } from "@/lib/simc"
import { Form } from "./ui"
import { GearOutputSchema } from "@/schemas"
import { UseFormReturn } from "react-hook-form"

export function GearOutputForm({
  form,
  children,
}: {
  form: UseFormReturn<GearOutputSchema>
  children: React.ReactNode
}) {
  function handleSubmitTest(values: GearOutputSchema) {
    const simcExport = createSimcOutputFromInfo(values)

    // Make the user copy the output
    navigator.clipboard.writeText(simcExport)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitTest)}
        className="flex w-full flex-col items-center justify-center space-y-8"
      >
        {children}
      </form>
    </Form>
  )
}
