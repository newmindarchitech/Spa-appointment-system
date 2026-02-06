import { Hono } from "hono";
import { jwt, verify } from "hono/jwt";
import { loadEd25519Keys } from "../config/loadkeys";
import { getCookie, setCookie } from "hono/cookie";


const private_key=await loadEd25519Keys()
const employeeProtection=new Hono()
.use("/*",jwt({
    secret:private_key.publicPEM,
    cookie:'Employee_Cookie',
    alg:'EdDSA'
}))
.get("/pass_check",async(c)=>{
    const user_cookie=getCookie(c,"Signed_Cookie")
    const employee_cookie=getCookie(c,"Employee_Cookie")
    if(user_cookie){
        return c.redirect('http://localhost:3000')
    }
    else{
        try{
            const decoded= await verify(employee_cookie as string,private_key.publicPEM,'EdDSA')
            return c.json("Allowed",200)
        }catch(error){
            console.error(error);
        }
    }
})
