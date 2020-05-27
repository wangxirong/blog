<template>
  <div id="register">
    <el-dialog
      title="注册"
      :visible.sync="dialogVisible"
      center
      :modal-append-to-body="false"
      :append-to-body="true"
      top="10vh"
      width="420px"
      @open="VCodeRefresh"
      :close-on-click-modal="false"
      :before-close="handleRegisterClose"
    >
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
        <el-form-item label="用户名" prop="user">
          <el-input type="text" v-model="form.user" autocomplete="on" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input show-password v-model="form.pwd"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="form.checkPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="VCode">
          <el-input class="VCode" v-model="form.VCode" autocomplete="on"></el-input>
          <!--      验证码图片     -->
          <div class="svg" v-html="VCode.img"></div>
          <div class="refresh" @click="VCodeRefresh">{{VCode.msg}}</div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn" type="success" plain round @click="handleRegister('form')" width="300px">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import require from "../api/index";
  const {postRegisterVCode, postRegister, postRegisterCheckVCode, getCheckUsername, postLogin} = require

  export default {
    name: "Register",
    data(){
      return {
        // 验证码内容
        VCode: {
          ifCooling: false,  //是否处于冷却中
          img:"",            //验证码图片
          time: 0,           //冷却倒计时
          msg: ""            //刷新提示文字
        },
        form: {
          user: "",
          pwd: "",
          checkPwd: "",
          VCode: ""   //验证码
        },
        rules: {
          //用户名验证
          user: [
            {required: true, message: "请输入用户名", trigger: "blur"},
            {
              validator: (rule, value, cb) => {
                if (/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(value)) {
                  // 用户名格式符合, 验证用户名是否存在
                  getCheckUsername(this.form.user).then(res => {
                    if (res.data.code === 1){
                      cb();
                    }else {
                      cb(new Error(res.data.msg));
                    }
                  }).catch(() => {
                    cb(new Error("未知错误"));
                  })
                } else {
                  //格式有误
                  cb("2-7位 字母 数字 _ - 中日韩文");
                }
              },
              trigger: ["blur"]
            }
          ],
          //密码验证
          pwd: {
            validator: (rule, value, cb) => {
              if (value === "") {
                cb(new Error("请输入密码"));
              }else if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)){
                cb();
              } else {
                cb(new Error("6-18位, 不允许出现奇怪的字符"));
              }
              this.form.checkPwd && this.$refs.form.validateField("checkPwd");
            },
            required: true,
            trigger: ["blur"]
          },
          //二次确认密码
          checkPwd: {
            validator: (rule, value, cb) => {
              if(value === ""){
                cb(new Error("请再次输入密码"));
              }else if (value === this.form.pwd) {
                cb();
              }else {
                cb(new Error("密码不一致"))
              }
            },
            required: true,
            trigger: ["blur"]
          },
          //验证码
          VCode: {
            validator: (rule, value, cb) => {
              if (!value) {
                cb(new Error("请输入验证码"));
              }else {
                postRegisterCheckVCode(value).then(res => {
                  if (res.data.code === 0){
                    cb()
                  } else {
                    cb(new Error("验证码错误"));
                  }
                }).catch(() => {
                  cb(new Error("未知错误"));
                })
              }
            },
            required: true,
            trigger: "blur",}
        },
      }
    },
    props: ["dialogVisible"],
    mounted() {

    },
    methods: {
      //注册
      handleRegister(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            postRegister(this.form).then(res => {
              if (res.data.code === 0) {
                //注册成功,关闭对话框
                this.$emit("handleClose");
                /*注册完成后自动登录*/
                postLogin(this.form);
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  duration: 2000
                });
                setTimeout(()=>{
                  window.location.reload();
                }, 1000);
              }else {
                this.$message({
                  message: res.data.msg,
                  type: 'warning',
                  duration: 2000
                });
              }
            })
              .catch((e) => {
                this.$message({
                  message: '未知错误',
                  type: 'error'
                });
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //对话框关闭前操作
      handleRegisterClose(done) {
        this.$confirm('注册未完成,离开前是否保存信息',"确认信息",{
          distinguishCancelAndClose: true,
          confirmButtonText: '保存',
          cancelButtonText: '放弃修改'
        })
          .then(data => {
            //保存修改并退出对话框
            this.$emit("handleClose");
          })
          .catch((action) => {
            //放弃修改
            if (action === "cancel") {
              //清空并关闭对话框
              this.$refs["form"].resetFields();
              this.$emit("handleClose");
            }
            //点x什么都不做, 关闭确认信息框
          });
      },
      //刷新验证码
      VCodeRefresh(){
        if (this.VCode.ifCooling) return;
        this.VCode.ifCooling = true;
        postRegisterVCode().then(res => {
          this.VCode.img = res.data.data;
          this.VCode.time = res.data.time/1000 | 0;
          this.VCode.msg = (this.VCode.time--) + "s可刷新";
          let timer = setInterval(() => {
            this.VCode.msg = this.VCode.time + "s可刷新";
            if (this.VCode.time-- <= 0) {
              clearInterval(timer);
              this.VCode.msg = "刷新";
              this.VCode.ifCooling = false;
            }
          }, 1000);
        })
      },

    }
  }
</script>

<style scoped lang="less">

  /deep/ .el-dialog {
    user-select: none;
    .el-dialog__body {
      padding: 0 15px 0 20px;
      .el-input.VCode {
        float: left;
        width: 35%;
      }

      div.svg {
        float: left;
        display: block;
        margin: 0 1%;
        width: 27%;
        background-color: #ccc;
        /*border: 1px red solid;*/
        /*样式穿透*/

        /deep/ svg {
          width: 100%;
          height: 100%;
        }
      }

      div.refresh {
        float: right;
        margin-right: 6%;
        width: 30%;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: blue;
        }
      }

      .el-input {
        width: 92%;
      }
    }
    .btn{
      width: 90%;
    }
  }
</style>