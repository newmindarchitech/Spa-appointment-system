import {z} from 'zod'
const Occupation=['Reception/Booking','Massage Therapy','Skincare/Aesthetics','Nail care','Body Treatments','Spa Attendants & Facilities','Retail Department'] as const
export const ApplicantRequestSchemaValidate=z.strictObject({
    username:z.string().trim(),
    email:z.email(),
    password:z.string().min(8).trim(),
    contactnumber:z.e164(),
    date_of_birth:z.date(),
    department:z.enum(Occupation)
})


export type EmployeeType=z.infer<typeof ApplicantRequestSchemaValidate>