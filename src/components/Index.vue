<template>
  <div class="container">
    <el-dialog :visible.sync="exitDialogVisible" width="25%" center style="line-height: 10px" class="dialog">
      <span>确认退出？</span>
      <span slot="footer" class="dialog-footer" style="font-size: 10px">
                  <el-button type="primary" @click="exit" style="margin-right: 50px" id="button1">确 定</el-button>
                  <el-button @click="exitDialogVisible = false" id="button2">取 消</el-button>
                  </span>
    </el-dialog>
    <el-dialog :visible.sync="editDialogVisible" width="846px" center>
      <div class="editBox">
        <EditMethodSelectDialog></EditMethodSelectDialog>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="createDialogVisible" width="30%" center>
      <div class="createBox">
        <h1>新建调查问卷</h1>
        <el-input v-model="createTitle" placeholder="请输入标题"></el-input>
        <el-button type="primary" @click.native="toCreate">立即创建</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="urlDialogVisible" width="30%" center class="urlDialog" style="border-radius: 5px">
      <div style="padding: 20px 20px 0 20px">
        <span v-if="urlDialogControl===0" style="display: block;font-size: 20px;color: black;font-weight: bold;
      margin-bottom: 10px;position: relative;bottom: 10px">问卷发布成功</span>
        <span v-if="urlDialogControl!==2" style="color: black">问卷访问链接为：</span>
        <span v-if="urlDialogControl!==2" style="color: #898989">{{url}}</span>
        <span v-if="urlDialogControl===2" style="color: black">此问卷还未发布，请发布后再查看！</span>
        <div style="margin-top: 20px;text-align: center">
          <el-button type="primary" @click="urlDialogVisible=false">好的</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="resultDialogVisible" width="80%" center class="resultDialog" top="50px">
      <div class="resultDialogBox">
        <div class="resultDialogBox-header">
          <span style="display: block;margin-bottom:20px;text-align: center;font-size: 26px;font-weight: bold;">“{{this.resultDialogConfig.title}}”调查结果</span>
        </div>
        <div class="resultDialogBox-table">
          <el-table style="width: 100%" :data="answers.slice((currentPage-1)*pageSize,currentPage*pageSize)" border stripe height="530px">
            <el-table-column v-for="(item,index) in questions" :key="index" :prop="item" :label="item" :width="getWidth(item,index)"></el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination @current-change="handleCurrentChange" :page-size="pageSize"
                         layout="total,prev, pager, next, jumper" :total="answers.length" background >
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <div class="header">
      <div class="w">
        <div class="logo">
          <a href="http://localhost:8081/main" class="logoHover"></a>
          <a href="http://localhost:8081/main" class="logoText">问卷星</a>
        </div>
        <div class="fr header-right-block">
          <div class="fr user-block">
            <el-dropdown>
              <el-button class="el-icon-user-solid" style="border: #E4E7ED;font-size: 20px">
                <span style="margin-left: 6px;font-size: 16px">{{ userName }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>用户信息</el-dropdown-item>
                <el-dropdown-item>客服中心</el-dropdown-item>
                <el-dropdown-item @click.native="exitDialogVisible=true">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="fr icons">
            <a href="https://www.wjx.cn/help/help.aspx" target="_blank" title="帮助中心" class="index_iconfont headIcon">
              <i class="el-icon-question"></i></a>
            <a href="https://www.wjx.cn/jq/3685992.aspx" target="_blank" title="意见反馈" class="index_iconfont headIcon">
              <i class="el-icon-s-comment icon"></i></a>
            <a href="/login" target="_blank" title="消息" class="index_iconfont headIcon">
              <i class="el-icon-message-solid icon"></i></a>
          </div>
          <div class="fr my-question">
            <i class="el-icon-s-home" style="color: dodgerblue;font-size: 20px"></i>
            <span style="color: #878787;font-size: 14px">我的问卷</span>
          </div>
        </div>
      </div>
    </div>
    <div class="left-block">
      <a href="#" class="createButton" @click="createDialogVisible=true">
        <i class="el-icon-plus"></i>
        <span>创建问卷</span>
      </a>
      <ul>
        <li><a href="/main">
          <i class="el-icon-s-order"></i>
          <span>全部问卷</span>
        </a></li>
        <li><a href="javascript:void(0)">
          <i class="el-icon-star-on"></i>
          <span>星标问卷</span>
        </a></li>
        <li><a href="javascript:void(0)">
          <i class="el-icon-menu"></i>
          <span>文件夹</span>
        </a></li>
        <li><a href="javascript:void(0)">
          <i class="el-icon-delete-solid"></i>
          <span>回收站</span>
        </a></li>
      </ul>
    </div>
    <div class="w main" ref="container">
      <div class="main-block">
        <div class="main-block-header">
          <h2 class="fl">问卷列表</h2>
          <a href="#" @click="searchQuestionnaire"><i class="el-icon-search"></i></a>
          <el-input class="search fr" v-model="searchText"
                    placeholder="请输入问卷名进行搜索..."/>
          <span class="dropdown fr">
            <el-dropdown @command="changeSort">
            <span class="el-dropdown-link" v-text="sortBy"></span><i class="el-icon-d-caret el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in sortByList" :key="item.name"
                                :command="item.name">{{ item.name }}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown>
            <span class="el-dropdown-link" style="margin-left: 10px">状态</span><i
              class="el-icon-d-caret el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="setStatus(0)">查看所有</el-dropdown-item>
              <el-dropdown-item @click.native="setStatus(1)">已发布</el-dropdown-item>
              <el-dropdown-item @click.native="setStatus(2)">未发布</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </span>
        </div>
        <ul v-loading="loading">
          <li v-for="(item,index) in filteredQuestionnaires" class="main-li">
            <div class="item-top">
              <span class="item-top-title fl">{{ item.title }}</span>
              <span class="item-top-date fr">{{ item.createDate }}</span>
              <span class="item-top-number fr">答卷:{{ item.answersheetNumber }}</span>
              <span class="item-top-status fr" :class="[{'BlueColor':item.status===1},{'BlackColor':item.status===0}]">{{ item.status===0?'未发布':'已发布' }}</span>
              <i class="point fr" :class="[{'BlueBg':item.status===1},{'GreyBg':item.status===0}]"></i>
              <span class="item-top-id fr">ID:{{ item.id }}</span>
            </div>
            <div class="item-bottom">
              <div class="bottom-left">
                <ul>
                  <li>
                    <a href="#">
                      <i class="icon design-icon"></i>
                      设计问卷
                      <i class="el-icon-caret-bottom"></i>
                    </a>
                    <ul>
                      <li><a href="javascript:void(0)" @click="editQuestionnaire(item)">编辑问卷</a></li>
                      <li><a href="javascript:void(0)" @click="questionnaireCheck(item)">问卷外观</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i class="icon send-icon"></i>
                      发送问卷
                      <i class="el-icon-caret-bottom"></i>
                    </a>
                    <ul>
                      <li><a href="javascript:void(0)" @click="viewUrl(item)">问卷链接</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <i class="icon analysis-icon"></i>
                      分析&下载
                      <i class="el-icon-caret-bottom"></i>
                    </a>
                    <ul>
                      <li><a href="javascript:void(0)" @click="showResult(item)">答卷结果</a></li>
                      <li><a href="javascript:void(0)" @click="downloadResult(item)">导出答卷</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="bottom-right fr">
                <a href="javascript:void(0)" @click="publishOrNot(item)">
                  <i class="publish-icon" :class="[{'el-icon-video-play':item.status===0},{'el-icon-video-pause':item.status===1}]"></i>
                  {{ item.status===0?'发布':'停止' }}
                </a>
                <a href="javascript:void(0)" @click="deleteQuestionnaire(item)">
                  <i class="el-icon-delete"></i>删除
                </a>
              </div>
            </div>
          </li>
        </ul>
        <div class="clearfix blank"></div>
        <div class="w footer">
          <i class="mini-logo"></i>
          <span>不止问卷调查/在线考试</span>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div class="background" :style="backgroundStyle"></div>
  </div>
</template>
<script>
import EditMethodSelectDialog from "./EditMethodSelectDialog";

export default {
  name: "Main",
  components:{
    EditMethodSelectDialog
  },
  data() {
    return {
      backgroundStyle:{
        width: '100%',
        backgroundColor: '#f5f5f5',
        height: '100px'
      },
      loading: false,
      userName: '',
      exitDialogVisible: false,
      editDialogVisible: false,
      createDialogVisible: false,
      urlDialogVisible: false,
      resultDialogVisible:false,
      urlDialogControl: 1, // 0是发布时候，1是查看链接，2是显示问卷未发布
      createTitle:'',
      sortBy: '时间倒序',
      search: '',
      searchText: '',
      status: 0,
      url:'',
      // 每页条数
      pageSize: 8,
      // 当前页数
      currentPage: 1,
      sortByList: [
        {
          name: '时间倒序',
        },
        {
          name: '时间正序'
        },
        {
          name: '答卷倒序'
        },
        {
          name: '答卷正序'
        },
      ],
      questionnaires:[],
      resultDialogConfig:{
        title: '',
        questionNum: 0,
        answerSheetNum: 0
      },
      questionsTest:['问题1','问题2'],
      questions:[],
      answers:[]
    }
  },
  computed: {
    filteredQuestionnaires: function (){
      // 计算属性，得出经过三个条件过滤的数据
      let list= [];
      for (let i = 0;i < this.questionnaires.length; i++)
      {
        if (this.questionnaires[i].title.search(this.search) !== -1) {
          if(this.status===0||this.status===1&&this.questionnaires[i].status===1||
            this.status===2&&this.questionnaires[i].status===0)
            list.push(this.questionnaires[i]);
        }
      }
      switch (this.sortBy){
        case "时间倒序":{
          list.sort(function (a,b){
            if(a.createDate.toString()<b.createDate.toString())
              return 1
            else return -1
          })
          break
        }
        case "时间正序":{
          list.sort(function (a,b){
            if(a.createDate.toString()>b.createDate.toString())
              return 1
            else return -1
          })
          break
        }
        case "答卷倒序":{
          list.sort(function (a,b){
            return b.answersheetNumber-a.answersheetNumber
          })
          break
        }
        case "答卷正序":{
          list.sort(function (a,b){
            return a.answersheetNumber-b.answersheetNumber
          })
          break
        }
      }
      return list
    }
  },
  methods: {
    // 问卷结果翻页更新
    handleCurrentChange (val) {
      this.currentPage = val
    },
    exit() {
      // 退出登录清空存储
      this.$store.commit("offId")
      sessionStorage.removeItem("store")
      this.$router.push('/login')
    },
    changeSort(data) {
      this.sortBy = data
    },
    setStatus(num){
      this.status=num
    },
    searchQuestionnaire() { // 关键字搜索
      this.search=this.searchText
    },
    questionnaireCheck(item){ //问卷查看（只能查看不能提交）
      this.$store.commit("setQuestionnaireId",item.id)
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.push('/questionnaireCheck')
    },
    toCreate(){
      this.$store.commit("setQuestionnaireId",0)
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      this.$router.push({name:"QuestionnaireCreate",params:{title:this.createTitle}})
    },
    deleteQuestionnaire(item){
      let id=item.id
      this.$confirm('确定删除该问卷?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let k = 0; k < this.questionnaires.length; k++){
          if(this.questionnaires[k]===item){
            this.questionnaires.splice(k,1)
          }
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.$axios.get('http://localhost:8080/questionnaire/deleteQuestionnaire', {
          params: {
            id: id
          }
        })
      }).catch(() => {});
    },
    publishOrNot(item){
      let index
      for (let k = 0; k < this.questionnaires.length; k++){
        if(this.questionnaires[k]===item){
          index=k
          break
        }
      }
      if(item.status===1){
        this.$confirm('状态设为“停止”后将不能填写，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.questionnaires[index].status=0
          this.$axios.get('http://localhost:8080/questionnaire/changeStatus', {
            params: {
              id: item.id
            }
          }).then(res=>{
          })
        }).catch(() => {});
      }
      else{
        this.$axios.get('http://localhost:8080/questionnaire/changeStatus', {
          params: {
            id: item.id
          }
        }).then(res=>{
          this.url=res.data.url
        })
        this.questionnaires[index].status=1
        this.urlDialogControl=0
        this.urlDialogVisible=true
      }
    },
    viewUrl(item){
      if(item.status===1){
        this.urlDialogControl=1
        this.$axios.get('http://localhost:8080/questionnaire/getQuestionnaire', {
          params: {
            id: item.id
          }
        }).then(res => {
          this.url=res.data.url
        })
      }
      else{
        this.urlDialogControl=2
      }
      setTimeout(()=>{
        this.urlDialogVisible=true
      },300)
    },
    editQuestionnaire(item){
      let t=1
      this.$axios.get('http://localhost:8080/questionnaire/getStatus', {
        params: {
          id: item.id
        }
      }).then(res => {
        if(res.data===1){
          this.$message({
            message: '请先停止发布问卷再编辑！',
            type: 'warning'
          });
          t=0
        }
      })
      setTimeout(() => {
        if(t===0)
          return
        this.$store.commit("setQuestionnaireId",item.id)
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        this.editDialogVisible=true
      }, 400)
    },
    // 根据问题数量返回表格列的宽度
    getWidth(item,index){
      if(index===0){
        return 80
      }
      else{
        if(this.questions.length>9){
          return 150
        }
        else
          return
      }
    },
    showResult(item){
      let t=1
      this.$axios.get('http://localhost:8080/questionnaire/getQuestionnaire', {
        params: {
          id: item.id
        }
      }).then(res => {
        if(res.data.answersheetNumber===0){
          this.$message({
            message: '答卷信息为空，赶紧叫人填写问卷吧！',
            type: 'warning'
          });
          t=0
        }
      })
      setTimeout(() => {
        if(t===1){
          this.$axios.get('http://localhost:8080/questionnaire/getResult', {
            params: {
              id: item.id
            }
          }).then(res => {
            this.answers=[]
            this.questions=[]
            this.resultDialogConfig.title=res.data.title
            let i,j
            this.questions[0]='序号'
            for(i=1;i<=res.data.questions.length;i++){
              this.questions[i]=res.data.questions[i-1].question
            }
            this.questions[i]='提交时间'
            for(i=0;i<res.data.answer.answersheetNumber;i++){ //2
              let obj={}
              obj['序号']=i+1
              for(j=0;j<res.data.questions.length;j++){ //5
                obj[res.data.questions[j].question]=res.data.answer.answers[i].answers[j].answer
              }
              obj['提交时间']=res.data.answer.answers[i].submitTime
              this.answers[i]=JSON.parse(JSON.stringify(obj))
              obj={}
            }
          })
          this.resultDialogVisible=true
        }
      }, 300)
    },
    downloadResult(item){
      this.$axios.get('http://localhost:8080/questionnaire/getResult', {
        params: {
          id: item.id
        }
      }).then(res => {
        this.answers=[]
        this.questions=[]
        this.resultDialogConfig.title=res.data.title
        let i,j
        this.questions[0]='序号'
        for(i=1;i<=res.data.questions.length;i++){
          this.questions[i]=res.data.questions[i-1].question
        }
        this.questions[i]='提交时间'
        for(i=0;i<res.data.answer.answersheetNumber;i++){ //2
          let obj={}
          obj['序号']=i+1
          for(j=0;j<res.data.questions.length;j++){ //5
            obj[res.data.questions[j].question]=res.data.answer.answers[i].answers[j].answer
          }
          obj['提交时间']=res.data.answer.answers[i].submitTime
          this.answers[i]=JSON.parse(JSON.stringify(obj))
          obj={}
        }
      })
      setTimeout(()=>{
        // console.log(JSON.stringify(this.questions))
        let questions={},answers={}
        for(let i=0;i<this.questions.length;i++){
          questions[i]=JSON.parse(JSON.stringify(this.questions[i]))
        }
        for(let i=0;i<this.answers.length;i++){
          answers[i]=JSON.parse(JSON.stringify(this.answers[i]))
        }
        // console.log(JSON.stringify(questions))
        // console.log(JSON.stringify(answers))
        this.$axios.get('http://localhost:8080/questionnaire/downloadResult', {
          params: {
            json1: JSON.stringify(questions),
            json2: JSON.stringify(answers)
          }
        })
      },400)
    }
  },
  created() {
    // 页面创建时读出账号的缓存信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},
        this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
    }
    if(this.$store.state.id===''){
      this.$router.push('/login')
    }
  },
  mounted() {
    this.userName=this.$store.state.name
    this.loading = true
    setTimeout(() => {
      this.$axios.get('http://localhost:8080/questionnaire/getQuestionnaireList', {
        params: {
          id: this.$store.state.id
        }
      }).then(res => {
        this.questionnaires=res.data
      })
      this.loading = false
    }, 800)
  },
  updated() {
    if(this.$refs.container.clientHeight<(screen.height-145))
      this.backgroundStyle.height=`${screen.height-this.$refs.container.clientHeight-145}px`
    else
      this.backgroundStyle.height='0'
  }
}
</script>
<style scoped>
.container {
  background-color: #f5f5f5;
}

