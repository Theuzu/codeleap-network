import { z } from "zod";

export const signUpFormSchema = z.object({
    username: z.string().min(2, { message: "Mandatory field." }).max(255),

});

// You can also infer the TypeScript type from the schema
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;