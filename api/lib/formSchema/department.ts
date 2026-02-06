import {z} from 'zod'

const Departments=['Reception/Booking','Massage Therapy','Skincare/Aesthetics','Nail care','Body Treatments','Spa Attendants & Facilities','Retail Department'] as const
export const DepartmentSchemaValidate=z.strictObject({
    department_name:z.enum(Departments),
})