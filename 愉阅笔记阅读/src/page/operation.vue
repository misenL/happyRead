<template>
    <div class="page page-operation page-hasHeader">
        <o-header title="小说详情">
            <o-icon name="arrow-left" slot="left" :size="20" @click.native="$router.push('/index/home')"></o-icon>
        </o-header>
        
        <div class="book-wrap">

            <div class="bookInfo-wrap">
                <x-img :src="myUrl" class="bookInfo-img" error-class="ximg-error" :offset="-50" container="#vux_view_box_body"></x-img>
                    <!-- <span style="font-size:20px;">{{bookName}}</span> -->
                <!-- 简介 -->
                <div class="bookInfo-text">
                    <div class="text-bookname">{{bookName}}</div>
                    <div class="text-author">{{author}}</div>
                    <div class="text-others">
                        <span>{{type}}</span>
                        <span>{{wordCountAbbr}}</span>
                        <span>{{continues}}</span>
                    </div>
                    <div class="text-others">
                        {{collectionCount}}人收藏了此书
                    </div>
                </div>
            </div>
            <div class="bookIntro-wrap">
                <p>简介</p>
                {{bookIntro}}
            </div>
            <!-- 评论加这里 -->
        </div>
        <div class="conbtn">
            <flexbox>
                <flexbox-item>
                    <x-button plain type="warn" @click.native="collectBook">
                        <i class="fa fa-lg" 
                        :class="isLove? 'fa-heart-o' : 'fa-heart'"
                        :style="{marginRight: '4px'}"></i>
                        {{isLove?'收藏':'已收藏'}}
                    </x-button>
                </flexbox-item>
                <flexbox-item>
                    <x-button type="primary" :link="bookLink">阅读</x-button>
                </flexbox-item>
            </flexbox>
        </div>
        <alert v-model="show" title="提示">{{tipmsg}}</alert>
        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="(!isLove)?'收藏成功':'取消收藏'" :position="position"></toast>
    </div>
</template>
<script>
    import { XImg, Flexbox, FlexboxItem, XButton, XHeader, Masker, Alert, Toast } from 'vux'

    export default {
        components: {
            XImg,
            Flexbox,
            FlexboxItem,
            XButton,
            XHeader,
            Masker,
            Alert,
            Toast
        },
        data() {
            return {
                myUrl: '',
                author: '',
                type: '',
                wordCount: '',
                bookName: '',
                bookLink: '',
                bookIntro: '',
                tipmsg: '',
                show: false,
                showPositionValue: false,
                position: 'default',
                text: '',
                warnmsg: '收藏成功',
                isLove: '',
                collectionCount: '',
                continues: '',
                typeName: {
                    xuanhuan: '玄幻',
                    chunai: '纯爱',
                    zhichang: '职场',
                    lingyi: '灵异',
                    tongren: '同人'
                }
            }
        },
        methods: {
            getBook() {
                this.$http.get(
                    this.HOST + 'api/user/getArticle?_id='+this.$route.params.ids, 
                    {}, 
                    { emulateJSON: true }
                )
                .then((response) => {
                    this.myUrl = 'http://localhost:3000' + response.body[0].bookSrc;
                    this.bookName = response.body[0].bookName;
                    this.bookLink = '/reader/' + response.body[0]._id + '/1';
                    this.bookIntro = response.body[0].intro;
                    this.author = response.body[0].author;
                    this.wordCount = response.body[0].wordCount;
                    this.type = this.typeName[response.body[0].bookType];
                    this.continues = response.body[0].continues == 'end'? '已完结' : '未完结';
                    console.log(response);
                    
                })
            },
            getCollectionCount() {
                this.$http.get(
                    this.HOST + 'api/user/getCollectionCount/' + this.$route.params.ids,
                    {},
                    { emulateJSON: true }
                )
                .then((response) => {
                    this.collectionCount = response.data;
                })
            },
            //收藏书籍到书架
            collectBook(ids, userId, position) {
                if (this.$store.state.usermsg.username == "尚未登陆") {
                    this.tipmsg = '请先登陆再说吧！';
                    this.show = true;
                    setTimeout(() => {
                        this.show = false;
                        this.$router.push('/index/login')
                    }, 1500);
                } else {
                    this.$http.post(this.HOST + 'api/user/getShelf/' + this.$route.params.ids, {
                        userId: this.$store.state.usermsg.userId,
                        bookName: this.bookName,
                        bookSrc: this.myUrl
                    }, { emulateJSON: true }).then((response) => {
                        console.log('Myid', this.$store.state.usermsg.userId)
                        this.isLove = !this.isLove;
                        this.position = position
                        this.showPositionValue = true
                    })
                }

            },
            //确认是否为喜欢的书
            loveBook(ids, userId, isLove) {
                if (this.$store.state.usermsg.username != "尚未登陆") {
                    this.$http.post(this.HOST + 'api/user/loveBook/' + this.$route.params.ids, {
                        userId: this.$store.state.usermsg.userId,
                        isLove: this.isLove
                    }, { emulateJSON: true }).then((response) => {
                        console.log(response)
                        this.isLove = response.body.isLove
                    })
                }
            }
        },
        computed: {
            wordCountAbbr() {
                let count = this.wordCount;
                if (count <= 999) {
                    return count;
                }
                else if (count > 999 && count < 9999) {
                    count = Math.round((count / 1000) * 10) / 10;
                    return count + '坃';
                } else if (count > 9999) {
                    count = Math.round((count / 10000) * 10) / 10;
                    return count + '万';
                } else {
                    return null;
                }
            }
        },
        mounted() {
            let userId = this.$store.state.usermsg.userId;
            this.getBook();
            this.getCollectionCount();
            //this.collectBook(ids,userId);
        },
        created() {
            let ids = this.$route.params.ids;
            let userId = this.$store.state.usermsg.userId;
            let isLove = this.isLove;
            this.loveBook(ids, userId, isLove)
        }
    }
</script>
<style lang="less" scoped>
    .ximg-error {
        background-color: rgb(187, 78, 6)
    }

    .ximg-error:after {
        content: '加载失败';
        color: rgba(255, 0, 0, 0.849);
    }
    .book-wrap{
        background: #fff;
        box-shadow: 2px 0px 2px 1px rgb(170, 170, 170);        
        
    }
    .bookInfo-wrap {
        display: flex;
        width: 100%;
        padding: 15px 20px;
        .bookInfo-img {
            margin: 0 15px 0 auto;
            height: auto;
            box-shadow: 1px 1px 1px rgb(170, 170, 170);
        }
        .bookInfo-text{
            width: 65%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-bottom: 20px;
        }
        .text-bookname{
            font-size: 22px;
        }
        .text-author{
            font-size: 15px;
        }
        .text-others{
            font-size: 13px;
            span{
                padding: 0 4px 0 6px;
                border-left: 1px solid @dividerColor;
            }
            span:first-child{
                padding-left: 0px;
                border-left: none;                
            }
        }
    }
    .bookIntro-wrap{
        padding: 15px 20px;
        font-size: 14px;
    }
    .conbtn {
        position: fixed;
        bottom: 15px;
        width: 100%;
        padding: 0 10px;
    }
</style>