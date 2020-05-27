<template>
  <div id="nav">
    <div class="nav-main">
      <div :class="['menuBtn', {menuClick: ifMenuClick}]" @click="handleMenuClick">
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div class="n-m-logo">Mr.wang</div>
      <div class="n-m-login">
        <!--登陆状态显示的界面-->
        <el-popover
          v-if="userInfo"
          placement="top-start"
          width="150"
          trigger="hover"
        >
          <div>欢迎登陆:
            <span :style="{
                float: 'right',
                width: '80px',
                color: 'blue',
                'white-space': 'nowrap',
                overflow: 'hidden',
                'text-overflow': 'ellipsis'}"
            >{{userInfo.user}}
              </span>
          </div>
          <el-button type="primary" size="mini" plain @click="avatarDialogVisible = true">修改头像</el-button>
          <br>
          <el-button type="danger" plain size="mini" @click="handleLogout">退出登录</el-button>
          <div slot="reference" class="photo">
            <img :src="userInfo.photo" alt="">
          </div>
        </el-popover>
        <!--未登录状态显示的界面-->
        <div v-else>
          <el-button type="primary" size="small" @click="loginDialogVisible = true">登陆</el-button>
          <el-button type="success" size="small" @click="registerDialogVisible = true">注册</el-button>
        </div>
        <Register :dialogVisible="registerDialogVisible" @handleClose="closeDialog('register')"></Register>
        <Login :dialogVisible="loginDialogVisible" @handleClose="closeDialog('login')"></Login>
        <Avatar :dialogVisible="avatarDialogVisible" @handleClose="closeDialog('avatar')"></Avatar>
      </div>
      <div class="n-m-content" >
            <ul :class="['list'+listNum, {menuClick: !ifMenuClick}]">
                <li><router-link to="/">首页</router-link></li>
                <li><router-link to="/blog/0">博客</router-link></li>
                <li><router-link to="/message">留言</router-link></li>
                <li><router-link to="/diary">日记</router-link></li>
                <li><router-link to="/link">友链</router-link></li>
                <li><router-link to="/about">关于</router-link></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
  import Avatar from "./Avatar";
  import Register from "./Register";
  import Login from "./Login";

  import require from "../api";
  const {postIfLogin, postLogout} = require;

  export default {
    name: "Nav",
    data() {
      return {
        routerList: ["Home","Blog","Message","Diary","Link","About"],
        //菜单按钮是否被点击
        ifMenuClick: false,

        userInfo: {
          ifLogin: false,
          photo: "",
          user: "",
        },
        avatarDialogVisible: false,
        registerDialogVisible: false,
        loginDialogVisible: false
      }
    }
    ,components: {
      Register,Avatar,Login
    }
    ,methods: {
      handleMenuClick(){
        this.ifMenuClick = !this.ifMenuClick;
      },
      //退出登录
      handleLogout() {
        postLogout().then(res => {
          if (res.data.code === 0) {
            this.$message({
              message: '已成功退出登陆',
              type: 'success',
              duration: 2000
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            this.$message({
              message: res.data.msg,
              type: 'warning',
              duration: 2000
            });
          }
        }).catch(() => {
          this.$message({
            message: '未知错误',
            type: 'error',
            duration: 2000
          });
        });
      },
      //关闭对话框
      closeDialog(dialogName){
        if (dialogName === "register") {
          this.registerDialogVisible = false;
        } else if (dialogName === "login"){
          this.loginDialogVisible = false;
        } else if (dialogName === "avatar"){
          this.avatarDialogVisible = false;
        }
      }
    }
    ,mounted() {
      postIfLogin().then(res => {
        if (res.data.userInfo) {
          this.userInfo = res.data.userInfo;
        }else {
          this.userInfo = null;
        }
      });
    }
    ,computed: {
      listNum() {
        return this.routerList.indexOf(this.$route.name);
      }
    }
  }
</script>

<style scoped lang="less">
  #nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 250px;
    height: 60px;
    background-color: rgba(255,255,255,.7);
    z-index: 999;
    > .nav-main {
      box-sizing: border-box;
      margin: 0 auto;
      padding: 0 5%;
      width: 100%;
      max-width: 1380px;
      height: 60px;
      > .n-m-logo {
        display: inline-block;
        text-align: center;
        line-height: 60px;
        font-size: 28px;
        font-family: BarbaraHand;
        cursor: pointer;
        color: #6cccd8;
        z-index: -1;
      }
      > .n-m-content {
        float: right;
        margin: 0 5%;
        user-select: none;
        > ul {
          display: flex;
          line-height: 60px;
          text-align: center;
          > li {
            position: relative;
            flex: 1;
            width: 95px;
            height: 60px;
            line-height: 60px;
            > a {
              display: block;
              width: 100%;
              height: 100%;
              color: #000;
              transition: color .3s;
              &:after {
                display: block;
                content: "";
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                margin: 0 auto;
                width: 0;
                border-bottom: 2px #6bc30d solid;
                transition: width .3s;
              }
              &:hover {
                color: #6bc30d;
                &:after {
                  width: 90%;
                }
              }
            }
          }
          &.list1 li:nth-child(2),
          &.list2 li:nth-child(3),
          &.list3 li:nth-child(4),
          &.list4 li:nth-child(5),
          &.list5 li:nth-child(6) {
            a {
              color: #6bc30d;
              &:after {
                width: 90%;
              }
            }
          }
        }
      }
      > .n-m-login {
        float: right;
        line-height: 60px;
        .photo{
          float: right;
          margin: 10px 20px 0 0;
          width: 40px;
          height: 40px;
          line-height: 40px;
          img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

      }
      >.menuBtn {
        display: none;
      }
      @media (max-width: 1024px){
        > .n-m-logo{
          position: absolute;
          right: 0;
          left: 0;
          margin: auto;
        }
        > .n-m-content {
          position: absolute;
          top: 60px;
          left: 0px;
          margin: 0;
          width: 100%;
          background-color: rgba(255,255,255,.7);
          >ul {
            &.menuClick{
              opacity: 0;
              width: 0;
              height: 0;
            }
            display: block;
            padding: 0 5px;
            width: 100%;
            height: 306px;
            overflow: hidden;
            transition: .6s;
            >li{
              width: 100%;
              height: 50px;
              border-bottom: 1px #e8e9e7 solid;
              >a:hover {
                &:after {
                  width: 100%;
                }
              }
            }
            &.list1 li:nth-child(2),
            &.list2 li:nth-child(3),
            &.list3 li:nth-child(4),
            &.list4 li:nth-child(5),
            &.list5 li:nth-child(6) {
              a:after {
                  width: 100%;
                }
            }
          }
        }
        >.menuBtn {
          display: block;
          position: absolute;
          top: 10px;
          width: 40px;
          height: 40px;
          padding-top: 7px;
          box-sizing: border-box;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.1);
          transition: .5s;
          cursor: pointer;
          z-index: 999;
          &:hover {
            background-color: #6bc30d;
          }
          > p {
            margin: 5px 7px;
            width: 26px;
            height: 2px;
            background-color: #fff;
            transition: .5s;
          }
        }
        >.menuClick{
          &>p:nth-child(1){
            transform: rotate(45deg) translate(5px,5px);
          }
          &>p:nth-child(2){
            transform: rotate(-45deg);
          }
          &>p:nth-child(3) {
            display: none;
          }
        }
      }
    }
  }
</style>