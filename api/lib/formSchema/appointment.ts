import {z} from 'zod'

const appointmentStatus=['pending','processing','accepted','dropped'] as const
const appointmentContext=['Massage Therapy','Facials and Skin Care','Body Treatments','Salon'] as const
export const AppointmentSchemaValidate=z.strictObject({
    clientname:z.string().min(3).max(50),
    contactnumber:z.number().int().positive(),
    email:z.email(),
    appointmentcontext:z.enum(appointmentContext),
    status:z.enum(appointmentStatus).default('pending'),
})

export type AppointmentType=z.infer<typeof AppointmentSchemaValidate>