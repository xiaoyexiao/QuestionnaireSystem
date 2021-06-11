<template>
<div class="container">
  <div class="header w"></div>
  <div class="w">
    <div class="content" ref="container">
      <div class="content-header">
        <h4 class="title">{{questionnaire.title}}</h4>
        <span class="description">{{questionnaire .description}}</span>
      </div>
      <div class="content-main">
        <ul>
          <li v-for="(item,index) in List">
            <div v-if="item.style===1">
              <span v-show="item.must" style="color: red">*</span>
              <h4>{{index+1}}. {{item.question}}</h4>
              <el-radio v-for="option in item.options" :key="option.value" v-model="item.answer" :label="option.label">{{ option.value }}</el-radio>
            </div>
            <div v-else-if="item.style===2">
              <span v-show="item.must" style="color: red">*</span>
              <h4>{{index+1}}. {{item.question}}</h4>
              <span>[多选题]</span>
              <el-checkbox-group v-model="item.answer">
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
  <div class="background" :style="backgroundStyle"></div>
  <div class="footer"></div>
</div>
</template>

<script>
import util from '../assets/js/DataManipulation'
export default {
  name: "QuestionnaireFilling",
  data(){
    return{
      backgroundStyle:{
        width: '100%',
        height: '50px'
      },
      questionnaire: {
        title:'',
        description:''
      },
      List: []
    }
  },
  methods:{
    onSubmit(){
      if(window.location.href.indexOf('questionnaireCheck')!==-1){
        this.$message({
          message: '提示：问卷预览页面，只能预览，不能提交！',
          type: 'warning'
        });
      }
      else{
        let list= {},i
        for(i=0;i<this.List.length;i++){
          list[i]={
            questionNumber: i+1,
            answer: this.List[i].answer
          }
        }
        this.$axios.get('http://localhost:8080/answersheet/submitAnswerSheet', {
        // 提交问卷
          params: {
            AnswerJsonObject: JSON.stringify(list),
            id: this.$store.state.questionnaireId,
            answerNum: i
          }
        }).then(()=>{
          this.$router.push('/')
          this.$message({
            message: '问卷提交成功',
            type: 'success'
          });
        })
      }
    }
  },
  mounted() {
    this.$axios.get('http://localhost:8080/questionnaire/getQuestionnaireIdByUrl', {
      params: {
        url: window.location.href
      }
    }).then(res1=>{
      if(res1.data===-1){
        // url错误
        this.$router.push('/notFound')
      }
      else{
        this.$store.commit("setQuestionnaireId",res1.data)
        this.$axios.get('http://localhost:8080/q-option/getQuestionnaireData', {
          params: {
            id: res1.data
          }
        }).then(res2=>{
          this.questionnaire=res2.data.questionnaire
          this.List=util.questionnaireToList(res2.data)
        })
      }
    })
  },
  created() {
    this.$nextTick(function (){
      if(this.$refs.container.clientHeight<(screen.height-300))
        this.backgroundStyle.height=`${screen.height-this.$refs.container.clientHeight-300}px`
      else
        this.backgroundStyle.height='0'
    })
  },
  updated() {
    if(this.$refs.container.clientHeight<(screen.height-300))
      this.backgroundStyle.height=`${screen.height-this.$refs.container.clientHeight-300}px`
    else
      this.backgroundStyle.height='0'
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
  height: 100px;
}
</style>
