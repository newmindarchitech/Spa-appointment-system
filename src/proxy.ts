import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"



const protectedUserRoutes=['/profile','/appointments']
const protectedAdminRoutes=['/admin','admin/employee','admin/departments']
const protecedEmpRoutes=['/dashboard','dashboard/services']
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

    if(protectedAdminRoutes.includes(request.nextUrl.pathname)){
        const admin_cookie= (await cookies()).get('Admin_Cookie');
        if(admin_cookie){
            return NextResponse.next()
        }else if(!admin_cookie){
            return NextResponse.redirect(new URL("/auth/user/login",request.url))
        }
    }

    if(protecedEmpRoutes.includes(request.nextUrl.pathname)){
        const admin_cookie= (await cookies()).get('Admin_Cookie');
        const employee_cookie= (await cookies()).get('Employee_Cookie');
        if(admin_cookie){
            return NextResponse.next()
        }else if(!admin_cookie){
            return NextResponse.redirect(new URL("/auth/user/login",request.url))
        }
        if(!employee_cookie){
            return NextResponse.redirect(new URL("/employee",request.url))
        }else{
            return NextResponse.next()
        }
    }
    
}


export const config={
    matcher:["/((?!api|_next/static|_next/image|favicon.ico|auth/user/login|auth/user/register|assets).*)"]
}

