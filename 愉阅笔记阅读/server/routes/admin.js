var express = require('express');
var router = express.Router();
var Book = require('../models/Book')
var mongoose = require('mongoose');
const common=require('../../libs/common')
mongoose.connect('mongodb://127.0.0.1:27017/xBook');
//后台
var Adminuser=require('../models/adminuser')

/* 这里是修改的默认路径，如有问题可以恢复！！！！！！！！！！！！！！！！*/
 router.get('/index', function(req, res, next) {
     Book.find({}, function (err, books) {
         if (err) throw err;
         if (books) {
            if(!req.session['admin_id'] && req.url!='/login'){   //假如没有登陆
                res.redirect('/admin/login');
            }else{
               res.render('admin', { title: '管理员平台', books });  
            }
            
         } else {
             res.send('错误')
         }
     })
 });

//检查登陆状态
router.use((req,res,next)=>{
    //console.log(req.session)
    if(!req.session['admin_id'] && req.url!='/login'){   //假如没有登陆
        res.redirect('/admin/login');
    }else{
        next()
    }
})


router.get('/login',(req,res)=>{
    res.render('../views/login.ejs',{});
    Adminuser.find({},function(err,data){
        if(err){
            console.log(err)
        }else{
            console.log('有数据了但不告诉你')
        }
    })
})
router.post('/login',(req,res)=>{
    console.log(req.body)
    var username=req.body.username;
    var password=common.md5(req.body.password+common.MD5_SUFFIX);
    Adminuser.find({username:req.body.username},(err,data)=>{
        if(err){
            console.error(err)
            res.status(500).send('database error').end();
        }else{
            if(data.length==0){
                res.status(400).send('no user').end();
                // console.log(data)
            }else{
                if(data[0].password==password){
                    //成功
                    req.session['admin_id']=data[0].ID;
                    res.redirect('/admin/index')
                }else{
                    res.status(404).send('密码错了')
                    console.log(password)
                }
            }
        }
    })
    
})



module.exports = router;
