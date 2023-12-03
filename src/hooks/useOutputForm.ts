import { isBrowser } from "@/lib/utils";
import { GearOutputSchema, gearOutputSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useOutputForm() {
  return useForm<GearOutputSchema>({
    resolver: zodResolver(gearOutputSchema),
    defaultValues: {
      gearInfo: undefined,
      simcInput: (isBrowser && localStorage.getItem("simcInput")) || "",
      characterInfo: undefined,
      searchedItems: [],
      searchOpen: false,
    },
  });
}
