import { z } from "zod";

export const env = z
  .object({
    BlizzClientId: z.string(),
    BlizzClientSecret: z.string(),
  })
  .parse(process.env);