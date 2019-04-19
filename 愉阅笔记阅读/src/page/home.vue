<!--  -->
<template>
    <div class="page page-home page-hasFooter">
        <div class="scopll">
            <swiper :aspect-ratio="300/800"
                    auto loop
                    >
                <swiper-item class="swiper-item"
                    v-for="(demo,index) in demo_index"
                    :key="index">
                    <img :src="demo.img" alt="">
                </swiper-item>
            </swiper>

            <search v-model="searchValue" @on-submit="getSearchResult"></search>

            <panel-group class="panelTitle" title="人气新品">
                    <x-panel :data=panels[index] v-for="(panel,index) in panels" :key="index"></x-panel>
            </panel-group>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperItem } from 'vux'
export default {
    components: {
        Swiper,
        SwiperItem
    },
    data () {
        return {
            demo_index:[{
                img: 'http://qidian.qpic.cn/qidian_common/349573/5a7e3288380e6a2d5ae802cb32edd672/0'
            },{
                img: 'http://qidian.qpic.cn/qidian_common/349573/1e51ff7fa4f6e619cfdd9363a1d2da4e/0'
            },{
                img: 'http://qidian.qpic.cn/qidian_common/349573/0250c118e173f825992ecae9dadc7c21/0'
            },{
                img: 'http://qidian.qpic.cn/qidian_common/349573/6c5d1be0f41ab5adf60e49671577e930/0'
            }],
            panels:[],
            searchValue: '',
        };
    },

    computed: {},

    methods: {
        getBook(){
            let articletitle = this.article_title;
            let articlecontent = this.article_content;
            let articleimg = this.article_img;
            this.$http.get(this.HOST+'api/user/getArticle',{
            },{emulateJSON:true}).then((response)=>{
                
                for(var i=0;i<response.body.length;i++){
                    this.panels.push(
                        {
                            title:response.body[i].bookName,
                            cover: 'http://localhost:3000' + response.body[i].bookSrc,
                            desc:response.body[i].intro,
                            author:response.body[i].author,
                            type:response.body[i].bookType,
                            isEnd:response.body[i].continues == 'end'? '已完结':'未完结',
                            wordCount:response.body[i].wordCount,
                            //url:'/reader/'+response.body[i]._id+'/1'
                            url:'/operation/'+response.body[i]._id
                        }
                    )
                }
                
            })
        },
        getSearchResult() {
            this.$router.push('/search/'+this.searchValue)
        }
    },
    mounted:function(){
        this.getBook();
    }
}

</script>

<style lang='less' scoped>
.swiper-item{
    background: #000;
}
.swiper-img{
    width: 100vw;
    position: absolute;
    top: -150%;
    left: 0;
}
h2{
    color: #fff;
    text-align: center;
    line-height: 10vw;
}
img {
    width: 100vw;
    height: 100%;
    max-width: 100vw;
}
.panelGroup {
    padding-top: 0.5vw;
    padding-bottom: 0.5vw;
    font-size: 4vw;
}
.panelTitle /deep/ .xpanel-desc {
    display: none;
}
.scopll {
    height: 130vh;
}
</style>