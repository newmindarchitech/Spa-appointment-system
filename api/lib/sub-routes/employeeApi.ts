import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { ApplicantRequestSchemaValidate } from "../formSchema/employee";
import EmployeeModel from "../MongoSchemas/employee";
import { loadEd25519Keys } from "../config/loadkeys";
import { sign } from "hono/jwt";
import { setCookie } from "hono/cookie";


export const EmployeeRoute=new Hono()
.post('/create',zValidator('form',ApplicantRequestSchemaValidate),async(c)=>{
    const employee_info=c.req.valid('form')
    const hashedpassword= await Bun.password.hash(employee_info.password)
    const newEmployee= new EmployeeModel({
        ID:Bun.randomUUIDv7(),
        name:employee_info.username,
        password:hashedpassword,
        contact_number:employee_info.contactnumber,
        date_of_birth:employee_info.date_of_birth,
        Department:employee_info.department
    })
    const private_key= await loadEd25519Keys()
    const now=Math.floor(Date.now()/1000)
    const jwtpayload={
        sub:newEmployee.ID,
        name:newEmployee.name,
        iat:now,
        exp:now + 7 * 24 * 60 * 60
    }
    const signed_content= await sign(jwtpayload,private_key.privatePEM,'EdDSA')
    setCookie(c,'Employee_Cookie',signed_content,{
        httpOnly:true,
        maxAge:24 * 60 * 60,
        sameSite:'Strict',
        secure:Bun.env.NODE_ENV=='production'
    })
    const output=await newEmployee.save();
    return c.json(output.toObject(),200)
})
.get('/list',async(c)=>{
    const allEmployees= await EmployeeModel.find();
    return c.json(allEmployees.map((d)=>d.toObject()),200)
})
.post('/delete_all',async(c)=>{
    const delete_all= await EmployeeModel.deleteMany();
    if(!delete_all){
        return c.json("Deletion of employees have failed",500)
    }
    return c.json("All employees have been deleted",200)
})
.post('/delete/:id',async(c)=>{
    const param=c.req.param('id')

    const delete_employee=await EmployeeModel.deleteOne({ID:param})
    if(!delete_employee){
        return c.json("Deletion Failed",500)
    }
    return c.json(delete_employee,200)
})