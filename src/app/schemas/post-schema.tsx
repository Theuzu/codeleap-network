import { z } from "zod";

export const postFormSchema = z.object({
    title: z.string().min(1, { message: "Mandatory field." }).max(255),
    content: z.string().min(1, { message: "Mandatory field." }).max(255),

});

export type PostFormSchema = z.infer<typeof postFormSchema>;