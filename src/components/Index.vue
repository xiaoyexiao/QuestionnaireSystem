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
        <h1>创建调查问卷</h1>
        <el-input v-model="createTitle" placeholder="请输入标题"></el-input>
        <el-button type="primary" @click.native="toCreate">立即创建</el-button>
      </div>
    </el-dialog>
    <div class="header">
      <div class="w">
        <div class="logo">
          <a href="http://localhost:8080/main" class="logoHover"></a>
          <a href="http://localhost:8080/main" class="logoText">问卷星</a>
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
    <div class="w main">
      <div class="main-block">
        <div class="main-block-header">
          <h2 class="fl">问卷列表</h2>
          <a href="#" @click="searchQuestionnaire"><i class="el-icon-search"></i></a>
          <el-input class="search fr" v-model="search"
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
              <el-dropdown-item>已发布</el-dropdown-item>
              <el-dropdown-item>未发布</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </span>
        </div>
        <ul>
          <li v-for="item in questionnaires" class="main-li">
            <div class="item-top">
              <span class="item-top-title fl">{{ item.title }}</span>
              <span class="item-top-date fr">{{ item.date }}</span>
              <span class="item-top-number fr">答卷:{{ item.number }}</span>
              <span class="item-top-status fr">{{ item.status===0?'未发布':'已发布' }}</span>
              <i class="point fr"></i>
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
                      <li><a href="#">设计向导</a></li>
                      <li><a href="#" @click="editDialogVisible = true">编辑问卷</a></li>
                      <li><a href="#">问卷设置</a></li>
                      <li><a href="#" @click="questionnaireCheck">问卷外观</a></li>
                      <li><a href="#">红包&奖品</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i class="icon send-icon"></i>
                      发送问卷
                      <i class="el-icon-caret-bottom"></i>
                    </a>
                    <ul>
                      <li><a href="#">链接&二维码</a></li>
                      <li><a href="#">微信发送</a></li>
                      <li><a href="#">样本服务</a></li>
                      <li><a href="#">互填问卷</a></li>
                      <li><a href="#">申请推荐</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">
                      <i class="icon analysis-icon"></i>
                      分析&下载
                      <i class="el-icon-caret-bottom"></i>
                    </a>
                    <ul>
                      <li><a href="#">统计&分析</a></li>
                      <li><a href="#">查看下载答卷</a></li>
                      <li><a href="#">来源分析</a></li>
                      <li><a href="#">问卷外观</a></li>
                      <li><a href="#">红包&奖品</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div class="bottom-right fr">
                <a href="javascript:void(0)">
                  <i class="publish-icon" :class="[{'el-icon-video-play':item.status===0},{'el-icon-video-pause':item.status===1}]"></i>
                  {{ item.status===0?'发布':'停止' }}
                </a>
                <a href="javascript:void(0)">
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
      userName: 'xiaoyexiao',
      exitDialogVisible: false,
      editDialogVisible: false,
      createDialogVisible: false,
      createTitle:'',
      sortBy: '时间倒序',
      sortByList: [
        {
          name: '时间倒序'
        },
        {
          name: '时间正序'
        },
        {
          name: '答卷倒序'
        },
        {
          name: '倒卷正序'
        },
      ],
      number: 5,
      search: '',
      questionnaires: [
        {
          id: 1,
          title: '2',
          date: '2018-09-12',
          status: 1,
          number: 13
        },
        {
          id: 2,
          title: '1',
          date: '2018-09-12',
          status: 0,
          number: 13
        },
        {
          id: 3,
          title: '3',
          date: '2018-09-12',
          status: 0,
          number: 13
        },
        {
          id: 1,
          title: '2',
          date: '2018-09-12',
          status: 0,
          number: 13
        },
        {
          id: 1,
          title: '2',
          date: '2018-09-12',
          status: 0,
          number: 13
        },
        {
          id: 1,
          title: '2',
          date: '2018-09-12',
          status: 0,
          number: 13
        },
        {
          id: 1,
          title: '2',
          date: '2018-09-12',
          status: 0,
          number: 13
        },
        {
          id: 1,
          title: '2',
          date: '2018-09-12',
          status: 0,
          number: 13
        }
      ]
    }
  },
  methods: {
    exit() {
      this.$store.commit("offId")
      this.$router.push('/login')
    },
    changeSort(data) {
      this.sortBy = data
    },
    searchQuestionnaire() { // 关键字搜索
      console.log('yes')
    },
    questionnaireCheck(){ //问卷查看（只能查看不能提交）
      this.$router.push('/questionnaireCheck')
    },
    toCreate(){
      this.$router.push({name:"QuestionnaireEdit",params:{title:this.createTitle}})
    }
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
  z-index: 9999;
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
  background-color: #bfbfbf;
  border-radius: 4px;
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
</style>
