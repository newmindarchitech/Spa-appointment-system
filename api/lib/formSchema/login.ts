import {z} from 'zod'
export const LoginAccountSchemaValidate=z.strictObject({
    username:z.string().min(3).trim(),
    email:z.email(),
    password:z.string().min(8).trim()
})


export type LoginType=z.infer<typeof LoginAccountSchemaValidate>