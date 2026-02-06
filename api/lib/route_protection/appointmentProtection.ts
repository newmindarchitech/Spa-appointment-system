import { Hono } from "hono";
import { jwt, verify } from "hono/jwt";
import { loadEd25519Keys } from "../config/loadkeys";
import { getCookie } from "hono/cookie";
import AppointmentModel from "../MongoSchemas/appointment";


const private_key= await loadEd25519Keys()
export const AppointmentProtection= new Hono()
.use('/*',jwt({
    secret:private_key.privatePEM,
    cookie:'Signed_Coookie',
    alg:'EdDSA'
}))
.get('/pass_check',async(c)=>{
    const yummyCookie = getCookie(c, 'Signed_Cookie')
    if(!yummyCookie){
        return c.redirect('http://localhost:3000/auth/user/login')
    }
    try{
        const decoded= await verify(yummyCookie as string,private_key.publicPEM,'EdDSA')
        console.log(decoded)
        const allUserAppointments= await AppointmentModel.find({email:decoded.name as string})
        return c.json(allUserAppointments.map((d)=>d.toObject()),200)
    }catch(error){
        console.error(error);
    }
})
