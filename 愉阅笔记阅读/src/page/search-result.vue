<!--  -->
<template>
    <div class="page page-home page-hasFooter">
        <search 
            v-model="searchValue" 
            @on-submit="getSearchResult(searchValue)"
            @on-focus="isFocus = true"
            @on-cancel="isFocus = false"
            @on-blur="isFocus = false">
            <span name="arrow-left" slot="left" class="btn-return" @click="handleReturn">返回</span>
        </search>
        <panel-group :style="{marginTop: isFocus? '45px' : '0px'}">
            <x-panel :data=panels[index] v-for="(panel,index) in panels" :key="index"></x-panel>
        </panel-group>
    </div>
</template>

<script>
    import { Swiper, SwiperItem } from 'vux'
    export default {
        components: {
            Swiper,
            SwiperItem
        },
        data() {
            return {
                panels: [],
                searchValue: '',
                isFocus: false
            };
        },

        computed: {
            
            
        },

        methods: {
            getSearchResult(value) {
                this.$http.get(this.HOST + 'api/user/search/'+value, {
                }, { emulateJSON: true }).then((response) => {
                    this.panels = [];
                    for (var i = 0; i < response.body.length; i++) {
                        this.panels.push(
                            {
                                title: response.body[i].bookName,
                                cover: 'http://localhost:3000' + response.body[i].bookSrc,
                                author: response.body[i].author,
                                type: response.body[i].bookType,
                                isEnd: response.body[i].continues ? '已完结' : '未完结',
                                wordCount: response.body[i].wordCount,
                                //url:'/reader/'+response.body[i]._id+'/1'
                                url: '/operation/' + response.body[i]._id
                            }
                        )
                    }
                })
            },
            handleReturn(){
                this.$router.go(-1);
            }
        },
        mounted: function () {
            this.getSearchResult(this.$route.params.value)
        }
    }

</script>

<style lang='less' scoped>

    .btn-return{
        color: #09bb07;
        line-height: 30px;
        margin: 0 10px 0 0;
    }
</style>