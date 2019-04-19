<template>
    <div class="page page-class">
        <div style="height:44px;">
        <sticky
            ref="sticky"
            :offset="46"
            :check-sticky-support="false">
            <tab :line-width="1">
                <tab-item selected @click.native="demo = 'xuanhuan',getClassBook()">玄幻</tab-item>
                <tab-item @click.native="demo='lingyi',getClassBook()">灵异</tab-item>
                <tab-item @click.native="demo='dushi',getClassBook()">都市</tab-item>
                <tab-item @click.native="demo='zhichang',getClassBook()">职场</tab-item>
                <tab-item @click.native="demo='tongren',getClassBook()">同人</tab-item>
                <tab-item @click.native="demo='chunai',getClassBook()">纯爱</tab-item>
            </tab>
        </sticky>

        </div>
        <div>
            <x-panel
             :data=classPanels[index]
             v-for="(panel,index) in classPanels"
             :key="index"  id="classPanel">
            </x-panel>
        </div>
    </div>
</template>

<script>
import { Tab, TabItem, Sticky } from 'vux'
export default {
    name: 'class',
    components: {
        Tab,
        TabItem,
        Sticky
    },
    data () {
        return {
            classPanels: [],
            demo: 'xuanhuan'
        };
    },

    computed: {},

    methods: {
        getClassBook(){
            // let articletitle = this.article_title;
            // let articlecontent = this.article_content;
            // let articleimg = this.article_img;
            // let articleclass = this.article_class;
            // console.log(this.article_class)
          
            this.$http.get(this.HOST+'api/user/getArticle',{
            },{emulateJSON:true}).then((response)=>{
                // 每次清空数组
                this.classPanels.splice(0,this.classPanels.length)
                
                for(var i=0;i<response.body.length;i++){

                    if (response.body[i].bookType==this.$data.demo) {
                        // alert(response.body[i].title+'1')
                        //!!!
                        this.classPanels.push(
                        {
                            title:response.body[i].bookName,
                            cover:'http://localhost:3000'+response.body[i].bookSrc,
                            desc:response.body[i].intro,
                            author:response.body[i].author,
                            class:response.body[i].bookType,
                            url:'/reader/'+response.body[i]._id+'/1'
                        })
                        console.log(this.classPanels)
                    }
                }
            })
        },
    },

    mounted: function() {
        this.getClassBook();
    }
}

</script>

<style lang='less' scoped>
#classPanel {
    width: 100%;
    height: 35vw;
    border-bottom: 1px solid #e2e2e2;
}
// #classPanel:nth-last-of-type(even) {
//     border-right: 1px solid #e2e2e2;
// }
.xpanel .xpanel-inner {
    background-color: blue;
    width: 73px;
    height: 100px;
}
#classPanel /deep/ .xpanel-cover {
    width: 32vw;
    float: left;
}
#classPanel /deep/ .xpanel-text {
    float: left;
    margin-left: 0;
}
// #classPanel /deep/ .xpanel-status {
//     height: 50px;
// }
img {
    background-color: blue;
    width: 100px;
    height: 135px;
}
</style>