<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>

html,body{
  height:100%;
  width:100%;
  font: 12px/1.5 "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Microsoft YaHei","Microsoft YaHei UI","微软雅黑", sans-serif;
}
#app{
  width: 100%;
  height: 100%;
  margin: 0;
}
*{
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
