import { Hono } from "hono";
import AccountModel from '../MongoSchemas/user'
import { zValidator } from "@hono/zod-validator";
import { LoginAccountSchemaValidate, UserType } from "../formSchema/login";
import UserModel from "../MongoSchemas/user";
import {sign} from 'hono/jwt'
import {setCookie} from 'hono/cookie'
import { loadEd25519Keys } from "../config/loadkeys";
import { RegisterAccountSchemaValidate, RegisterType } from "../formSchema/register";
import AppointmentRecModel from "../MongoSchemas/appointmentRec";

const secret= Bun.env.SECRET as string
export const AccountRoutes=new Hono()
.post('/register',zValidator('form',RegisterAccountSchemaValidate),async(c)=>{
    const userSchemaDataPrep=c.req.valid('form')
    const debug:RegisterType=userSchemaDataPrep
    console.log(debug)
    const hashedpassword= await Bun.password.hash(userSchemaDataPrep.password)
    const AppointmentRec=new AppointmentRecModel({
        ID:Bun.randomUUIDv7(),
        UserID:Bun.randomUUIDv7()
    })
    const UserDoc=new AccountModel({
        ID:AppointmentRec.UserID,
        username:userSchemaDataPrep.username,
        clientemail:userSchemaDataPrep.email,
        passwordhash:  hashedpassword,
        createdDate: new Date(),
        AppointmentRecID:AppointmentRec.ID
    })
    try{
        await AppointmentRec.save()
        const output = await UserDoc.save();
        return c.json(output.toObject(), 201);
    }catch (err) {
        // Handle save errors
        // If it's a Mongoose validation or database error, you can log or prettify it
        const errorMsg = err instanceof Error ? err.message : 'Unknown error';
        console.error('Error saving user:', err);
        return c.json({ error: 'Failed to register user', details: errorMsg }, 500);
    }
})
.post('/login',zValidator('form',LoginAccountSchemaValidate),async(c)=>{
    const information=c.req.valid('form')
    const debug:UserType=information
    console.log(debug)
    try{
        
        const user= await UserModel.findOne({clientemail:information.email })
        if(!user){
            return c.json({ message: 'User not found' }, 404);
        }
        const isVerified = await Bun.password.verify(information.password,user.passwordhash);
        if(!isVerified){
            return c.json("Invalid Credentials",401)
        }
        const now=Math.floor(Date.now()/1000)
        const jwt_payload={
            sub:user.ID,
            name:user.clientemail,
            iat:now,
            exp:now + 7 * 24 * 60 * 60
        }
        const edDSA_Private= await loadEd25519Keys()
        const jwt_token= await sign(jwt_payload,edDSA_Private.privatePEM,'EdDSA')
        setCookie(c,"Signed_Cookie",jwt_token,{
            maxAge:24 * 60 * 60,
            sameSite:'Strict',
            secure:Bun.env.NODE_ENV=='production'
        })
        return c.redirect('http://localhost:3000',302)        
    }catch(error){
       console.log(error)
    }
})