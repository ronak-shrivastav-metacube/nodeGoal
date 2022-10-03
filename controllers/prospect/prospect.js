import BaseController from '../BaseController';
import companyModel from '../../models/companyModel';
import projectModel from '../../models/projectModel';
import prospectModel from '../../models/prospectModel';
import * as fs from 'fs'
import path from 'path';
const rootPath = path.resolve("./");

class Prospect {

    async prospectAdd(req,res) {
        let requestMethod = req.method;

        if(requestMethod === 'GET')
        {
            let compaines = await companyModel.find({companyStatus : "Active"})
            let projects = await projectModel.find({projectStatus : "Active"})

            var content = '';
            res.render("pages/prospect/add.ejs",{compaines:compaines, projects:projects},(err,html)=>{
                content = html.toString();
            })
            BaseController.SHOWVIEW(req,res,content);
        }
        else if(requestMethod === 'POST')
        {
            let data = new prospectModel({
                prospectName : req.body.prospectName,
                prospectOfficalEmail : req.body.prospectOfficalEmail,
                prospectOfficalContact : req.body.prospectOfficalContact,
                companyId : req.body.prospectCompanyId,
                prospectDesignation : req.body.prospectDesignation,
                projectId : req.body.prospectProjectId,
                prospectDescription : req.body.prospectDescription,
                prospectStatus : "Active",
            })

            let heading = '';
            let message = '';
            let status = '';
            try {
                let result = await data.save();
                heading = "congratulations!";
                message = "New Prospect Added Successfully!";
                status = "success";
            } catch (error) {
                heading = "Ooopsss..";
                message = "Something Error while stroing!";
                status = "danger";
            }
            var content = '';
            let alert = '';
        
            res.render('components/alerts.ejs',{heading : heading, message : message, status : status},(err,html)=>{content = "<div class='container mt-4'><div class='row'><div class='offset-3 col-6'>"+html+"</div></div></div>".toString()})
            content = content + fs.readFileSync(rootPath+"/views/pages/prospect/add.ejs").toString()
            BaseController.SHOWVIEW(req,res,content);
        }
    }

    async prospectShowAll(req,res) {

        let prospects = await prospectModel.find().populate('companyId').populate('projectId')

        let content = '';
        res.render('pages/prospect/all.ejs',{prospects: prospects},(err,html)=>{
            if(err)
            console.log(err);
            else
            content = html.toString();
        })

        BaseController.SHOWVIEW(req,res,content);
    }

}

export default new Prospect();