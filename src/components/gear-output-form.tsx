import { createSimcOutputFromInfo } from "@/lib/simc";
import { Form } from "./ui";
import { GearOutputSchema } from "@/schemas";

export function GearOutputForm({
  form,
  children,
}: {
  form: any;
  children: any;
}) {
  function handleSubmitTest(values: GearOutputSchema) {
    const simcExport = createSimcOutputFromInfo(values);

    // Make the user copy the output
    navigator.clipboard.writeText(simcExport);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitTest)}
        className="flex flex-col items-center w-full justify-center space-y-8"
      >
        {children}
      </form>
    </Form>
  );
}
