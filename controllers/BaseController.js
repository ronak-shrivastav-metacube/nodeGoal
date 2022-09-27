class BaseController {
    static SHOWVIEW(_,res,content)
    {
        res.render('index',{content:content})
    }

    static welcome(_,res)
    {
        res.render('index',{content:"<h1>Welcome In CURD APP</h1>"})
    }
}

export default BaseController;