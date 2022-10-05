import mongoose from 'mongoose';
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
                projectStatus : "Active"
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
        // projectModel.find().populate("companyId").then(p=>console.log(p)).catch(error=>console.log(error));
        // const projects = await projectModel.find().populate("companyId");
        let projects = await projectModel.aggregate([
            {
                $lookup:
                        {
                            from: "prospects",
                            localField: "_id",
                            foreignField: "projectId",
                            as: "prospects"
                        }
            }
        ]);
        await projectModel.populate(projects,{path : "companyId"});

        var content = '';
        res.render('pages/project/all.ejs',{projects : projects},(err,html)=>{
            content = html.toString();
        });
        BaseController.SHOWVIEW(req,res,content);
    }

    async projectView(req,res) 
    {
        let array = JSON.parse(BaseController.STRINGSEPARATOR(req.path,"/"))
        let _id = array.pop();

        let projectData = await projectModel.findById(_id).populate('companyId');
        let content = '';
        res.render("pages/project/edit.ejs",{project:projectData},(err,html)=>{
            content = html.toString();
        })
        BaseController.SHOWVIEW(req,res,content);
    }

    async findProject(req,res)
    {
        let projectId = req.body.projectId;
        let typeAction = req.body.typeAction;
        let json = '';
        let projectData = await projectModel.aggregate([
                {
                    $match : { _id: mongoose.Types.ObjectId(projectId)}
                },
                {
                    $lookup : {
                        from: "prospects",
                        localField: "_id",
                        foreignField: "projectId",
                        as: "prospects"
                    }
                }
            ]);
            await projectModel.populate(projectData,{path:'companyId'});
        

            if(typeAction === 'view') { json = { "projectData": projectData[0] }; }
            else {
                let companies = await companyModel.find();
                json = { "projectData": projectData[0], companies : companies };
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(json, null, 3));
    }

    async updateProject(req,res)
    {   
        let _id = req.body._id;
        let set = {
            projectName : req.body.projectName,
            projectDescription : req.body.projectDescription,
            companyId : req.body.companyId,
            projectStatus : req.body.projectStatus
        };
        
        let json = "";
        try {
            await projectModel.findByIdAndUpdate(_id,set);
            json = {status : 1, error : 0};
        } catch (error) {
            json = {status : 0, error : 1};
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(json, null, 3));
    }
}

export default new Project();