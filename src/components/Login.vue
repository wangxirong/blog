<template>
  <div id="login">
    <el-dialog
      title="登陆"
      :visible.sync="dialogVisible"
      center
      :modal-append-to-body="false"
      :append-to-body="true"
      top="10vh"
      width="420px"
      :close-on-click-modal="false"
      :before-close="handleLoginClose"
    >
      <el-form :model="form" status-icon :rules="rules" ref="form" label-width="80px">
        <el-form-item label="用户名" prop="user">
          <el-input type="text" v-model="form.user" autocomplete="on" clearable></el-input>
        </el-form-item>
        <el-form-item label="密　码" prop="pwd">
          <el-input show-password v-model="form.pwd"  autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="btn" type="primary" plain round @click="handleLogin('form')">登 陆</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import require from "../api/index";
  const {getCheckUsername, postLogin} = require;

  export default {
    name: "Login",
    data() {
      return {
        //登陆按钮节流控制
        clickCooling: false,
        //表单信息
        form: {
          user: "",
          pwd: ""
        },
        // 表单验证规则
        rules: {
          //用户名验证
          user: [
            {required: true, message: "请输入用户名", trigger: "blur"},
            {
              validator: (rule, value, cb) => {
                if (/^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,7}$/.test(value)) {
                  //用户名格式符合, 验证用户名是否存在
                  getCheckUsername(this.form.user).then(res => {
                    if (res.data.code === 0){
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
          pwd: {required: true, message: "请输入密码", trigger: "blur"},
        }
      }
    },
    props: ["dialogVisible"],
    methods: {
      //登陆
      handleLogin(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.clickCooling) return;
            this.clickCooling = true;
            postLogin(this.form).then(res => {
              if (res.data.code === 0) {
                //关闭登陆对话框
                this.$emit("handleClose");
                this.$message({
                  message: '登陆成功',
                  type: 'success',
                  duration: 2000
                });
                setTimeout(() => {
                  window.location.reload();
                }, 800)
              } else {
                this.$message({
                  message: res.data.msg,
                  type: 'error',
                  duration: 2000
                });
              }
              setTimeout(() => {
                this.clickCooling = false;
              }, 3000);
            }).catch(() => {
              this.$message({
                message: '未知错误',
                type: 'error',
                duration: 2000
              });
              setTimeout(() => {
                this.clickCooling = false;
              }, 3000);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //登陆对话框关闭前操作
      handleLoginClose(done) {
        this.$refs["form"].resetFields();
        this.$emit("handleClose");
      }
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
      .el-input {
        width: 92%;
      }
    }
    .btn{
      width: 90%;
    }
  }
</style>