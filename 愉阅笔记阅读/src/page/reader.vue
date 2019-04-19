<!--  -->
<template>
    <div class="page-reader">
        <!-- 弹幕内容 -->
        <div class="danmu" id="danmu">
            
        </div>

        <toast v-model="showPositionValue" type="text" :time="800" is-show-mask :text="'收藏成功'"></toast>
        <!-- 阅读界面开始 -->
        <div 
            class="reader-header"
            :style="{background: readerStyleVal.backgroundColor}">
            <span class="wrap-left">{{title}}</span>
            <span class="wrap-middle">已阅读15分钟</span>
        </div>
        <!--提示登陆-->
        <alert v-model="showMsg" title="警告">{{tipmsg}}</alert>
        <div class="reader-view">
            <div class="content-wrap"
                ref="content-wrap"
                :style="readerStyleVal"
                >
                <h3 class="content-title">{{title}}</h3>
                <p class="content-paragraph" 
                    v-for="(paragraph,index) in contentView"
                    :key="index"
                    v-text="paragraph"
                    v-if="paragraph">
                </p>
            </div>
            <div 
                class="touch-wrap"
                :style="{
                    opacity: 1-lightenData*0.1
                }">
                <div class="touch-top touch"></div>
                <div class="touch-middle touch" @click="handleClientMiddle"></div>
                <div class="touch-bottom touch"></div>
            </div>
            <div class="reader-footer" @click="handleFooter">
                <p>您已阅读完本章节</p>
                <p>点击继续阅读下一章</p>
            </div>
        </div>
        <!-- 阅读界面结束 -->
        <!-- 弹出层开始 -->
        <!-- 导航栏 -->
        <popup 
            v-model="isShowBar" 
            :show-mask="mask"
            :popup-style="{zIndex: '600'}"
            @on-hide="blurTabbarItem">
            <tabbar
                :style="{
                    position: 'fixed',
                    padding: '10px 0 8px 0' 
                }"
                v-model="showNum">
                    <tabbar-item 
                        v-for="(item,id) in tabItems" :key="id"
                        @on-item-click="handleTabbarItem(id)"
                        :selected="isShowEdit[id]"
                        >
                        <o-icon :name="item.icon" slot="icon" :size="20"></o-icon>
                    </tabbar-item>
            </tabbar>
        </popup>

        <!-- 头部 -->
        <popup v-model="isShowBar" :show-mask="mask" position="top">
            <o-header :shadow="false">
                <o-icon name="arrow-left" slot="left" :size="20" 
                    @click.native="handleReturn"></o-icon>
                <o-icon name="bookmark" slot="right" @click.native="handleBookmark" v-if="bookmark"></o-icon>
                <span v-else slot="right" class="btn-collect" @click="collectBook">立即收藏</span>
            </o-header>
        </popup>
        
        <!-- 弹幕开始 -->

        <popup 
            v-model="isShowBar" 
            :show-mask="mask" 
            position="top" 
            :popup-style="popupStyleTop">
            <input type="text" name="Barrage" class="Barrage" id="barrageID" placeholder="吐槽点什么把……">
            <button class="barrageButton" @click="barrageButton()">发送</button>
            <inline-x-switch v-model="value" id="barrageSwitch" @on-change="barrageSwitch()"></inline-x-switch>
        </popup>
        <popup 
            v-model="isShowBar" 
            :show-mask="mask" 
            position="top" 
            :popup-style="popupStyleTop2">
            <input type="text" name="Barrage" class="Barrage" id="barrageID2" placeholder="盖住不想看">
            <button class="barrageButton" @click="barrageButton2()">遮眼</button>
        </popup>
        <!-- end -->
        <!-- 目录 -->
        
        <popup
            v-model="isShowEdit[0]"
            :show-mask="mask"
            position="left"
            :popup-style="popupStyleVal">
            <div style="width: 300px">
                <group title="目录">
                    <cell-box 
                        v-for="(item,id) in getChapterTitle" :key="id"
                        :title="item" :link="ChapterLink+id">
                        <div @click="WatchList()">{{item}}</div>
                    </cell-box>
                    <!--<cell-box link="/login">
                        
                    </cell-box>-->
                </group>
            </div>
        </popup>

        <!-- 颜色和亮度 -->
        <popup 
            v-model="isShowEdit[1]"
            :show-mask="mask"
            :popup-style="popupStyleVal">
            <group>
                <cell primary="content">
                    <mt-range v-model="lightenData" :max="10">
                        <div slot="end">
                            <o-icon name="sun-o"></o-icon>
                        </div>
                        <div slot="start">
                            <o-icon name="moon-o"></o-icon>                                
                        </div>
                    </mt-range>
                </cell>
                <cell-box primary="content">
                    <checker 
                        v-model="colorType" 
                        default-item-class="color-checker" 
                        selected-item-class="color-checker-selected"
                        :style="{margin: '0 auto'}">
                        <checker-item 
                            v-for="(item,id) in colorTypeList" :key="id"
                            :value="id"
                            :style="{ backgroundColor: item.bgColor }">
                        </checker-item>
                    </checker>
                </cell-box>
            </group>
        </popup>

        <!-- 字体 -->
        <popup 
            v-model="isShowEdit[2]"
            :show-mask="mask"
            :popup-style="popupStyleVal">
            <group>
                <cell primary="content">
                    <mt-range v-model="fontSize" :max="12">
                        <div slot="start">
                            <o-icon name="font" :size="14"></o-icon>
                        </div>
                        <div slot="end">
                            <o-icon name="font" :size="26"></o-icon>                                
                        </div>
                    </mt-range>
                </cell>
            </group>
        </popup>
        <!-- 弹出层结束 -->
    </div>
