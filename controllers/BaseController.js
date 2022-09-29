class BaseController {

    static welcome(req,res)
    {
        let pageTitle = '';
        
        if(req.path === "/")
            pageTitle = "Home";

        res.render('index',{content:"<h1>Welcome In CURD APP</h1>", pageTitle : pageTitle,alertMsg : ''})
    }
    
    static SHOWVIEW(req,res,content)
    {
        let pageTitle_1 = req.path.split('/')[1];
        let pageTitle = pageTitle_1.charAt(0).toUpperCase() + pageTitle_1.slice(1);
        
        res.render('index',{content:content, pageTitle:pageTitle})
    }

}

export default BaseController;