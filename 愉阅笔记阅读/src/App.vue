<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  name: 'app'
}
</script>
<script src="./js/jquery.min.js"></script>
<style lang="less">
@import '~vux/src/styles/reset.less';
@import url('styles/theme.less');

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app{
  height: 100%;
}
body, .page {
  background-color: #fbf9fe;
  font-family: '微软雅黑';
}
.page.page-hasFooter{
  margin-bottom: 50px;
}
.page.page-hasHeader{
  margin-top: 50px;
}
</style>
