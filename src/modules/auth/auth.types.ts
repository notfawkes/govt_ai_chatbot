import { z } from "zod";

export const GoogleTokenPayloadSchema = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  picture: z.string().optional()
});

export type GoogleTokenPayload = z.infer<
  typeof GoogleTokenPayloadSchema
>;
