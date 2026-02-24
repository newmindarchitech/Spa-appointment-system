import {z} from 'zod'
export const RegisterAccountSchemaValidate=z.strictObject({
    username:z.string().min(3).trim(),
    email:z.email(),
    password:z.string().min(8).trim(),
    password_confirm:z.string().min(8).trim()
}).superRefine(({password,password_confirm},ctx)=>{
    if(password!==password_confirm){
        ctx.addIssue({
            code:'custom',
            message:'Password and Confirm password must match',
            path:['password_confirm']
        })
    }
})


export type RegisterType=z.infer<typeof RegisterAccountSchemaValidate>