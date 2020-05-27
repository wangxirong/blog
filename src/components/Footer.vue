<template>
  <div id="footer">
    <div class="icon">
      <a href="javascript: void(0)">
        <i class="layui-icon layui-icon-login-weibo"></i>
      </a>
      <a href="" title="1486372460">
        <i class="layui-icon layui-icon-login-qq"></i>
      </a>
      <a href="" title="1486372460@qq.com">
        <i class="layui-icon layui-icon-find-fill"></i>
      </a>
      <a href="javascript: void(0)">
        <i class="layui-icon layui-icon-login-wechat"></i>
      </a>
    </div>
    <div class="content">
      <p>Copyright © 2019-2021 菜王 All Rights Reserved V.1.0.0</p>
      <p>备案号: <a href="http://www.beian.miit.gov.cn/">粤ICP备19150941号</a></p>
    </div>
  </div>
</template>
<script>
  export default {
    name: "Footer"
  }
</script>
<style scoped lang="less">
  #footer{
    box-sizing: border-box;
    margin-top: 40px;
    width: 100%;
    height: 100%;
    padding: 10px 5%;
    background-color: #212220;
    text-align: center;
    .icon{
         padding: 20px 0 5px;
         a{
           display: inline-block;
           margin-left: 15px;
           width: 30px;
           height: 30px;
           line-height: 30px;
           border-radius: 50%;
           transition: .3s;
           &:hover{
             background-color: #06a2c9;
           }
           i{
             font-size: 30px;
             border-radius: 50%;
             color: rgba(255,255,255,.5);
           }
         }
       }
    .content{
      p{
        color: #565755;
      }
      a{
        color: white;
      }
    }
  }
</style>