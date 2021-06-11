<template>
<div class="container">
  <div class="head">
    <div class="w">
      <div class="submitButton" @click="onSubmit">
        <i class="el-icon-check"></i>
        <span>完成编辑</span>
      </div>
    </div>
  </div>
  <div class="header w"></div>
  <div class="w">
    <div class="content" ref="container">
      <div class="content-header">
        <span>{{ headTitle }}</span>
      </div>
      <div class="content-main">
        <div class="main-header">
          <el-form ref="form" :model="questionnaire" label-width="80px">
            <el-form-item label="标题" class="l1">
              <el-input v-model="questionnaire.title"></el-input>
            </el-form-item>
            <el-form-item label="问卷描述" class="l2">
              <el-input type="textarea" :rows="2" placeholder="请输入问卷描述内容" v-model="questionnaire.description">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="questions">
          <ul>
            <li class="" v-for="(item,index) in List">
              <div v-if="item.style===1">
                <div class="question-content">
                  <span v-show="item.must" style="color: red">*</span>
                  <h4>{{index+1}}. {{item.question}}</h4>
                  <el-radio v-for="option in item.options" :key="option.value" v-model="item.answer" :label="option.label">{{ option.value }}</el-radio>
                  <div class="spanRight">
                    <div class="stuff">
                      <a class="edit-selector" @click="showControl(index)">编辑</a>
                      <a class="edit-selector" @click="copyQuestion(index)">复制</a>
                      <a class="edit-selector delete-selector" @click="deleteQuestion(index)">删除</a>
                      <a class="edit-selector" @click="setQuestionAbove(index)">上移</a>
                      <a class="edit-selector" @click="setQuestionNext(index)">下移</a>
                      <a class="edit-selector" @click="setQuestionFirst(index)">最前</a>
                      <a class="edit-selector" @click="setQuestionLast(index)">最后</a>
                    </div>
                  </div>
                </div>
                <div class="edit-box" v-if="item.editShow">
                  <div class="edit-header">
                    <span style="font-size: 16px;font-weight: bold">题目：&nbsp&nbsp</span>
                    <el-input  style="display: inline-block;width: 400px;margin-right: 50px" v-model="item.question"></el-input>
                    <span style="font-size: 14px;font-weight: bold">必做题&nbsp&nbsp</span>
                    <el-switch v-model="item.must" active-color="#13ce66"></el-switch>
                  </div>
                  <div class="edit-description">
                    <span style="margin-right: 320px">选项文字</span>
                    <span>上移&nbsp下移</span>
                  </div>
                  <div class="edit-list">
                    <div class="edit-option" v-for="(option,i) in item.options">
                      <el-input  style="display: inline-block;width: 300px" v-model="option.value" size="small"></el-input>
                      <div class="button-box">
                        <a href="javascript:void(0)" class="changeButton" @click="addOption(index,i)"><i class="el-icon-circle-plus-outline"></i></a>
                        <a href="javascript:void(0)" class="changeButton" @click="deleteOption(index,i)" style="margin-right: 40px"><i class="el-icon-remove-outline"></i></a>
                        <a href="javascript:void(0)" class="changeButton" @click="aboveOption(index,i)"><i class="el-icon-top"></i></a>
                        <a href="javascript:void(0)" class="changeButton" @click="nextOption(index,i)"><i class="el-icon-bottom"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="edit-submit" @click="item.editShow=false">完成编辑</div>
                </div>
              </div>
              <div v-else-if="item.style===2">
                <div class="question-content">
                  <span v-show="item.must" style="color: red">*</span>
                  <h4>{{index+1}}. {{item.question}}</h4>
                  <span>[多选题]</span>
                  <el-checkbox-group v-model="item.answer">
                    <el-checkbox v-for="option in item.options" :key="option.value" :label="option.label"></el-checkbox>
                  </el-checkbox-group>
                  <div class="spanRight">
                    <div class="stuff">
                      <a class="edit-selector" @click="showControl(index)">编辑</a>
                      <a class="edit-selector" @click="copyQuestion(index)">复制</a>
                      <a class="edit-selector delete-selector" @click="deleteQuestion(index)">删除</a>
                      <a class="edit-selector" @click="setQuestionAbove(index)">上移</a>
                      <a class="edit-selector" @click="setQuestionNext(index)">下移</a>
                      <a class="edit-selector" @click="setQuestionFirst(index)">最前</a>
                      <a class="edit-selector" @click="setQuestionLast(index)">最后</a>
                    </div>
                  </div>
                </div>
                <div class="edit-box" v-if="item.editShow">
                  <div class="edit-header">
                    <span style="font-size: 16px;font-weight: bold">题目：&nbsp&nbsp</span>
                    <el-input  style="display: inline-block;width: 400px;margin-right: 50px" v-model="item.question"></el-input>
                    <span style="font-size: 14px;font-weight: bold">必做题&nbsp&nbsp</span>
                    <el-switch v-model="item.must" active-color="#13ce66"></el-switch>
                  </div>
                  <div class="edit-description">
                    <span style="margin-right: 320px">选项文字</span>
                    <span>上移&nbsp下移</span>
                  </div>
                  <div class="edit-list">
                    <div class="edit-option" v-for="(option,i) in item.options">
                      <el-input  style="display: inline-block;width: 300px" v-model="option.value" size="small"></el-input>
                      <div class="button-box">
                        <a href="javascript:void(0)" class="changeButton" @click="addOption(index,i)"><i class="el-icon-circle-plus-outline"></i></a>
                        <a href="javascript:void(0)" class="changeButton" @click="deleteOption(index,i)" style="margin-right: 40px"><i class="el-icon-remove-outline"></i></a>
                        <a href="javascript:void(0)" class="changeButton" @click="aboveOption(index,i)"><i class="el-icon-top"></i></a>
                        <a href="javascript:void(0)" class="changeButton" @click="nextOption(index,i)"><i class="el-icon-bottom"></i></a>
                      </div>
                    </div>
                  </div>
                  <div class="edit-submit" @click="item.editShow=false">完成编辑</div>
                </div>
              </div>
              <div v-else>
                <div class="question-content">
                  <span v-show="item.must" style="color: red">*</span>
                  <h4>{{index+1}}. {{item.question}}</h4>
                  <el-input v-model="item.answer" placeholder="请输入内容"></el-input>
                  <div class="spanRight">
                    <div class="stuff">
                      <a class="edit-selector" @click="showControl(index)">编辑</a>
                      <a class="edit-selector" @click="copyQuestion(index)">复制</a>
                      <a class="edit-selector delete-selector" @click="deleteQuestion(index)">删除</a>
                      <a class="edit-selector" @click="setQuestionAbove(index)">上移</a>
                      <a class="edit-selector" @click="setQuestionNext(index)">下移</a>
                      <a class="edit-selector" @click="setQuestionFirst(index)">最前</a>
                      <a class="edit-selector" @click="setQuestionLast(index)">最后</a>
                    </div>
                  </div>
                </div>
                <div class="edit-box" v-if="item.editShow">
                  <div class="edit-header">
                    <span style="font-size: 16px;font-weight: bold">题目：&nbsp&nbsp</span>
                    <el-input  style="display: inline-block;width: 400px;margin-right: 50px" v-model="item.question"></el-input>
                    <span style="font-size: 14px;font-weight: bold">必做题&nbsp&nbsp</span>
                    <el-switch v-model="item.must" active-color="#13ce66"></el-switch>
                  </div>
                  <div class="edit-submit" @click="item.editShow=false">完成编辑</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="addOptionBox">
          <el-dropdown>
            <span class="el-dropdown-link">添加题目<i class="el-icon-arrow-down el-icon--right"></i></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addQuestion(1)">单选题</el-dropdown-item>
              <el-dropdown-item @click.native="addQuestion(2)">多选题</el-dropdown-item>
              <el-dropdown-item @click.native="addQuestion(3)">单行文本题</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
  <div class="background" :style="backgroundStyle"></div>
  <div style="background-color: rgba(234,242,247, 0.95);height: 100px"></div>
