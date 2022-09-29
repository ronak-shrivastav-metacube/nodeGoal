import BaseController from '../BaseController';
import projectModel from '../../models/projectModel';
import companyModel from '../../models/companyModel';
import * as fs from 'fs'
import path from 'path';
const rootPath = path.resolve("./");

class Project {

    async projectAdd(req,res) {
        let requestMethod = req.method;

        if(requestMethod === 'GET')
        {
            let companies = await companyModel.find();
            let content = ''; 
            res.render('pages/project/add.ejs',{companies : companies},(err,html)=>{
                content = html.toString();
            });
            // var content = fs.readFileSync(rootPath+"/views/pages/project/add.ejs").toString()
            BaseController.SHOWVIEW(req,res,content);
        }
        else if(requestMethod === 'POST')
        {
            let data = new projectModel({
                projectName : req.body.projectName,
                companyId : req.body.companyId,
                projectDescription : req.body.projectDescription,
                status : "Active"
            })

            let heading = '';
            let message = '';
            let status = '';
            try {
                let result = await data.save();
                heading = "congratulations!";
                message = "New Project Added Successfully!";
                status = "success";
            } catch (error) {
                heading = "Ooopsss..";
                message = "Something Error while stroing!";
                status = "danger";
            }
            var content = '';
            let alert = '';
        
            res.render('components/alerts.ejs',{heading : heading, message : message, status : status},(err,html)=>{content = "<div class='container mt-4'><div class='row'><div class='offset-3 col-6'>"+html+"</div></div></div>".toString()})
            content = content + fs.readFileSync(rootPath+"/views/pages/project/add.ejs").toString()
            BaseController.SHOWVIEW(req,res,content);
        }
    }

    async projectShowAll(req,res) {
        const data = await projectModel.find().populate("companyId");
        console.log(data);
        var content = fs.readFileSync(rootPath+"/views/pages/project/all.ejs").toString()
        BaseController.SHOWVIEW(req,res,content);
    }
}

export default new Project();