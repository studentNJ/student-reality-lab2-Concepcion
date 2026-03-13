import { z } from "zod";

export const metroRecordSchema = z.object({
  name: z.string().min(1),
  state: z.string().min(1).optional(),
  id: z.string().min(1).optional(),
});

export const getMetrosRequestSchema = z.object({}).strict();

export const getMetrosResponseDataSchema = z.object({
  metros: z.array(metroRecordSchema),
});

export type MetroRecord = z.infer<typeof metroRecordSchema>;
export type GetMetrosRequest = z.infer<typeof getMetrosRequestSchema>;
export type GetMetrosResponseData = z.infer<typeof getMetrosResponseDataSchema>;