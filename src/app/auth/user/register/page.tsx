"use client";

import { useEffect, useState } from "react";
import { RegisterAccountSchemaValidate, RegisterType } from "../../../../../api/lib/formSchema/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthRoutes } from "../../../../../api/api";

const RegisterPage=()=>{
        const [success, setSuccess] = useState(false);
        const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
        useEffect(() => {
            if (success || errorMessage) {
                const timer = setTimeout(() => {
                    setSuccess(false);
                    setErrorMessage(null);
                }, 3000);
                return () => clearTimeout(timer);
            }
        }, [success, errorMessage]);
        const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<RegisterType>({
            resolver:zodResolver(RegisterAccountSchemaValidate),
            mode:'onChange',
            shouldFocusError:true
        });

        const onSubmit:SubmitHandler<RegisterType>=async(data)=>{
            const response= await AuthRoutes.user.register.$post({form:data})
            if(response.ok){
               
                setSuccess(true)
                setErrorMessage(null)
                reset()
            }
            else{
                setErrorMessage('Login failed')
            }
        }
    return(
        <div>
            {success && (
                <div role="alert" className="alert alert-success ">
                    <div>
            
                    <span>Login successful!</span>
                    </div>
                </div>
            )}

            {errorMessage && (
                <div role="alert" className="alert alert-error ">
                    <div>
                        <span>{errorMessage}</span>
                    </div>
                </div>
            )}
        <div className=" max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center  ">
            <h1 className=" text-xl font-black text-black -tracking-[0.5px]">Register</h1>
            <form className="rounded-3xl shadow-md gap-6 w-full flex flex-col px-6 py-7.5 " onSubmit={handleSubmit(onSubmit)} >
                    <div className=" justify-center flex">
                        <div role="tablist" className=" tabs tabs-box tabs-lift">
                            <label className=" tab">
                                <a role="tab" href="/auth/user/login">Login</a>
                            </label>
                            <label className=" tab">
                                <a role="tab" className=" tab" href="/auth/user/register">Register</a>
                            </label>
                        </div>
                    </div>
                 <fieldset className=" fieldset floating-label">
                    <label className="label">Username</label>
                    <input {...register("username")} type="text" className="input validator w-full"   placeholder="Username" />
                    {
                        errors.username && (
                           <div className=" text-red-500">{`${errors.username?.message}`}</div>
                        )
                    }
                </fieldset>
                <fieldset className=" fieldset floating-label">
                    <label className="label">Email</label>
                    <input {...register("email")} type="email" className="input validator w-full"  placeholder="Email" />
                    {
                        errors.email && (
                           <div className=" text-red-500">{`${errors.email?.message}`}</div>
                        )
                    }
                </fieldset>
                <fieldset className=" fieldset floating-label">
                    <label className="label">Password</label>
                    <input {...register("password")} type="password" className="input validator w-full"   placeholder="Password" />
                    {
                        errors.password && (
                           <div className="text-red-500">{`${errors.password?.message}`}</div> 
                        )
                    }
                </fieldset>
                 <fieldset className=" fieldset floating-label">
                    <label className="label">PasswordConfirm</label>
                    <input {...register("password_confirm")} type="password" className="input validator w-full"   placeholder="PasswordConfirm" />
                    {
                        errors.password_confirm && (
                           <div className="text-red-500">{`${errors.password_confirm.message}`}</div> 
                        )
                    }
                </fieldset>
                    <button disabled={isSubmitting} className="btn btn-soft btn-neutral " type="submit">{
                        isSubmitting ? <span className=" loading loading-spinner loading-xl"></span>  : "Register"
                    }</button>
            </form>
        </div>
        </div>
    )
}

export default RegisterPage