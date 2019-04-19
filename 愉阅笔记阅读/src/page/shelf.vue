<!--  -->
<template>
    <div class="page page-shelf">
        <search v-model="searchValue">
        </search>
        <group-title>我的书架</group-title>
        <grid :cols="3" :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item 
                :link="`/reader/${msg._id}/${shelf[index].bookChapter}`" 
                :label="msg.bookName" 
                v-for="(msg,index) in msgsVal" :key="index">
                <!-- <div style=""></div> -->
                <img slot="icon" :src="'http://localhost:3000'+msg.bookSrc">
            </grid-item>
        </grid>
    </div>
</template>

<script>
    import { Grid, GridItem, GroupTitle } from 'vux'
    export default {
        data() {
            return {
                psgtitle: [],
                msgs: [],
                shelf: [],
                searchValue: ''
            };
        },
        components: {
            Grid,
            GridItem,
            GroupTitle
        },
        computed: {
            msgsVal() {
                let reg = new RegExp(this.searchValue);
                return this.msgs.filter(elem => reg.test(elem.psgtitle));
            }
        },

        methods: {
            getShelf(userId, ids) {
                let articletitle = this.article_title;
                let articlecontent = this.article_content;
                let articleimg = this.article_img;
                if (this.$store.state.usermsg.userId == '') {
                    console.log('请登陆啊')
                } else {
                    this.$http.post(this.HOST + 'api/user/getCollection', {
                        userId: this.$store.state.usermsg.userId
                    }, { emulateJSON: true }).then((response) => {
                        // console.log(response.data);
                        this.msgs = response.data.books;
                        this.shelf = response.data.shelf;
                    })
                }

            },

        },
        mounted: function () {
            let userId = this.$store.state.usermsg.userId;
            this.getShelf(userId);
        }
    }
    

</script>

<style lang='less'>
    @size: 0.7;
    .grid-center {
        display: block;
        text-align: center;
        color: #666;
    }

    .weui-grids {
        background-color: rgb(253, 253, 253);
    }

    .page-shelf .weui-grid__icon {
        width: 100px*@size;
        height: 135px*@size;
        box-shadow: 1px 1px 1px rgb(170, 170, 170);
    }

    .btn-return {
        color: #09bb07;
        line-height: 30px;
        margin: 0 10px 0 0;
    }
</style>