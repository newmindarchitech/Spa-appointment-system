import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { AppointmentSchemaValidate, AppointmentType } from "../formSchema/appointment";
import AppointmentModel from "../MongoSchemas/appointment";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import UserModel from "../MongoSchemas/user";
import { cors } from "hono/cors";
export const AppointmentRoutes=new Hono()
.use('/*', cors({
    origin:'http://localhost:3000',
    credentials:true
}))
.get("/get",async (c)=>{
    const appointments= await AppointmentModel.find()
    return c.json(
        appointments.map((d)=>d.toObject(),200)
    )
})
.post('/create',zValidator("form",AppointmentSchemaValidate),async(c)=>{
    const appointmentDataPrep=c.req.valid('form')
    const debug:AppointmentType=appointmentDataPrep;
    console.log(debug);
    const user_db=await UserModel.findOne({clientemail:appointmentDataPrep.email})
    const AppointmentDoc=new AppointmentModel({
        ID:Bun.randomUUIDv7(),
        clientName: appointmentDataPrep.clientname,
        clientcontactNumber:appointmentDataPrep.contactnumber,
        email:appointmentDataPrep.email,
        appointmentContext:appointmentDataPrep.appointmentcontext,
        appointmentDate:new Date(),
        status:appointmentDataPrep.status,
        createdDate: new Date(),
        AppointmentRec:user_db?.AppointmentRecID,
        CustomerID:user_db?.ID
    })
    const output=await AppointmentDoc.save()
    return c.json(output.toObject(),201)
})
.get('/:appointmentid',async(c)=>{
    const id=c.req.param("appointmentid")
    try {
        const appointment = await AppointmentModel.findOne({ ID: id }); // Search by ID
        if (!appointment) {
            return c.json({ message: 'Appointment not found' }, 404);
        }
        return c.json(appointment.toObject(),200);
    } catch (error) {
        return c.json({ error: 'Error fetching appointment' }, 500);
    }
})
.post('/delete/:id',async(c)=>{
    const id=c.req.param("id")
    try{
        const deletedoc= await AppointmentModel.deleteOne({ID:id});
        if(!deletedoc){
            return c.json({ message: 'Deletetion Cancelled' }, 404);
        }
         return c.json(deletedoc,200)
    }catch(error){
        return c.json({ error: 'Error deleting appointment' }, 500);
    }
})
