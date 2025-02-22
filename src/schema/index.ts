import {z} from "zod";

export const LoginSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(5),
})

export const CreateCategorySchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    image: z.string(z.instanceof(File)).optional()
})