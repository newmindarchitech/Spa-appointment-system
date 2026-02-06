import {z} from 'zod'
export const LoginAccountSchemaValidate=z.strictObject({
    username:z.string().trim(),
    email:z.email(),
    password:z.string().min(8).trim()
})


export type UserType=z.infer<typeof LoginAccountSchemaValidate>