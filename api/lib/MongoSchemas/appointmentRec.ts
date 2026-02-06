import mongoose, { Model } from "mongoose"

export interface IAppointmentRec{
    ID:string,
    UserID:string,
    Appointments:string
}

const AppointmentRecSchema=new mongoose.Schema<IAppointmentRec,Model<IAppointmentRec>>({
    ID:{type:String,required:true,unique:true},
    UserID:{type:String,ref:'User',required:true},
    Appointments:[{type:String,ref:'Appointment'}]
})

const AppointmentRecModel= mongoose.model('AppointmentRec',AppointmentRecSchema)

export default AppointmentRecModel