.w {
  width: 1392px;
  margin: 0 auto;
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.clearfix:before, .clearfix:after {
  content: "";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}

.clearfix {
  *zoom: 1;
}

.header {
  position: fixed;
  height: 60px;
  width: 100%;
  background-color: white;
  box-shadow: 0px 0px 5px #888888;
  z-index: 999;
}

.logo {
  float: left;
  margin-top: 12px;
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
}

.logo .logoHover {
  float: left;
  width: 32px;
  height: 32px;
  display: inline-block;
  background-image: url("../assets/img/logo2.png");
  background-size: cover;
}

.logo .logoText {
  float: left;
  margin-left: 4px;
  text-decoration: none;
  color: black;
}

.logoText:hover {
  color: dodgerblue;
}

.header-right-block {
  height: 56px;
  line-height: 56px;
}

.headIcon {
  font-size: 20px;
  color: #caccd2;
  margin: 0 7px 0;
}

.headIcon:hover {
  color: dodgerblue;
}

.icons a:first-child {
  padding-left: 15px;
  margin-left: 20px;
  border-left: 1px solid #e2dbd6;
}

.left-block {
  position: fixed;
  right: 50%;
  margin-right: 456px;
  top: 100px;
  width: 240px;
  height: 327px;
}

.createButton {
  display: block;
  width: 240px;
  height: 56px;
  background-color: dodgerblue;
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 56px;
  text-decoration: none;
  text-align: center;
  border-radius: 5px;
}

.createButton:hover {
  background-color: #0a89ff;
}

.left-block li:first-child {
  margin-top: 20px;
  background-color: #e8e8e8;
  font-weight: 700;
}

.left-block li a {
  width: 200px;
  height: 44px;
  line-height: 44px;
  padding-left: 40px;
  display: block;
  text-decoration: none;
}

.left-block li a i {
  color: #7b7b7b;
  font-size: 22px;
}

.left-block li a span {
  color: black;
  font-size: 14px;
}

.left-block li a:hover {
  background-color: #e8e8e8;
}

.main{
}
.main-block {
  float: right;
  width: 1052px;
}

.main-block-header {
  position: relative;
  width: 100%;
  height: 44px;
  line-height: 44px;
  margin-top: 100px;
  padding-bottom: 10px;
  border-bottom: 1px solid #dbdbdb;
}

.main-block-header .search {
  width: 250px;
}

.main-block-header .el-icon-search {
  position: absolute;
  right: 10px;
  top: 13px;
  font-size: 20px;
  z-index: 999;
}

.main-block-header .el-icon-search:hover {
  color: dodgerblue;
}

.main-block-header .el-dropdown-link {
  color: #979797
}

.main-block-header .el-dropdown-link:hover {
  cursor: pointer;
  color: dodgerblue;
}

.main-block-header .dropdown {
  margin-right: 20px;
}

.main-li{
  height: 121px;
  background-color: #fff;
  border-radius: 2px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 4px 0px #f0f0f0;
  border: 1px solid #E6E6E6;
}
.main-li:hover{
  box-shadow: 0px 0px 10px 0px #e8e8e8;
  border: 1px solid rgba(217,217,217,1);
}
.main-block ul .main-li:first-child{
  margin-top: 20px;
}
.main-li .item-top{
  height: 22px;
  padding: 13px 24px 0;
  font-size: 12px;
}
.item-top span{
  margin-right: 25px;
}
.item-top .point{
  position: relative;
  top: 6px;
  width: 6px;
  height: 6px;
  margin-right: 4px;
  border-radius: 4px;
}
.BlueBg{
  background-color: #0095ff;
}
.GreyBg{
  background-color: #bfbfbf;
}
.BlackColor{
  color: black;
}
.BlueColor{
  color: #0095ff;
}
.item-bottom{
  margin: 13px 24px 0;
  height: 36px;
  line-height: 36px;
  padding: 18px 0 18px;
  border-top: 1px solid #f5f5f5;
}
.item-bottom .bottom-left>ul>li{
  float: left;
  margin-right: 20px;
}
.item-bottom .icon{
  display: inline-block;
  width: 22px;
  height: 28px;
  background-size: cover;
}
.design-icon{
  background-image: url("../assets/img/icon-design@2x.png");
}
.send-icon{
  background-image: url("../assets/img/icon-spread@2x.png");
}
.analysis-icon{
  background-image: url("../assets/img/icon-data@2x.png");
}
.item-bottom a{
text-decoration: none;
  font-size: 14px;
  color: #7a7a7a;
}
.item-bottom a:hover{
  color: dodgerblue;
}
.item-bottom ul li ul{
  position: absolute;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  z-index: 999;
}
.item-bottom ul li ul li{
  display: none;
  float: none;
  width: 112px;
  height: 33px;
  font-size: 13px;
  line-height: 33px;
  text-align: center;
  background-color: white;
  color: #000;
  border-top: 1px solid rgba(231, 231, 231, 0.5);
}
.item-bottom ul li:hover ul li{
  display: block;
}
.item-bottom .bottom-right{
  font-size: 15px;
  color: #7a7a7a;
}
.bottom-right i{
  font-size: 18px;
  color: #000000;
}
.bottom-right a{
  margin-right: 15px;
}
.bottom-right a:hover{
  color: black;
}
.main-block .blank{
  height: 100px;
}
.footer{
  position: relative;
  height: 30px;
  width: 100%;
}
.footer .mini-logo{
  position: absolute;
  left: 306px;
  width: 48px;
  height: 16px;
  background-image: url("../assets/img/logo-small.png");
  background-size: cover;
}
.footer span{
  display: block;
  margin-left: 366px;
  color: #7a7a7a;
}
.editBox{
  width: 746px;
  height: 380px;
  margin: 0 auto;
}
.createBox{
  height: 270px;
  padding: 60px;
  text-align: center;
}
.createBox h1,.createBox .el-input{
  display: block;
  margin-bottom: 50px;
}
.el-message-box__wrapper{
  z-index: 9999;
}
.resultDialog{
  /*position: relative;*/
}
.resultDialogBox{
  height: 650px;
}
.resultDialogBox-table{
  padding: 0 80px 0;
}
.pagination{
  margin-top: 30px;
  text-align: center;
}
</style>
