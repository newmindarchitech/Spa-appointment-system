import {hc} from 'hono/client'
import { AppointmentChec, DepartmentRoute, EmployeeRoute, UserProtection, type AppointmentRoute, type UserRoute } from '.'


const appointment= hc<AppointmentRoute>('http://localhost:2000')

const user= hc<UserRoute>('http://localhost:2000')

const employee= hc<EmployeeRoute>('http://localhost:2000')

const department=hc<DepartmentRoute>('http://localhost:2000')

const UserCheck=hc<UserProtection>('http://localhost:2000')

const AppointmentCheck=hc<AppointmentChec>('http://localhost:2000')

export const userRoutes=user.api

export const appointmentRoutes=appointment.api

export const EmployeeRoutes=employee.api

export const DepartmentApi=department.api

export const UCheck=UserCheck.protect

export const AppoCheck=AppointmentCheck.protect