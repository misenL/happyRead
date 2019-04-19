<!--  -->
<template>
    <div id="personalCenter" class="page page-personal">
        <group :gutter="8">
            <panel :list="panelList">
            </panel>
        </group>
        
        
        <group v-for="(group, index) in options"
               :key="index"
               :gutter="12">
            <cell v-for="option in group"
                  :key="option.title"
                  :title="option.title"
                  :link="option.link"
                  class="optionCell">
                  <o-icon :name="option.icon"
                          class="optionCell-icon"
                          slot="icon"></o-icon>
            </cell>
        </group>
    </div>
</template>

<script>
export default {
    data () {
        return {
            pageTitle: "我的",
            panelList: [
                {
                    src: 'http://www.qqzhi.com/uploadpic/2015-04-27/211157972.jpg',
                    title: this.$store.state.usermsg.username,
                    desc: '',
                    url: '/index/login'
                }
            ],
            options: [
                [
                    {
                        title: "已购",
                        icon: "",
                        link: ""
                    },
                    {
                        title: "书城",
                        icon: "",
                        link: ""
                    }
                ],
                [
                    {
                        title: "笔记",
                        icon: "",
                        link: ""
                    },
                    {
                        title: "收藏",
                        icon: "",
                        link: ""
                    },
                    {
                        title: "书单",
                        icon: "",
                        link: ""
                    },{
                        title: "登陆",
                        icon: "",
                        link: "/index/login"
                    },{
                        title: "注册",
                        icon: "",
                        link: "/index/reg"
                    }
                ],
            ]
        };
    },

    computed: {},

    methods: {
        isLogin(){
            if(this.panelList[0].title === "尚未登陆"){
                this.panelList[0].desc='';
                this.panelList[0].url="/index/login"
            }else{
                this.panelList[0].desc="点击编辑个人信息";
                this.panelList[0].url="/index/modify"
            }
            console.log(this.panelList[0])
        }
    },
    mounted:function(){
      this.isLogin();
    }
}

</script>
<style lang='less'>
#personalCenter {
    font-family: '仿宋';
    font-weight: 600;
}
.weui-media-box__hd img{
    border-radius: 30px;
}
.optionCell {
    cursor: pointer;
}
.optionCell-icon{
    display: block;
    margin-right: 10px;
}
</style>