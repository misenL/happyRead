var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Book = require('../models/Book');
var Shelf = require('../models/Shelf')


// router.get('/login', function (req, res) {
//     res.render('login');
// });
// router.get('/register', function (req, res) {
//     res.render('register');
// });

// 这里的逻辑将写在 两个post 路由里 
router.post('/login', function (req, res) {
    var postData = {
        username: req.body.username,
        password: req.body.password
    };
    var msg = {};
    User.findOne({
        username: postData.username,
        password: postData.password,
    }, function (err, data) {
        if (err) throw err;
        if (data) {
            msg.status='ok';
            msg.text=postData.username;
            msg.userId=data._id;
            //console.log('msg.userId',msg.userId)
        } else {
            msg.status='err';
            msg.text="用户名或密码错误";
        }
        res.send({msg})
    })
});
router.post('/register', function (req, res) {

    // 获取用户提交的信息
    var postData = {
        username: req.body.username,
        password: req.body.password,
        gender: req.body.gender,
        userimg: req.body.userimg
    };
    console.log("postData", postData);
    // 查询是否被注册
    User.findOne({ username: postData.username }, function (err, data) {
        console.log("data", data);
        if (data != null) {
            res.send('用户名已被注册');
        } else {
            // 保存到数据库
            User.create(postData, function (createErr, createData) {
                if (createErr) throw createErr;
                console.log('您的注册成功');
                res.send('您的注册成功');
                // res.redirect(this.HOST + 'api/user/userList');      // 重定向到所用用户列表
            })
        }
    });
});

router.get('/getArticle',function(req,res){
    var userList = Book.find(req.query).select("-bookContent -chapters").exec(function (err, data) {
        if (err) throw err;
        res.send(data)
    });
})

router.post('/getCollection',function(req,res){
    var userList = Shelf.find({userId:req.body.userId}).exec(function(err,data){
        if(err){
            console.error(err)
        }else{
            let books = data.map(elem => elem.bookId);
            
            Book.find({ _id: { $in: books}},function (err, docs) {
                if(err) console.log(err);
                
                res.send({shelf: data, books: docs})
            }).select("-bookContent -chapters")
        }
    })
})

//获取小说和章节内容
router.get('/getChapter/:ids/:chapter',function(req,res){
    console.log(req.params)
    var userList = Book.findById(req.params.ids,function(err,data){
        if(err){
            console.error(err)
        }else{
            res.send(data.chapters[req.params.chapter])
            //console.log(data.chapters)
        }
    })
})

//获取小说的章节目录
router.get('/getList/:ids/:chapter',function(req,res){
    var userList = Book.findById(req.params.ids,function(err,data){
        var MyLists=[];
        if(err){
            console.error(err)
        }else{
            console.log(data.chapters.length)
            for(var i=0;i<data.chapters.length;i++){
                //console.log(data.chapters[i].title)
                MyLists.push(data.chapters[i].title)
            }
            //console.log(MyLists)
            res.send(MyLists)
            // res.send(data.chapters[req.params.chapter].title)
        }
    })
})
//获取小说的详细书签等
router.post('/postDetail/:ids',function(req,res){
    var postData = {
        userId:req.body.userId,
        bookId:req.params.ids,
        bookChapter: req.body.chapter,
        bookmark: req.body.bookmark
    }
    var updates = { $set: { bookChapter: postData.bookChapter, bookmark: req.body.bookmark}};
    Shelf.findOneAndUpdate({userId:postData.userId,bookId:postData.bookId},updates,function (createErr, createData) {
        if (createErr) throw createErr;
        console.log(createData);
    })
})

// 查看书架
router.post('/getDetail/:ids', function (req, res) {
    var postData = {
        userId: req.body.userId,
        bookId: req.params.ids
    }
    console.log('postData',postData);
    
    Shelf.findOne({ userId: postData.userId, bookId: postData.bookId }, function (createErr, createData) {
        if (createErr) throw createErr;
        res.send(createData);
    })
})

//添加小说到书架
router.post('/getShelf/:ids',function(req,res){
    var postData = {
        userId:req.body.userId,
        bookId:req.params.ids,
        // bookName:req.body.bookName,
        // bookSrc:req.body.bookSrc
    }
    console.log('req.body',req.data)
    Shelf.findOne({ userId: postData.userId,bookId: postData.bookId }, function (err, data) {
        console.log("data", data);
        if (err) {
            console.log(err)
        }else if(data != null){
            Shelf.remove(postData, function (err,data){
                if(err){
                    console.error(err)
                }else{
                    res.send('删除书籍成功')
                }
            })
        } else {
            // 保存到数据库
            Shelf.create(postData, function (createErr, createData) {
                if (createErr) throw createErr;
                console.log('添加书籍成功');
                console.log(postData);
                res.send('添加成功');
            })
        }
    });
})
//获取是否为喜欢的表
router.post('/loveBook/:ids',function(req,res){
    var postData = {
        userId:req.body.userId,
        bookId:req.params.ids,
        isLove:false
    }
    Shelf.findOne({ userId: postData.userId,bookId: postData.bookId }, function (err, data) {
        if (err) {
            console.log(err)
        }else if(data != null){
            postData.isLove=false
        } else {
            postData.isLove=true
        }res.send(postData)
        console.log(data)
    });
})
//获取小说的收藏人数
router.get('/getCollectionCount/:ids', function (req, res) {
    var userList = Shelf.findOne({ bookId: req.params.ids }).count(function (err, count) {
        if (err) {
            console.error(err)
        } else {
            let countVal = count.toString();
            res.send(countVal)
        }
    })
})
// 搜索书籍
router.get('/search/:value', function (req, res) {
    Book.find({
        $or: [
            { bookName: { $regex: req.params.value } }
        ]
        }, 
        function (err, data) {
            if (err) throw err;
            res.send(data)
        }
    )
    .select("-bookContent -chapters");
});

// 获取所有用户列表
router.post('/userList', function (req, res) {
    var userList = User.find({}, function (err, data) {
        if (err) throw err;
        res.send(data)
    });
});

module.exports = router;