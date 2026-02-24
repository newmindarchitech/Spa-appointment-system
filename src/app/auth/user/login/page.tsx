"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm,SubmitHandler } from "react-hook-form";
import { LoginAccountSchemaValidate, LoginType } from "../../../../../api/lib/formSchema/login";
import { useEffect, useState } from "react";
import { AuthRoutes } from "../../../../../api/api";
const LoginPage=()=>{
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
    const {register,handleSubmit,formState:{errors,isSubmitting},reset}=useForm<LoginType>({
        resolver:zodResolver(LoginAccountSchemaValidate),
        mode:'onSubmit',
        shouldFocusError:true
    });
    const onSubmit:SubmitHandler<LoginType>=async(data)=>{
        const response= await AuthRoutes.user.login.$post({form:data})
        if(response.ok){
            setSuccess(true)
            setErrorMessage(null)
            reset()
        }
        else{
            setErrorMessage('Login failed')
        }
    }
    return (
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
            <h1 className=" text-xl font-black text-black -tracking-[0.5px]">Sign In</h1>
            <form className="rounded-3xl shadow-md gap-6 w-full flex flex-col px-6 py-7.5 " onSubmit={handleSubmit(onSubmit)} >
                    <div className=" justify-center flex">
                        <div role="tablist" className=" tabs tabs-box tabs-lift">
                            <label className=" tab">
                                <a role="tab" href="/auth/user/login">Login</a>
                            </label>
                            <a role="tab" className=" tab" href="/auth/user/register">Register</a>
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
                    <button disabled={isSubmitting} className="btn btn-soft btn-neutral " type="submit">{
                        isSubmitting ? <span className=" loading loading-spinner loading-xl"></span>  : "Login"
                    }</button>
            </form>
        </div>
        </div>
    )
}

export default LoginPage