</template>

<script>
import { Tabbar, TabbarItem, Popup, Checker, CheckerItem, Alert, Toast, XButton, InlineXSwitch} from 'vux'
import { setInterval, clearTimeout } from 'timers';
import axios from 'axios';
import myData from '../../ban.json'
export default {
    components: {
        Tabbar, TabbarItem,
        Popup,
        Checker, CheckerItem,
        Alert,
        Toast,
        XButton, InlineXSwitch
    },
    data () {
        return {
            scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
            scrollHeight: document.documentElement.scrollHeight,
            innerHeight: window.innerHeight,
            isShowBar: this.value,
            colorTypeList:[
                {
                    color: '#000',
                    bgColor: '#fff'
                },
                {
                    color: '#000',
                    bgColor: '#f5efd9'
                },
                {
                    color: '#000',
                    bgColor: '#c0edc6'
                },
                {
                    color: '#939393',
                    bgColor: '#000'
                }
            ],
            tabItems: [
                {
                    icon: 'bars'
                },
                {
                    icon: 'sun-o'
                },
                {
                    icon: 'font'
                }
            ],
            progressStep: 1,

            mask: true,
            fontSize: 4,
            isShowBar: false,
            showNum: -1,
            isShowEdit:{
                0: false,
                1: false,
                2: false
            },
            progressData: 0,
            progressVal: 0,
            lightenData: 10,
            colorType: 0,
            fontStyle: 1,
            //下面是改动过的
            bookInfo: '',
            allContent:'',
            title: '',
            MyIndex:'',
            getChapterTitle:'',
            chapterLink:'',
            chapterModel:this.$route.params.chapter,
            showMsg:false,
            tipmsg:'',
            bookmark: null,
            bookName: '',
            showPositionValue: false,
            barrageArray: [],
            value: false,
            valueSwitch: false,
            timers: null,
            getJSONArry: null,
            barrageStr: '',
            resi: 0
        };
    },
    computed: {
        chaptersParam(){
            return this.$route.params.chapter;
            
        },
        contentView(){
            let str = this.allContent;
            let reg = /\n+/gm;
            let paragraphs = str.split(reg);            
            return paragraphs;
        },
        isScrollToBottom(){
           return this.scrollHeight - this.scrollTop < 660;
        },
        readerStyleVal(){
            return {
                color: this.colorTypeList[this.colorType].color,
                backgroundColor: this.colorTypeList[this.colorType].bgColor,
                fontSize: `${14+this.fontSize}px`
            }
        },
        popupStyleVal(){
            return {
                bottom: '50px'
            }
        },
        popupStyleTop() {
            return {
                top: '50px',
                height: '70px'
            }
        },
        popupStyleTop2() {
            return {
                top: '80px',
            }
        }
    },

    methods: {
        //这里是引入小说的接口
        getBook(ids,chapter){
            this.$http.get(this.HOST+'api/user/getChapter/'+this.$route.params.ids+'/'+this.$route.params.chapter,{
            },{emulateJSON:true}).then((response)=>{
                this.allContent = response.data.content;
                this.title = response.data.title;
            })
            console.log(this.$route.params.ids);
            
        },        
        //小说的目录接口
        getBookList(ids,chapter){
            this.$http.get(this.HOST+'api/user/getList/'+this.$route.params.ids+'/'+this.$route.params.chapter,{
            },{emulateJSON:true}).then((response)=>{
                // console.log('asdasdsad')
                // console.log(response)
                this.getChapterTitle=response.body;
                this.ChapterLink = '/reader/'+this.$route.params.ids+'/';
                
            })
        },
        //小说传详细的书签
        getBookDeatail(ids,chapter){

        },
        //下面是其他的
        handleScroll() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            // console.log(this.scrollTop);
        },
        blurTabbarItem(){
            let isShowEdit = this.isShowEdit;
            for (const id in isShowEdit) {
                this.isShowEdit[id] = false;
            }
            this.showNum = -1;
        },
        handleTabbarItem(index) {
            this.blurTabbarItem();
            this.isShowEdit[index] = true;
        },
        // handleClientTop() {
        //    document.documentElement.scrollTop? 
        //    document.documentElement.scrollTop -= this.innerHeight :
        //    document.body.scrollTop -= this.innerHeight;
           
        // },

        handleClientMiddle() {
            this.isShowBar = !this.isShowBar;
        },

        // handleClientBottom() {
        //     if (this.isScrollToBottom) {
        //         // console.log('ok');
        //         var ids=this.$route.params.ids;
        //         var chapter=this.$route.params.chapter;
        //         var newChapter=parseInt(chapter)+1
        //         this.$router.push('/reader/'+ids+'/'+newChapter)
        //         // document.location.reload();
        //     } else {
        //         document.documentElement.scrollTop? 
        //         document.documentElement.scrollTop += this.innerHeight :
        //         document.body.scrollTop += this.innerHeight;
        //     }
        // },
            
        handleFooter(){
            var ids = this.$route.params.ids;
            var chapter=this.$route.params.chapter;
            var newChapter=parseInt(chapter)+1
            this.$router.push('/reader/'+ids+'/'+newChapter)
        },

        handleBookmark() {
            this.SaveBookmark();
        },

        handleReturn(){
            this.SaveBookmark()
            this.$router.push(this.bookmark ? '/index/shelf' : '/operation/' + this.$route.params.ids)
            
        },

        WatchList(){
            // console.log('又没要刷新啊？')
            //document.location.reload();
        },
        //没有登陆别想看
        CheckLogin(){
            if(this.$store.state.usermsg.username=="尚未登陆" && this.$route.params.chapter>2){
                this.showMsg=true;
                this.tipmsg='请先登录再看吧！'
                setTimeout(() => {
                    this.showMsg = false;
                    this.$router.push('/index/login')
                    }, 1500);
                }
        },
        //保存阅读的状态
        SaveBookmark(ids,chapter,userId){
            if(this.$store.state.usermsg.username=="尚未登陆"){
                // console.log('先登录再说吧')
            }else{
                this.$http.post(
                    this.HOST+'api/user/postDetail/'+this.$route.params.ids,
                    {
                        userId:this.$store.state.usermsg.userId,
                        chapter: this.$route.params.chapter,
                        bookmark: this.scrollTop,
                    },
                    {emulateJSON:true}).then((response)=>{
                        // console.log(response)
                    }
                )
            }
        },
        //保存收藏的状态
        getBookmark() {
            if (this.$store.state.usermsg.username == "尚未登陆") {
                // console.log('先登录再说吧')
            } else {
                // console.log('getBookmark');
                
                this.$http.post(
                    this.HOST + 'api/user/getDetail/' + this.$route.params.ids,
                    {
                        userId: this.$store.state.usermsg.userId
                    },
                    { emulateJSON: true }).then((response) => {
                        this.bookmark = response.data;
                    }
                )
            }
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
                    bookSrc: this.MyUrl
                }, { emulateJSON: true }).then((response) => {
                    // console.log('Myid', this.$store.state.usermsg.userId)
                    this.isLove = !this.isLove;
                    this.position = position
                    this.showPositionValue = true;
                    this.getBookmark();
                })
            }

        },
        //弹幕
        barrageButton() {
            let barrage = '';
            var str = $('#barrageID').val();
            console.log(str);
            
            if ($('#barrageID').val() != '') {
                console.log('弹幕内容：' + $('#barrageID').val());
                //关键字屏蔽
                var res = str.replace(new RegExp(this.getJSONArry.join('|'),'img'),'*');
                console.log(res);
                
                barrage = '<ul id="ba" class="'+this.resi+'">' + res + '</ul>';
                this.$store.state.bookName.push({
                    barr:$('#barrageID').val()
                })
                $('#barrageID').val('');
                $('#danmu').append(barrage);                

            }
        },
        barrageSwitch () {
            let barrage = '';
            for (let i = 0; i < this.$store.state.bookName.length; i++) {
                //关键字屏蔽
                barrage = this.$store.state.bookName[i].barr
                if (barrage.indexOf(this.barrageStr) >= 0 && this.barrageStr!='') {       
                    console.log(barrage.indexOf(this.barrageStr));
                                 
                }else{
                    barrage = '<ul class="'+this.resi+'">' + this.$store.state.bookName[i].barr + '</ul>';
                    $('#danmu').append(barrage);      
                }
            }
            if (this.valueSwitch) {
                console.log('remove');
                
                $('#danmu ul').remove()
            }
            this.valueSwitch = !this.valueSwitch;
            console.log('ts');
            
            $('#danmu').removeClass('danmu');
            console.log($('#danmu ul')[0].style.marginLeft)
            this.barrageTime();            
        },
        barrageTime() {
            if (this.valueSwitch) {
                setTimeout(()=>{
                    //添加class样式以及计时器
                    this.barrageTime();
                    $('#danmu ul').css('margin-left','-=1.5%')
                },100)
            }else {
                console.log('clear');
                $('#danmu').addClass('danmu');  
                $('#danmu ul').css('margin-left','100%')
            };
            // for (let i = 0; i < $('#danmu ul').length; i++) {
            //     if ($('#danmu ul')[i].css('margin-left')<'-50%') {
            //         $('#danmu ul')[i].addClass('danmu');
            //         console.log('TZ');
                    
            //     }
            // }
        },
        //关键字屏蔽
        barrageButton2() {
            this.barrageStr = $('#barrageID2').val()
            console.log(this.barrageStr);
            $('#barrageID2').val('');
            let barrage = '';
            $('#danmu ul').remove()
            for (let i = 0; i < this.$store.state.bookName.length; i++) {
               //关键字屏蔽
                barrage = this.$store.state.bookName[i].barr
                if (barrage.indexOf(this.barrageStr) >= 0 && this.barrageStr!='') {       
                    console.log(barrage.indexOf(this.barrageStr));
                                 
                }else{
                    barrage = '<ul class="'+this.resi+'">' + this.$store.state.bookName[i].barr + '</ul>';
                    $('#danmu').append(barrage);      
                }
            }
        }

    },

    watch: {
        scrollTop(newVal) {
            this.progressData = newVal/ this.scrollHeight;
        },
        progressVal(newVal){
            document.documentElement.scrollTop? 
            document.documentElement.scrollTop = newVal :
            document.body.scrollTop = newVal
        },
        chaptersParam(newVal){
            let chapter = this.$route.params.chapter;
            let ids = this.$route.params.ids;
            // console.log("ids",ids);
            // console.log("chapter",chapter)
            this.getBook(ids,chapter)
            document.documentElement.scrollTop = 10;
            window.addEventListener('scroll', this.handleScroll);

            this.getBookList(ids,chapter);
            this.isShowBar = false;
            //this.CheckLogin();
        }
    },
    mounted() {
        //自己加
        let chapter = this.$route.params.chapter;
        let ids = this.$route.params.ids;
        let userId = this.$store.state.usermsg.userId;
        // console.log("ids",ids);
        // console.log("chapter",chapter)
        this.getBook(ids,chapter)
        // if(this.bookmark){
            document.body.scrollTop = 2000
        // }
        window.addEventListener('scroll', this.handleScroll);

        this.CheckLogin();
        this.getBookList(ids,chapter);
        this.getBookmark();
        //this.SaveLook(ids,chapter)
        this.bookName = ids;
        //关键字屏蔽词库
        this.getJSONArry = myData;
    },
    //组件销毁时
    destroyed() {
        this.WatchList = false;
        
    },
}

