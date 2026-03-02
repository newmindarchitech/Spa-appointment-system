import {z} from 'zod'

export const appointmentStatus=['pending','processing','accepted','dropped'] as const
export const appointmentContext=['Massage Therapy','Facials and Skin Care','Body Treatments','Salon'] as const
export const AppointmentSchemaValidate=z.strictObject({
    clientname:z.string().min(3).max(50),
    contactnumber:z.e164(),
    email:z.email(),
    appointmentcontext:z.enum(appointmentContext),
    date: z.string().transform(val => new Date(val).toISOString())
})

export type AppointmentType=z.infer<typeof AppointmentSchemaValidate>