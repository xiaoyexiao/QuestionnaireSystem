<template>
<div class="container">
  <div class="header w"></div>
  <div class="w">
    <div class="content">
      <div class="content-main">
        <span class="titleWord">{{title}}</span>
        <el-input type="textarea" :rows="2" placeholder="请输入问卷描述内容" v-model="description">
        </el-input>
        <div class="questions">
          <ul>
            <li class="" v-for="(item,index) in List">
              <div v-if="item.style===1">
                <div class="question-content" @click="showControl(index)">
                  <h4>{{index+1}}. {{item.question}}</h4>
                  <el-radio v-for="option in item.options" :key="option.value" v-model="item.value" :label="option.label">{{ option.value }}</el-radio>
                </div>
                <div class="edit-box" v-if="item.editShow"></div>
              </div>
              <div v-else-if="item.style===2">
                <div class="question-content" @click="showControl(index)">
                  <h4>{{index+1}}. {{item.question}}</h4>
                  <span>[多选题]</span>
                  <el-checkbox-group v-model="item.checkList">
                    <el-checkbox v-for="option in item.options" :key="option" :label="option.value"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="edit-box" v-if="item.editShow"></div>
              </div>
              <div v-else>
                <div class="question-content" @click="showControl(index)">
                  <h4>{{index+1}}. {{item.question}}</h4>
                  <el-input v-model="item.answer" placeholder="请输入内容"></el-input>
                </div>
                <div class="edit-box" v-if="item.editShow"></div>
              </div>
            </li>
          </ul>
        </div>
        <el-button type="primary" @click.native="test">变</el-button>
      </div>
    </div>
  </div>
  <div class="footer"></div>
</div>
</template>

<script>
export default {
  name: "QuestionnaireEdit",
  data(){
    return{
      title:'title',
      description: '',
      List:[
        {
          editShow: false,
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
          editShow: false,
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
          editShow: false,
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
        {
          editShow: false,
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
        {
          editShow: false,
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
        {
          editShow: false,
          style:3,
          question:'题目1',
          must:false, //必选
          answer: ''
        },
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
    delete(index){
      this.splice(index, 1);
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
    test(){
      //
    }
  },
  mounted() {
    this.title=this.$route.params.title
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
  padding: 0 100px 0;
  border-radius: 10px;
}
.content-main{
  font-size: 16px;
  text-align: left;
}
.footer{
  height: 50px;
}
.titleWord{
  display: block;
  padding: 40px 20px 30px;
  font-size: 30px;
  font-weight: bolder;
  color: black;
}
.el-textarea{
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e2e2;
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
.content-main .el-checkbox,.content-main .el-radio,.content-main .el-input{
  display: block;
  margin-top: 10px;
}
.content-main ul li:last-child{
  padding-bottom: 50px;
}
.questions{
}
.question-content{
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: 50px;
  cursor: move;
}
.question-content:hover{
  background-color: #f8f8f8;
}
.edit-box{
  height: 100px;
  background-color: pink;
}
</style>
