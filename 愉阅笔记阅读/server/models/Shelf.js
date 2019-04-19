var mongoose = require('mongoose');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var ObjectId = Schema.Types.ObjectId;
// 声明一个数据集 对象
var shelfSchema = new Schema({
    userId: ObjectId,
    bookId: ObjectId,
    //书的第几章节
    bookChapter: {
        type:Number,
        default:1
    },
    // 书签
    bookmark:{
        type:Number,
        default:0
    },
    // 最近阅读时间
    curReadAt: Date,
    // 阅读时间
    readTime: Date,
    createAt: {
        type: Date,
        default: Date.now()
    },
    // bookName: String,
    // bookSrc: String
});
shelfSchema.statics = {
    //获取收藏的图书
    getUserShelf(userId,data){
        shelf.find({userId:userId},function(err,data){
            if(err){
                console.error(err)
            }else{
                shelf.create(data, function (err, data) {
                    if (err) throw createErr;
                    console.log('书架添加成功');
                })
            }
        })
    }
}

module.exports = mongoose.model('shelfs', shelfSchema);