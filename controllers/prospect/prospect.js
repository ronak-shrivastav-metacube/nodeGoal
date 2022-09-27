import BaseController from '../BaseController';
import * as fs from 'fs'
import path from 'path';
const rootPath = path.resolve("./");

class Prospect {

    companyAdd(req,res) {
        let requestMethod = req.method;

        if(requestMethod === 'GET')
        {
            var content = fs.readFileSync(rootPath+"/views/pages/prospect/add.ejs").toString()
            BaseController.SHOWVIEW(req,res,content);
        }
        else if(requestMethod === 'POST')
        {
            console.log(req.body.companyName);
        }
    }

    companyShowAll(req,res) {
        var content = fs.readFileSync(rootPath+"/views/pages/prospect/all.ejs").toString()
        BaseController.SHOWVIEW(req,res,content);
    }
}

export default new Prospect();