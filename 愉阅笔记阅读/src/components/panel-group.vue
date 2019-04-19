<!--  -->
<template>
    <div class="panelGroup">
        <div class="panelGroup-topbar">
            <span class="panelGroup-title">
                {{title}}
            </span>
        </div>
        <slot></slot>
    </div>
</template>


<script>
export default {
    data () {
        return {
        };
    },

    props:{
        title: ''
    },

    computed: {},

    methods: {}
}

</script>

<style lang='less'>
.panelGroup{
    background: #fff;
    padding-top: 8px;
    margin-bottom: 20px;
    box-shadow: @shadow;
}
.panelGroup .panelGroup-topbar{
    margin: 8px 10px 8px 10px;
    padding-left: 8px;
    line-height: 1.4em;
    border-left: 3px solid @primaryColor;
}

// .panelGroup .xpanel::after{
//     content: '';
//     margin: 0 auto;
//     display: block;
//     height: 1px;
//     width: 90%;
//     background: #e2e2e2;
// }
.panelGroup .xpanel:last-child::after{
    display: none;
}
</style>