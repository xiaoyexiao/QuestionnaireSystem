<template>
<div class="container">
  <div class="header w"></div>
  <div class="w">
    <div class="content">
      <div class="content-header">
        <h4 class="title">程序设计与算法综合实习</h4>
        <span class="description">这里是描述内容...</span>
      </div>
      <div class="content-main">
        <ul>
          <li v-for="(item,index) in List">
            <div v-if="item.style===1">
              <span v-show="item.must" style="color: red">*</span>
              <h4>{{index+1}}. {{item.question}}</h4>
              <el-radio v-for="option in item.options" :key="option.value" v-model="item.value" :label="option.label">{{ option.value }}</el-radio>
            </div>
            <div v-else-if="item.style===2">
              <span v-show="item.must" style="color: red">*</span>
              <h4>{{index+1}}. {{item.question}}</h4>
              <span>[多选题]</span>
              <el-checkbox-group v-model="item.checkList">
                <el-checkbox v-for="option in item.options" :key="option" :label="option.value"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div v-else>
              <span v-show="item.must" style="color: red">*</span>
              <h4>{{index+1}}. {{item.question}}</h4>
              <el-input v-model="item.answer" placeholder="请输入内容"></el-input>
            </div>
          </li>
        </ul>
        <div class="submit">
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </div>
        <div class="footer"></div>
      </div>
    </div>
  </div>
  <div class="progress">
    <el-progress type="circle" :percentage="13"></el-progress>
    <span>进度条</span>
  </div>
  <div class="footer"></div>
</div>
</template>

<script>
export default {
  name: "QuestionnaireFilling",
  data(){
    return{
      List:[
        {
          style:1,
          question:'题目1',
          must:true, //必选
          options:[
            {
              value:'选项1',
              label:'1'
            },
            {
              value:'选项2',
              label:'2'
            },
            {
              value:'选项3',
              label:'3'
            }
          ],
          value:'1'
        },
        {
          style:2,
          question:'题目2',
          must:true, //必选
          options:[
            {
              value:'选项4',
              label:'1'
            },
            {
              value:'选项5',
              label:'2'
            },
            {
              value:'选项6',
              label:'3'
            }
          ],
          checkList: []
        },
        {
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
        {
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
        {
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
        {
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
      ]
    }
  },
  methods:{
    onSubmit(){
      if(window.location.href.indexOf('questionnaireCheck')!=-1){
        this.$message({
          message: '提示：问卷预览页面，只能预览，不能提交！',
          type: 'warning'
        });
      }
      else{
        this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
      }
    }
  }
}
</script>

<style scoped>
.container{
  text-align: center;
  font-weight: normal;
  background-color: rgba(234,242,247, 0.95);
  margin: 0;
  padding: 0;
  color: #6a6a6a;
  font-size: 12px;
}
.w{
  margin: 0 auto;
  width: 920px;
}
.header{
  height: 120px;
  background-image: url("../assets/img/headerImg.png");
}
.content{
  background-color: white;
  padding: 0 70px 0;
  border-radius: 10px;
}
.content-header{
  height: 120px;
  padding: 40px 2% 30px;
  text-align: center;
  width: 96%;
}
.title{
  font-size: 24px !important;
  font-weight: bold;
  vertical-align: middle;
  margin: 0;
  padding: 15px 0;
  line-height: 30px;
  color: #0095ff;
}
.description{
  display: block;
  color: #555555;
  line-height: 24px;
  text-align: left;
  font-size: 16px;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ccc;
  margin-left: 0;
  margin-top: 20px;
}
.content-main{
  padding: 0px 30px 40px;
  text-align: left;
  font-size: 16px;
}
.content-main ul li{
  margin-bottom: 50px;
}
.content-main ul li >>>.el-radio__label{
  font-size: 16px;
}
.content-main ul li >>>.el-checkbox__label{
  font-size: 16px;
}
.content-main h4{
  display: inline-block;
}
.content-main .el-checkbox,.content-main .el-radio,.content-main .el-input{
  display: block;
  margin-top: 10px;
}
.content-main .submit{
  height: 40px;
}
.submit .el-button{
  display: block;
  text-align: center;
  margin: 0 auto;
}
.progress{
  position: fixed;
  left: 50%;
  top: 350px;
  width: 150px;
  height: 150px;
  margin-left: 453px;
}
.progress span{
  position: absolute;
  display: block;
  top: 131px;
  right: 55px;
}
.footer{
  height: 50px;
}
</style>
