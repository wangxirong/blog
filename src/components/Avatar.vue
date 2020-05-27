<template>

  <el-dialog
    title="头像上传"
    :visible.sync="dialogVisible"
    center
    :modal-append-to-body="false"
    :append-to-body="true"
    top="10vh"
    width="420px"
    :close-on-click-modal="false"
    :before-close="beforeClose"
  >
    <el-upload
      ref="upload"
      class="avatar-uploader"
      action="http://localhost:3000/upload/Avatar"
      :show-file-list="false"
      :on-change="handleChange"
      :before-upload="beforeAvatarUpload"
      :on-success="handleAvatarSuccess"
      :with-credentials="true"
      :auto-upload="false">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <el-button slot="footer" class="uploadBtn" type="success" plain round @click="submitUpload">确认上传头像</el-button>
  </el-dialog>

</template>

<script>
  export default {
    name: "Avatar",
    data(){
      return {
        imageUrl: '',
      }
    },
    props: ["dialogVisible"],
    methods: {
      handleChange(file){
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleAvatarSuccess(res, file) {
        if (res === "OK") {
          setTimeout(() => {
            window.location.reload();
          }, 800);
        }
      },
      beforeAvatarUpload(file) {
        const isJPG =  /^image\/(jpeg|png|gif|jpg)$/i.test(file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 jpeg|png|gif|jpg 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      beforeClose(){
        this.$emit("handleClose");
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>