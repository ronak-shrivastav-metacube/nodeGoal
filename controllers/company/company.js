import BaseController from '../BaseController';
import CompanyModel from '../../models/companyModel';
import projectModel from '../../models/projectModel';
import ejs from'ejs';
import * as fs from 'fs'
import path from 'path';
const rootPath = path.resolve("./");

class Company {

    async companyAdd(req,res) {
        let requestMethod = req.method;

        if(requestMethod === 'GET')
        {
            var content = fs.readFileSync(rootPath+"/views/pages/company/add.ejs").toString()
            BaseController.SHOWVIEW(req,res,content);
        }
        else if(requestMethod === 'POST')
        {
            let data = new CompanyModel({
                companyName : req.body.companyName,
                companyOfficalEmail : req.body.companyOfficalEmail,
                companyOfficalContact : req.body.companyOfficalContact,
                companyLocation : req.body.companyLocation,
                companyStatus : "Active"
            });
            let heading = '';
            let message = '';
            let status = '';
            try {
                let result = await data.save();
                heading = "congratulations!";
                message = "New Company Added Successfully!";
                status = "success";
            } catch (error) {
                heading = "Ooopsss..";
                message = "Something Error while stroing!";
                status = "danger";
            }
            var content = '';
            let alert = '';
        
            res.render('components/alerts.ejs',{heading : heading, message : message, status : status},(err,html)=>{content = "<div class='container mt-4'><div class='row'><div class='offset-3 col-6'>"+html+"</div></div></div>".toString()})
            content = content + fs.readFileSync(rootPath+"/views/pages/company/add.ejs").toString()
            BaseController.SHOWVIEW(req,res,content);
        }
    }

    async companyShowAll(req,res) {
        // let data = await CompanyModel.find();
        // data.forEach((item) =>{
        //     var query = projectModel.find({companyId : item._id});
        //     query.count(function (err, count) {
        //         if (err) console.log(err)
        //         else item.projctCount = count
        //     });
        // })

        let data = await CompanyModel.aggregate([
            {
                $lookup:
                        {
                            from: "projects",
                            let: { "id":"$_id" },
                            pipeline : [
                                { 
                                    $match: 
                                    { 
                                        $expr: 
                                        { 
                                            $and: 
                                            [
                                                {$eq: ["$companyId","$$id"] },
                                                {$eq: ["$projectStatus","Active"] }
                                            ]
                                        } 
                                    } 
                                }
                            ],
                            as: "activeProjects"
                        }
            },
            {
                $lookup:
                        {
                            from: "projects",
                            let: { "id":"$_id" },
                            pipeline : [
                                { 
                                    $match: 
                                    { 
                                        $expr: 
                                        { 
                                            $and: 
                                            [
                                                {$eq: ["$companyId","$$id"] },
                                                {$eq: ["$projectStatus","In-Active"] }
                                            ]
                                        } 
                                    } 
                                }
                            ],
                            as: "inActiveProjects"
                        }
            },
            {
                $lookup:
                        {
                            from: "projects",
                            let: { "id":"$_id" },
                            pipeline : [
                                { 
                                    $match: 
                                    { 
                                        $expr: 
                                        { 
                                            $and: 
                                            [
                                                {$eq: ["$companyId","$$id"] },
                                                {$eq: ["$projectStatus","Pospond"] }
                                            ]
                                        } 
                                    } 
                                }
                            ],
                            as: "pospondProjects"
                        }
            },
            {
                $lookup:
                        {
                            from: "prospects",
                            localField: "_id",
                            foreignField: "companyId",
                            as: "prospects"
                        }
            }
        ])
        let content = '';
        // data.forEach((item)=>{
        //     console.log(item);        
        // })
        res.render('pages/company/all.ejs',{data : data},(err,html)=>{content = html.toString()})
        
        BaseController.SHOWVIEW(req,res,content);
    }
}

export default new Company();