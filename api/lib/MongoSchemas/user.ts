import mongoose, { Model } from "mongoose"

export interface IAccount{
    ID:string,
    username:string,
    clientemail:string,
    passwordhash:string,
    createdDate:Date,
    AppointmentRecID:string
}

const AccountSchema=new mongoose.Schema<IAccount,Model<IAccount>>({
    ID:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    clientemail:{type:String,required:true,unique:true},
    passwordhash:{type:String,required:true},
    createdDate:{type:Date,default:new Date()},
    AppointmentRecID:{type:String,required:true,ref:'AppointmentRec'}
})

const UserModel=mongoose.model<IAccount>('User',AccountSchema);

export default UserModel