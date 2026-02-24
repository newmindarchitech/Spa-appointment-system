import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"



const protectedUserRoutes=['/profile','/appointments']
const protectedEmployeeRoutes=['/auth/employee/login','/auth/employee/register','/departments']

export  async function proxy(request:NextRequest){
    if(protectedUserRoutes.includes(request.nextUrl.pathname)){
        const user_cookie= (await cookies()).get('Signed_Cookie');
        if(!user_cookie){
            return NextResponse.redirect(new URL("/auth/user/login",request.url))
        }
        else if(user_cookie!==undefined){
            return NextResponse.next()
        }
    }else{
        return NextResponse.next()
    }

    if(protectedEmployeeRoutes.includes(request.nextUrl.pathname)){
        const user_cookie= (await cookies()).get('Signed_Cookie');
        const employee_cookie= (await cookies()).get('Employee_Cookie');
        if(user_cookie){
            return NextResponse.redirect(new URL("/",request.url))
        }else if(!user_cookie){
             return NextResponse.redirect(new URL("/auth/user/login",request.url))
        }
        if(!employee_cookie){
            return NextResponse.redirect(new URL("/auth/employee/login",request.url))
        }else{
            return NextResponse.next()
        }
    }
    
}


export const config={
    matcher:["/((?!api|_next/static|_next/image|favicon.ico|auth/user/login|assets).*)"]
}

