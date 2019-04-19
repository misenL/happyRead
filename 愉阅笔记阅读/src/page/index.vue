<!--  -->
<template>
    <div class="page page-index">
        <router-view></router-view>
        <tabbar class="wrap-tabbar">
            <tabbar-item 
                    v-for="item in tabbarData" 
                    :key="item.link"
                    :link="item.link"
                    :selected="$route.name==item.link"
                    >
                <o-icon slot="icon" :name="item.icon" :size="25"></o-icon>
                <span slot="label">{{item.label}}</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>


<script>
import { Tabbar, TabbarItem, Swiper } from 'vux'
export default {
    components: {
        Tabbar,
        TabbarItem,
        Swiper
    },
    
    data () {
        return {
            tabbarData: [
                {
                    icon: "home",
                    label: "首页",
                    link: "home"
                },
                {
                    icon: "th-large",
                    label: "分类",
                    link: "class"
                },
                {
                    icon: "list-ul",
                    label: "书架",
                    link: "shelf"
                },
                {
                    icon: "user",
                    label: "我的",
                    link: "personal"
                }
            ]
        };
    },

    computed: {},

    methods: {
        routerPath() {
            alert(132);
        }
    }
}

</script>

<style lang='less' scoped>
.page-index .wrap-tabbar{
    background: #FFFFFF;
    position: fixed;
}
</style>