</div>
</template>

<script>
import util from '../assets/js/DataManipulation'
export default {
  name: "QuestionnaireEdit",
  data(){
    return{
      questionnaire: {
        title: '',
        description: ''
      },
      headTitle:'',
      backgroundStyle:{
        width: '100%',
        backgroundColor: 'rgba(234,242,247, 0.95)',
        height: '200px'
      },
      count: 0,
      List:[
        {
          editShow: false,
          style:1,
          must: true,
          question:'题目1',
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
          answer:'1'
        },
        {
          editShow: false,
          style:2,
          question:'题目2',
          must: true,
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
          answer: []
        },
        {
          editShow: false,
          style:3,
          question:'题目3',
          must:false, //必选
          answer: '',
          options:[{}]
        }
      ]
    }
  },
  methods:{
    showControl(index){
      if(this.List[index].editShow){
        this.List[index].editShow=false
      }
      else{
        for(let i=0;i<this.List.length;i++){
          if(this.List[i].editShow&&i!==index){
            this.List[i].editShow=false
          }
        }
        this.List[index].editShow=true
      }
    },
    deleteQuestion(index){
      this.List.splice(index, 1);
    },
    setQuestionNext(index){ // 题目下移
      if(index===this.List.length-1){
        this.$message({
          message: '最后一题不能再下移！',
          type: 'warning'
        });
      }
      else{
        let item1=this.List[index]
        let item2=this.List[index+1]
        this.$set(this.List, index+1, item1)
        this.$set(this.List, index, item2)
      }
    },
    setQuestionAbove(index){ // 题目上移
      if(index===0){
        this.$message({
          message: '第一题不能再上移！',
          type: 'warning'
        });
      }
      else{
        let item1=this.List[index]
        let item2=this.List[index-1]
        this.$set(this.List, index-1, item1)
        this.$set(this.List, index, item2)
      }
    },
    setQuestionLast(index){ // 题目最下移
      if(index===this.List.length-1){
        this.$message({
          message: '最后一题不能再下移！',
          type: 'warning'
        });
      }
      else{
        let item1=this.List[index]
        let item2=this.List[this.List.length-1]
        this.$set(this.List, this.List.length-1, item1)
        this.$set(this.List, index, item2)
      }
    },
    setQuestionFirst(index){ // 题目最上移
      if(index===0){
        this.$message({
          message: '第一题不能再上移！',
          type: 'warning'
        });
      }
      else{
        let item1=this.List[index]
        let item2=this.List[0]
        this.$set(this.List, 0, item1)
        this.$set(this.List, index, item2)
      }
    },
    copyQuestion(index){
      let item=JSON.parse(JSON.stringify(this.List[index]))
      if(item.editShow){
        item.editShow=false
      }
      this.List.splice(index+1,0,item)
    },
    // index是题号 i是选项号
    addOption(index,i){
      let item=JSON.parse(JSON.stringify(this.List[index].options[i]))
      item.label=this.count++
      item.value='默认内容'
      this.List[index].options.splice(i+1,0,item)
    },
    deleteOption(index,i){
      this.List[index].options.splice(i, 1);
    },
    aboveOption(index,i){
      if(i===0){
        this.$message({
          message: '第一个选项不能再上移！',
          type: 'warning'
        });
      }
      else{
        let item1=this.List[index].options[i]
        let item2=this.List[index].options[i-1]
        this.$set(this.List[index].options, i-1, item1)
        this.$set(this.List[index].options, i, item2)
      }
    },
    nextOption(index,i){
      if(i===this.List[index].options.length-1){
        this.$message({
          message: '最后一个选项不能再下移！',
          type: 'warning'
        });
      }
      else{
        let item1=this.List[index].options[i]
        let item2=this.List[index].options[i+1]
        this.$set(this.List[index].options, i+1, item1)
        this.$set(this.List[index].options, i, item2)
      }
    },
    addQuestion(style){
      let newItem
      switch (style){
        case 1: {
          newItem={
            editShow: false,
            style:1,
            question:'默认题目',
            must: false,
            options:[
              {
                value:'选项1',
                label:'1'
              },
              {
                value:'选项2',
                label:'2'
              }
            ],
            value: ''
          }
          break
        }
        case 2:{
          newItem={
            editShow: false,
            style:2,
            question:'默认题目',
            must: false,
            options:[
              {
                value:'选项1',
                label:'1'
              },
              {
                value:'选项2',
                label:'2'
              }
            ],
            checkList: []
          }
          break
        }
        case 3:{
          newItem={
            editShow: false,
            style:3,
            question:'默认题目',
            must:false,
            answer: ''
          }
          break
        }
      }
      this.List.push(newItem)
    },
    test(){
      //
    },
    onSubmit(){
      this.$confirm('完成编辑，提交问卷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let submitOptions={},submitQuestionnaire,i=0,founderId=this.$store.state.id,questionnaireId=this.$store.state.questionnaireId
        submitQuestionnaire={
          title: this.questionnaire.title,
          question_number: this.List.length,
          founder_id: founderId,
          description: this.questionnaire.description
        }
        this.List.forEach(function (item,index,array){
          if(item.style!==3){
            for(let k=0;k<item.options.length;k++){
              let obj={
                questionnaire_id: questionnaireId,
                question :item.question,
                style:item.style,
                question_number:index+1,
                required: item.must===true?1:0,
                text: item.options[k].value
              }
              submitOptions[i++]=obj
            }
          }
          else{
            let obj={
              questionnaire_id: questionnaireId,
              question :item.question,
              style:item.style,
              question_number:index+1,
              required: item.must===true?1:0,
              text: ''
            }
            submitOptions[i++]=obj
          }
        })
        if(window.location.href.indexOf('questionnaireCreate')!==-1){
          // 创建
          this.$axios.get('http://localhost:8080/questionnaire/createOrEditQuestionnaire', {
            params: {
              questionnaireJsonString: JSON.stringify(submitQuestionnaire),
              OptionsJsonString: JSON.stringify(submitOptions),
              edit: 0,
              optionsNum:i
            }
          }).then(res => {
            console.log(res.data)
          })
        }
        else{
          // 编辑问卷id不变保存在state了
          submitQuestionnaire['id']=questionnaireId
          this.$axios.get('http://localhost:8080/questionnaire/createOrEditQuestionnaire', {
            params: {
              questionnaireJsonString: JSON.stringify(submitQuestionnaire),
              OptionsJsonString: JSON.stringify(submitOptions),
              edit: 1,
              optionsNum:i
            }
          }).then(res => {
          })
        }
        this.$router.push('/main')
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      }).catch(() => {
      });
    }
  },
  created() {
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},
        this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
  },
  mounted() {
    if(window.location.href.indexOf('questionnaireCreate')!=-1){
      // 进入的是创建问卷的页面
      this.headTitle='创建新问卷'
      this.questionnaire.title=this.$route.params.title
    }
    else{
      // 进入的是编辑问卷的页面
      // console.log(this.$store.state.questionnaireId)
      this.headTitle='编辑问卷'
      this.$axios.get('http://localhost:8080/q-option/getQuestionnaireData', {
        params: {
          id: this.$store.state.questionnaireId
        }
      }).then(res => {
        this.questionnaire=res.data.questionnaire
        this.List=util.questionnaireToList(res.data)
      })
    }
    this.count=10 // label递增，方便数组更新取数据
  },
  updated() {
    if(this.$refs.container.clientHeight<(screen.height-180))
      this.backgroundStyle.height=`${screen.height-this.$refs.container.clientHeight-180}px`
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
.i{
  display: inline;
}
.b{
  display: block;
}
.ib{
  display: inline-block;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.header{
  height: 120px;
  background-image: url("../assets/img/headerImg.png");
}
.content{
  background-color: white;
  padding: 0 100px 0;
  border-radius: 10px;
}
.content-header{
  height: 50px;
  padding: 20px;
  text-align: center;
}
.content-header span{
  width: 200px;
  font-size: 30px;
  font-weight: bolder;
  color: black;
}
.content-main{
  font-size: 16px;
  text-align: left;
}
.main-header{
  padding: 20px 100px 10px 100px;
  border-bottom: 1px solid #e2e2e2;
}
.l1 >>>.el-form-item__label{
  padding-right: 40px;
}
.content-main ul li >>>.el-radio__label{
  font-size: 16px;
}
.content-main ul li >>>.el-checkbox__label{
  font-size: 16px;
}
.content-main h4{
  margin-top: 10px;
  display: inline-block;
}
.questions .el-checkbox,.questions .el-radio,.questions .el-input{
  display: block;
  margin-top: 10px;
}
.content-main ul li:last-child{
  padding-bottom: 50px;
}
.question-content{
  position: relative;
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 50px;
  cursor: move;
}
.spanRight{
  display: none;
  position: absolute;
  height: 40px;
  width: 448px;
  bottom:5px;
  right: 10px;
}
.stuff{
  font-size: 12px;
  float: left;
  height: 23px;
  line-height: 23px;
  margin: 6px 0 11px 10px;
  text-align: center;
}
.spanRight .edit-selector,.spanRight .edit-selector:visited{
  display: inline-block;
  width: 44px;
  height: 23px;
  padding: 0 6px 0;
  cursor: pointer;
  COLOR: #808080;
  text-decoration: none;
  vertical-align: middle;
  border: 1px solid #B1B1B1;
  border-radius: 2px;
  background: #fff;
}
.spanRight .edit-selector:hover{
  color: #1ea0fa;
  border: 1px solid #1ea0fa;
}
.spanRight .delete-selector:hover{
  color: #ff6060;
  border: 1px solid #ff6060;
}
.question-content:hover{
  background-color: #f8f8f8;
}
.question-content:hover .spanRight{
  display: block;
}
.edit-box{
  padding: 10px 30px;
  background-color: #FAFAFA;;
}
.edit-box .edit-description{
  height: 35px;
  line-height: 35px;
  font-size: 14px;
  margin-top: 10px;
  padding: 0 10px;
  background-color: #e5e5e5;
  border-radius: 2px;
}
.edit-option .button-box{
  position: relative;
  top: 5px;
  display: inline-block;
}
.edit-box .changeButton{
  display: inline-block;
  padding-top: 5px;
  font-size: 22px;
  color: #b6b6b6;
}
.edit-box .changeButton:hover{
  color: #1ea0fa;
}
.edit-submit{
  margin-top: 10px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  display: inline-block;
  border: 0;
  cursor: pointer;
  background-color: #ffab1a;
  font-size: 16px;
  color: #fff;
  border-radius: 4px;
  padding: 0 15px;
  overflow: visible;
}
.head{
  position: fixed;
  z-index: 999;
  height: 42px;
  width: 100%;
  background-color: #313131;
}
.head .submitButton{
  float: right;
  cursor: pointer;
  height: 42px;
  line-height: 42px;
  background-color: #0095ff;
  font-weight: 600;
  font-size: 15px;
  color: #fff !important;
  padding: 0 16px;
}
.submitButton:hover{
  background-color: #0988ff;
}
.addOptionBox{
  height: 40px;
  text-align: center;
  padding-bottom: 30px;
}
.addOptionBox .el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
</style>
