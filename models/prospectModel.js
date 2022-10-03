import mongoose, { isObjectIdOrHexString } from "mongoose";

const prospectSchema = new mongoose.Schema({
    prospectName : {type:String, required : true, trim : true},
    prospectOfficalEmail : {type:String, required:true, trim : true },
    prospectOfficalContact : {type:String, required:true, trim : true },
    companyId : {type:mongoose.Schema.Types.ObjectId, ref:"company" },
    prospectDesignation : {type:String, required : true, trim : true},
    projectId : {type:mongoose.Schema.Types.ObjectId, ref:"project" },
    prospectDescription : {type:String, required : true, trim : true},
    prospectStatus : {type:String}
},{
    timestamps: true
});

const prospectModel = mongoose.model('prospect',prospectSchema)

export default prospectModel;

