"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppointmentSchemaValidate,AppointmentType,appointmentContext } from "../../../../api/lib/formSchema/appointment";// adjust path if needed

const AppointmentSubmitPage=() => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  useEffect(() => {
    if (success || errorMessage) {
      const timer = setTimeout(() => {
        setSuccess(false);
        setErrorMessage(null);
      }, 3000);
      if(isSubmitSuccessful) {
        reset(undefined, {keepValues: true, keepDirty: false, keepDefaultValues: false});
      }
      return () => clearTimeout(timer);
    }
  }, [success, errorMessage]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting,isSubmitSuccessful },
    reset,
  } = useForm<AppointmentType>({
    resolver: zodResolver(AppointmentSchemaValidate),
    mode:"onSubmit",
  });

  const onSubmit: SubmitHandler<AppointmentType>=async(data)=>{
    console.log(data);

    // simulate API delay

    setSuccess(true);
    reset();

  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            Book an Appointment
          </h2>

          {success && (
            <div className="alert alert-success mt-4">
              <span>Appointment submitted successfully!</span>
            </div>
          )}

           {errorMessage && (
            <div className="alert alert-error mt-4">
              <span>Appointment failed!</span>
            </div>
          )}

          <form
            className="flex flex-col gap-5 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Client Name */}
            <fieldset className=" fieldset floating-label">
              <label className="label">
                <span className="label-text">Client Name</span>
              </label>
              <input
                {...register("clientname")}
                placeholder="Enter full name"
                className="input input-bordered w-full"
              />
            </fieldset>
            {errors.clientname && (
                <span className="text-error text-sm mt-1">
                  {errors.clientname.message}
                </span>
              )}
            {/* Contact Number */}
            <fieldset className=" fieldset floating-label">
              <label className="label">
                <span className="label-text">Contact Number</span>
              </label>
              <input
                {...register("contactnumber")}
                placeholder="+1234567890"
                className="input  w-full"
              />
            </fieldset>
              {errors.contactnumber && (
                <span className="text-error text-sm mt-1">
                  {errors.contactnumber.message}
                </span>
              )}
            {/* Email */}
            <fieldset className=" fieldset floating-label">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="example@email.com"
                className="input input-bordered w-full"
              />
            </fieldset>
               {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            {/* Appointment Context */}
            <fieldset className=" fieldset floating-label">
              <label className="label">
                <span className="label-text">Service</span>
              </label>
              <select
                {...register("appointmentcontext")}
                className="select select-bordered w-full"
              >
                {appointmentContext.map((service) => (
                    <option key={service} value={service}>
                        {service}
                    </option>
                ))}
              </select>
            </fieldset>
            {errors.appointmentcontext && (
                <span className="text-error text-sm mt-1">
                  {errors.appointmentcontext.message}
                </span>
            )}
            <fieldset className=" fieldset floating-label">
              <label className="label">
                <span className="label-text">Appointment Date</span>
              </label>
              <input
                {...register("date")}
                type="date"
                className="input input-bordered w-full"
                min={new Date().toISOString().split("T")[0]} // prevents past dates
              />
            </fieldset>
            {errors.date && (
                <span className="text-error text-sm mt-1">
                  {errors.date.message}
                </span>
              )}
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary mt-4"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit Appointment"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSubmitPage;