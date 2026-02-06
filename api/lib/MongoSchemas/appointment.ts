import mongoose, { Model } from 'mongoose'

export interface IAppointment{
    ID:string,
    clientName:string,
    clientcontactNumber:number,
    email:string,
    appointmentContext:string,
    appointmentDate:Date,
    status:string,
    createdDate:Date,
    AppointmentRec:string,
    CustomerID:string
}

const AppointmentSchema=new mongoose.Schema<IAppointment,Model<IAppointment>>({
    ID:{type:String,required:true,unique:true},
    clientName:{type:String,required:true,unique:true},
    clientcontactNumber:{type:Number,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    appointmentContext:{type:String,required:true},
    appointmentDate:{type:Date,required:true},
    status:{type:String,required:true},
    createdDate:{type:Date,default:Date.now},
    AppointmentRec:{type:String,required:true,ref:'AppointmentRec'},
    CustomerID:{type:String,ref:'User'}
})

const AppointmentModel = mongoose.model<IAppointment>('Appointment', AppointmentSchema);

export default AppointmentModel;