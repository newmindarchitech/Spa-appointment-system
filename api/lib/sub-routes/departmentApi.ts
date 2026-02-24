import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { DepartmentSchemaValidate } from "../formSchema/department";
import DepartmentModel from "../MongoSchemas/department";
import AppointmentModel from "../MongoSchemas/appointment";
import { cors } from "hono/cors";


export const DepartmentRoute=new Hono()
.use('/*', cors({
    origin:'http://localhost:3000',
    credentials:true
}))
.post('/create',zValidator('form',DepartmentSchemaValidate),async(c)=>{
    const form_info=c.req.valid('form')
    const DepartmentDoc=new DepartmentModel({
        ID:Bun.randomUUIDv7(),
        name:form_info.department_name
    })
    const output= await DepartmentDoc.save()
    return c.json(output.toObject(),200)
})
.get('/list',async(c)=>{
    const allDepartments=await DepartmentModel.find()
    return c.json(allDepartments.map((d)=>d.toObject()),200)
})
.post('/delete_all',async(c)=>{
    const delete_all=await DepartmentModel.deleteMany()
    if(!delete_all.acknowledged){
        return c.json('Deletion of departments failed',500)
    }
    return c.json('All departments deleted',200)
})
.post("/delete/:id",async(c)=>{
    const param=c.req.param('id')
    const delete_appointment= await AppointmentModel.deleteOne({ID:param})
    if(!delete_appointment){
        return c.json("Deletion failed",500)
    }
    return c.json(delete_appointment,200)
})
