var mongoose = require('mongoose');
var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;

var chapterSchema = new Schema({
    title: String,
    content: {
        type: String,
        required: true
    }
});

// 声明一个数据集 对象
var bookSchema = new Schema({
    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    introduce: {
        type: Boolean
    },
    wordCount: {
        type: Number
    },
    bookContent: {
        type: String,
        default: ''
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
     bookSrc: {
         type: String,
         required: true 
     },
     chapters: [chapterSchema],
     intro:{
        type: String,
        required: true
     },
     bookType:{
        type: String
     },
     continues:{
        type: String
     }
});
// 将数据模型暴露出去
module.exports = mongoose.model('books', bookSchema);