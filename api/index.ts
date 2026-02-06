import { Hono } from 'hono'
import mongoose from 'mongoose'
import { AppointmentRoutes } from './lib/sub-routes/appointmentApi'
import { AccountRoutes } from './lib/sub-routes/userApi'
import { UserProtection } from './lib/route_protection/userProtection'
import { AppointmentProtection } from './lib/route_protection/appointmentProtection'
import { EmployeeRoute } from './lib/sub-routes/employeeApi'
import { DepartmentRoute } from './lib/sub-routes/departmentApi'


const mongo_url=Bun.env.MONGODB_URL as string

mongoose.connect(mongo_url).then(()=>console.log(
 "Connected to database,Ready to listen"
))
.catch((error)=>
  console.log(error)
)
const app = new Hono()

const AppointmentApi=app.basePath("/api").route("/appointments",AppointmentRoutes)
const UserApi=app.basePath("/api").route("/user",AccountRoutes)
const EmployeeApi=app.basePath("/api").route("/employee",EmployeeRoute)
const DepartmentApi=app.basePath("/api").route("/departments",DepartmentRoute)
const UserProtectionCheck=app.basePath("/protect").route('/users',UserProtection)
const AppointmentCheck=app.basePath("/protect").route('/appointments',AppointmentProtection)
export type AppointmentRoute= typeof AppointmentApi
export type UserRoute= typeof UserApi
export type EmployeeRoute= typeof EmployeeApi
export type DepartmentRoute= typeof DepartmentApi
export type UserProtection=typeof UserProtectionCheck
export type AppointmentChec=typeof AppointmentCheck
export default {
  port: 2000,
  fetch: app.fetch,
}
