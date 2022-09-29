import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    companyName : {type:String, required : true, trim : true},
    companyOfficalEmail : {type:String, required : true, trim : true, unique : true},
    companyOfficalContact : {type:String, required : true, trim : true, unique : true},
    companyLocation : {type:String, required : true, trim : true},
    companyStatus : {type:String, required : true}
},{
    timestamps: true
});

const companyModel = mongoose.model('company',companySchema)

export default companyModel;

