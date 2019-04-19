<!--  -->
<template>
    <div class="xpanel" @click="handleClick">
        <div class="xpanel-inner">
            <div class="xpanel-cover">
                <img :src="data.cover" alt="">
            </div>
            <div class="xpanel-text">
                <h3 class="xpanel-title">
                    {{data.title}}
                </h3>
                <div class="xpanel-info">
                    <span class="xpanel-author">
                        {{data.author}}
                    </span>
                    <div class="xpanel-status">
                        <span class="type" v-if="data.type">
                            {{typeName[data.type]}}</span>
                        <span class="isEnd" v-if="data.isEnd !== undefined">
                            {{data.isEnd}}</span>
                        <span class="wordCount" v-if="data.wordCount">
                            {{wordCountAbbr}}字</span>
                    </div>
                </div>
                <div class="xpanel-desc">
                    {{data.desc}}
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            typeName: {
                xuanhuan: '玄幻',
                chunai: '纯爱',
                zhichang: '职场',
                lingyi: '灵异',
                tongren: '同人'
            }
        };
    },

    props:{
        data: Object,
        size: String
    },

    computed: {
        wordCountAbbr(){
            let count = this.data.wordCount;
            if(count <= 999){
                return count;
            }
            else if (count > 999 && count < 9999) {
                count = Math.round((count /1000) * 10) / 10;
                return count + '坃';                
            } else if (count > 9999){
                count = Math.round((count /10000) * 10) / 10;
                return count + '万';
            } else {
                return null;
            }
        }
    },

    methods: {
        handleClick(){
            this.$router.push(this.data.url);
        }
    }
}

</script>

<style lang='less'>
.xpanel {
    width: 50%;
    float: left;

}
/*分隔线样式*/
.xpanel:nth-of-type(even) {
    border-right:1px solid #e2e2e2;
}       /*:end*/

.xpanel-inner .xpanel-cover img{
    display: block;
    // width: 80px;
    height: 30vw;
    box-shadow: @shadow;
    margin: 2vw 0 0 5vw;
}

.xpanel-inner .xpanel-text{
    display: inline-block;
    width: 40vw;
    margin-left: 8%;
}
.xpanel-text .xpanel-title{
    padding-top: 6px;
    font-weight: bold;
    font-size: 4vw;
    display: -webkit-box;    
    -webkit-line-clamp: 1; 
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.xpanel-text .xpanel-info{
    line-height: 18px;
    margin: 3px 6px 5px 0;
    // display: flex;
    // justify-content: space-between;
}
.xpanel-text .xpanel-author{
    color: #999;
    font-size: 3vw;    
}
.xpanel-text .xpanel-status {
    width: 45vw;
    margin: 5px 0px 0 0;
}
.xpanel-text .xpanel-status span{
    color: #ffac3e;
    font-size: 3vw;
    line-height: 18px;
    border: 1px solid #ffac3e;
    padding: 0 3px;
}
.xpanel-text .xpanel-status .type{
    color: #1c9dda;
    border: 1px solid #1c9dda;  
}
.xpanel-text .xpanel-status .wordCount{
    color: #999;
    border: 1px solid #999;    
}
.xpanel-inner {
    border-bottom: 1px solid #e2e2e2;
    background-color: transparent;
}
</style>
