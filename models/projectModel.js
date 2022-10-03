import mongoose, { isObjectIdOrHexString } from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName : {type:String, required : true, trim : true},
    companyId : {type:mongoose.Schema.Types.ObjectId, ref:"company" },
    projectDescription : {type:String, required : true, trim : true},
    projectStatus : {type:String}
},{
    timestamps: true
});

const projectModel = mongoose.model('project',projectSchema)

export default projectModel;

