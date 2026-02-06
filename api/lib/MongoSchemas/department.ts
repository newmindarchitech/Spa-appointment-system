import mongoose, { Model } from "mongoose"

export interface IDepartment{
    ID:string,
    name:string
    Created_Date:Date,
    EmployeeIDs:string
}

const DepartmentSchema=new mongoose.Schema<IDepartment,Model<IDepartment>>({
    ID:{type:String,required:true,unique:true},
    name:{type:String,required:true,unique:true},
    Created_Date:{type:Date,default:new Date()},
    EmployeeIDs:[{type:String,ref:'Employee'}]
})

const DepartmentModel=mongoose.model<IDepartment>('Department',DepartmentSchema)

export default DepartmentModel