</script>

<style lang='less'>
@import url("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.css");

a.vux-popup-mask.vux-popup-show{
        opacity: 0;
    }
.reader-view{
    height: 100%;
    margin-top: 30px;
    .reader-footer{
        padding: 8px 0 20px;
        text-align: center;
        color: @secondaryTextColor;
        font-size: 16px;
        z-index: 200;
        width: 100%;
    }
}

.content-wrap{
    padding: 4px 16px;
    .content-paragraph{
        line-height: 2em;
        text-indent: 2em;
    }
    .content-title{
        font-weight: bold;
        line-height: 3em;
    }
}
.touch-wrap{
    height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 100;
    .touch{
        width: 100%;
    }
    .touch-top,.touch-bottom{
        z-index: 100;
        height: 25%;
    }
    .touch-middle{
        z-index: 100;
        height: 50%;
    }
}

.page-reader{
    .reader-header{
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        span{
            font-size: 14px;
            color: @secondaryTextColor;
            line-height: 35px;
        }
    }

    .btn-collect{
        color: #09bb07;
    }

    .color-checker{
        width: 36px;
        height: 36px;
        border-radius: 18px;
        margin: 0 10px;
        border: 1px solid @dividerColor;
    }
    .color-checker-selected{
        border: 1px solid @primaryColor;
    }    
}

#danmu {
    width: 100%;
    height: 100%;
    overflow:hidden;
    position: absolute;
}
.danmu {
    display: none;
}
#danmu ul {
    width: 40%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    margin-top: 20px;
    margin-left: 100%;
    padding: 4px 10px 4px 10px;
    border: #09bb07 1px solid;
    color: #09bb07;
    // background: #ffffff90;
    background: #ffffff95;
    border-radius: 20px;

}
.Barrage {
    float: left;
    height: 25px;
    width: 65%;
    margin-top: 5px;
    margin-left: 5%;

}
.barrageButton {
    border: none;
    width:50px;
    height: 25px;
    background:transparent;
    color: #09bb07;
    border: 1px solid #09bb07;
    float: left;
    margin-top: 5px;
    margin-left: 8px;
    border-radius: 5px;
}
#barrageSwitch {
    margin-top: 10px;
    float: right;
    margin-right: 8px;
}
#barrageSwitch, #barrageSwitch:before {
    height: 15px;
    width: 33px;
}
#barrageSwitch:after {
    height: 13px;
    width: 13px;
}
</style>