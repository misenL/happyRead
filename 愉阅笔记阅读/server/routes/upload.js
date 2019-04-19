var express = require('express');
var router = express.Router();
var path = require('path')
var fs = require('fs');
var iconv = require('iconv-lite')
var Book = require('../models/Book')
var bodyParser=require('body-parser');
var process = require('process');
let uploadDir = process.cwd() + '/public/upload';
var multer = require('multer');
var storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
       destination: function (req, file, cb) {
           cb(null, uploadDir)
      }, 
    //给上传文件重命名，获取添加后缀名
     filename: function (req, file, cb) {
         var fileFormat = (file.originalname).split(".");
         cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
     }
});  
//添加配置文件到muler对象。
var upload = multer({
        storage: storage
});

let reg = /(?=\s*)(第[零一二两三四五六七八九十百千\d]+章\s+.+)(?=\s*)/gm;

/* 获取所有章节标题 */
function getChapterTitle(str) {
    let titles = str.match(reg);
    return titles;
}

/* 检查是否可分章节 */
function isChapterSlice(str) {
    return reg.test(str);
}

/* 获取章节标题和内容 */
function sliceChapter(str) {
    let titles = getChapterTitle(str);
    let chapters = [];
    let chapterList = [];

    chapters = str.split(reg);

    if(titles){
        //补充前言
        if(titles.length*2 < chapters.length){
            let front = chapters.shift();
            chapterList.push(
                {
                    title: '开始',
                    content: front
                }
            )
        }
        
        for (let i = 1; i < chapters.length; i+=2) {
            chapterList.push(
                {
                    title: chapters[i-1],
                    content: chapters[i]
                }
            )
        }
        return chapterList;
    } else {
        return [{
            title: 'error',
            content: 'error'
        }];
    }
}

router.post('/do_upload',upload.any(),function(req,res){
    //小说文本
    let novel = req.files[0].filename;
    let bookSrc = '/upload/' + req.files[1].filename;
    let wordCount = req.files[0].size;

    let data = fs.readFileSync(uploadDir + '/' + novel );
    let content = data.toString();
    //小说的信息
    let info = req.body;
    let bookData = {
        bookName: info.bookName,
        author: info.author,
        wordCount:wordCount,
        bookContent:content,
        bookSrc: bookSrc,
        intro: info.intro,
        bookType: info.adminClass,
        continues: info.ends,
        chapters:sliceChapter(content)
    };
    // console.log('bookData',bookData);

    Book.create(bookData, function (createErr, createData) {
        if (createErr) throw createErr;
        console.log('添加小说成功');
        console.log(info)
    })
});


router.get('/delete',function(req,res,next){
    //删除表单信息
    switch(req.query.act){
        case 'del':
         Book.findOne({_id: req.query.id},(err,data)=>{
             if(err){
                 console.error(err)
                 res.status(500).send('database error').end();
             }else{
                let bookSrc = process.cwd() + '/public/' + data.bookSrc;
                fs.unlink(bookSrc,(err)=>{
                    if(err){
                        console.error(err);
                        res.status(500).send('file can not find').end();
                    }else{
                        Book.remove({_id: req.query.id},(err,data)=>{
                            if(err){
                                console.error(err);
                                res.status(500).send('database error').end();
                            }else{
                                res.redirect('/admin/index')
                            }
                        })                                    
                    }
                })
             }
         })
        //修改表单
        //  braek;
        //  case 'mod':
        //  Book.findOne({_id: req.query.id},(err,data)=>{
        //     if(err){
        //         console.error(err);
        //         res.status(500).send('database error').end();
        //     }else if(data.length==0){
        //         res.status(500).send('data not found').end();
        //     }else{
        //         Book.find({ _id: {$exists: true}},(err,bookes)=>{
        //             if(err){
        //                 console.log(err);
        //                 res.status(500).send('database err').end();
        //             }else{
        //                 res.render('index.ejs',{bookes,mod_data:data[0]})
        //             }
        //         });
        //     }
        // })
        
    }

})
// 导出模块（在 app.js 中引入）
module.exports = router;