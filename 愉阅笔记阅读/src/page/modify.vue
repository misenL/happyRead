<!--  -->
<template>
    <div id="modiCenter">
        <div id="modiBo">
            <router-link to="/index/personal">
                <x-icon type="ios-arrow-left" style="margin-top: 12px" size="20"></x-icon>
            </router-link>
            <span>个人资料设置</span>
        </div>
        <!-- 头像 -->
        
        <div id="modiImg">
            <popover placement="bottom" @on-show="myShow">
                <panel :list="modifyList" @click.native="upFile"></panel>
            </popover>
            <input type="file" accept="image/*" class="upImg" @change="handleFile">
        </div>

        <group v-for="(group, index) in options"
               :key="index"
               :gutter="12">
            <cell v-for="option in group"
                  :key="option.title"
                  :title="option.title"
                  :link="option.link">
                  <x-icon type="ios-arrow-right" size="15"></x-icon>
            </cell>
        </group>


    </div>
</template>


<script>

import { Popover } from 'vux'

export default {
    components: {
        Popover
    },
    data() {
        return {
            modifyList: [
                {
                    src: 'http://www.qqzhi.com/uploadpic/2014-05-14/051120936.jpg',
                    url: ''
                }
            ],

            options: [
                [{
                title: "昵称："+" "+this.$store.state.usermsg.username,
                icon: "",
                link: "",
            },{
                title: "邮箱："+" ",
                icon: "",
                link: "",
            },{
                title: "手机："+" ",
                icon: "",
                link: "",
            },{
                title: "签名",
                icon: "",
                link: "",
            }]]

        }
    },

    computed: {},

    methods: {
        upFile() {
            this.$el.querySelector('.upImg').click()
        },
        handleFile:function (e) {
            let $target = e.target || e.srcElement
            let file = $target.files[0]
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.modifyList[0].src = res.result
            }
            reader.readAsDataURL(file)
        },
        myShow() {

        }
    }
}
</script>

<style lang="less">
#modiBo {
    background-color: #ffffff;
    height: 50px;
    border-bottom: 0.1px solid darkgray;
}
#modiBo span {
    position: absolute;
    margin-top: 10px;
    margin-left: 5px;
    font-family: '黑体';
}
#modiCenter {
    font-family: '黑体';
}
#modiImg {
    background-color:#ffffff;
    margin: 0px 20% 0 36%;
}
.upImg {
    position:absolute;
    display: none;
}
.weui-panel__bd {
    background-color: #fbf9fe;
}
.weui-media-box__hd img{
    border-radius: 30px;
}
.popover-demo-content {
    font-family: '黑体';
}
</style>
