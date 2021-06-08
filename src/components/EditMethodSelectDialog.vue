<template>
<div class="container">
  <span class="title">请选择修改问卷模式</span>
  <div class="selectBox w">
    <ul>
      <li>
        <a href="#" class="selectOption fl" :class="[{'defaultClass':this.method===1}]" @click="method=1">
          <i class="el-icon-delete i" :class="[{'defaultColor':this.method===1}]"></i>
          <span class="s1">删除所有答卷</span>
          <span class="s2">修改不受限制</span>
        </a>
      </li>
      <li>
        <a href="#" class="selectOption fr" :class="[{'defaultClass':this.method===2}]" @click="method=2">
          <i class="el-icon-document-copy i" :class="[{'defaultColor':this.method===2}]"></i>
          <span class="s1">复制此问卷并去编辑</span>
          <span class="s2">原始问卷不受任何影响</span>
        </a>
      </li>
    </ul>
  </div>
  <div class="w descriptionBox">
    <span v-if="method===1">1.删除内容： 1份有效答卷
      <br>
      2.答卷删除后不可恢复，请谨慎选择。建议您先将已回收的答卷下载到本地
      <a href="#" style="color: dodgerblue">下载答卷</a>
    </span>
    <span v-else>复制一份题目完全一致的新问卷，对复制的问卷进行编辑，不会影响到原始问卷的题目及回收数据</span>
  </div>
  <el-button type="primary" style="margin-top: 40px" @click="nextPage">下一步</el-button>
</div>
</template>

<script>
export default {
  name: "EditMethodSelectDialog",
  data(){
    return{
      method: 1,
    }
  },
  methods:{
    nextPage(){
      if(this.method===1){

      }
      else{

      }
    }
  }
}
</script>

<style scoped>
.w{
  width: 100%;
  margin: 0 auto;
}
.container{
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: white;
}
.title{
  display: block;
  margin-top: 15px;
  font-size: 18px;
  font-weight: bold;
  color: black;
}
.selectBox{
  height: 90px;
  margin: 44px 0 26px;
}
.descriptionBox{
  text-align: left;
  width: 638px;
  height: 44px;
  padding: 16px 54px;
  background-color: #F7F7F7;
}
.selectOption{
  position: relative;
  vertical-align: middle;
  text-decoration: none;
  width: 132px;
  height: 42px;
  padding: 24px 20px 24px 84px;
  margin: 0 60px;
  background-color: white;
  border: 1px solid #E8E8E8;
  border-radius: 4px;
  text-align: left;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.s1{
  display: block;
  color: black;
  font-weight: bold;
}
.s2{
  display: block;
  color: #8C8C8C;
  font-size: 12px;
}
.i{
  position: absolute;
  font-size: 40px;
  left: 30px;
  color: #8C8C8C;
}
.selectOption:hover,.selectOption:focus{
  border: 1px solid #0095FF;
  box-shadow: 0 0 0 1px #0095ff inset;
}
.selectOption:hover i,.selectOption:focus i{
  color: #0095ff;
}
.defaultClass{
  border: 1px solid #0095FF;
  box-shadow: 0 0 0 1px #0095ff inset;
}
.defaultColor{
  color: #0095ff;
}
</style>
