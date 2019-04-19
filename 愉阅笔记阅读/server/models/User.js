var mongoose = require('mongoose');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;
//林铭欣25添加
var shelfSchema = new Schema({
    bookmark: Number,
    curReadAt: Date,
    readTime: Date,
    createAt: {
        type: Date,
        default: Date.now()
    }
});

var userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userimg: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    birthDate: {
        type: Date
    },
    createAt: {
        type: Date,
        default: Date.now()
    },

    shelf: [shelfSchema]
});

userSchema.methods.register = function (postData) {
    User.findOne({ username: postData.username }, function (err, data) {
        if (data != null) {
            res.send('用户名已被注册');
        } else {
            // 保存到数据库
            User.create(postData, function (createErr, createData) {
                if (createErr) throw createErr;
                console.log(createData.username+'注册成功');
            })
        }
    });
}

userSchema.methods.login = function (postData) {
    User.findOne({
        username: postData.username,
        password: postData.password
    }, function (err, data) {
        if (err) throw err;
        if (data) {
            res.send('登录成功');
        } else {
            res.send('账号或密码错误')
        }
    })
}



// 将数据模型暴露出去
module.exports = mongoose.model('users', userSchema);