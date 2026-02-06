import mongoose, { Model } from "mongoose"

export interface IEmployee{
    ID:string,
    name:string,
    password:string,
    contact_number:number
    joinedDate:Date,
    date_of_birth:Date,
    Department:string
}

const EmployeeSchema= new mongoose.Schema<IEmployee,Model<IEmployee>>({
    ID:{type:String,required:true,unique:true},
    name:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    date_of_birth:{type:Date,required:true},
    contact_number:{type:Number,required:true,unique:true},
    joinedDate:{type:Date,default:new Date()},
    Department:{type:String,required:true,ref:'Department'}
})

const EmployeeModel=mongoose.model<IEmployee>('Employee',EmployeeSchema)

export default EmployeeModel