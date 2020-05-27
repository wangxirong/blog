<template>
  <div id="about">
    <Nav></Nav>
    <Yinshi class="Yinshi"></Yinshi>
    <div class="main">
      <div class="content">
        <section>
          <h2>关于我</h2>
          <p>毕业后曾一度消沉，不知所向。后沉迷撸码，日渐消瘦，希望有朝一日能在开辟出属于自己的一片天地。</p>
          <br>
          <p>可以通过以下方式联系到我：</p>
          <p>邮 箱 ：<a href="javascript:void(0)" class="skyblue">1486372460@qq.com</a></p>
          <p>github：<a href="https://github.com/wangxirong" target="_blank" class="skyblue">https://github.com/wangxirong</a></p>
        </section>
        <section>
          <h2>关于本站</h2>
          <p>本站建于2020年5月，主要是个人爱好写着玩的，同时也希望可以通过建站学习一些知识。</p>
          <br>
          <p>本站结构：</p>
          <p>前 端&nbsp：&nbsp<a href="javascript:void(0)" class="red">elementUI + layui + vue</a></p>
          <p>后 台&nbsp：&nbsp<a href="javascript:void(0)" class="red">nodejs + mongoDB</a></p>
          <br>
          <p>本站采用阿里云提供的服务器ESC和存储对象OSS。</p>
        </section>
        <section>
          <h2>关于版权</h2>
          <p>本站采用 「
            <a href="https://creativecommons.org/licenses/by-nc/4.0/deed.zh" target="_blank">署名-非商业性使用 4.0 国际 (CC BY-NC 4.0)</a>
            」 创作共享协议。 只要在使用时注明出处，那么您可以可以对本站所有原创内容进行转载、节选、二次创作，但是您不得对其用于商业目的。
          </p>
        </section>
        <section>
          <h2>特别说明</h2>
          <p>本站文章仅代表个人观点，和任何组织或个人无关。</p>
          <p>本站前端开发代码没有考虑对IE浏览器的兼容。</p>
          <p>用户邮箱仅作回复消息用，不对外使用。</p>
          <br>
          <img :src="img" alt="">
        </section>
      </div>
    </div>
  </div>
</template>

<script>
  import Nav from "../../components/Nav";
  import Yinshi from "../../components/Yinshi";

  export default {
    name: "About",
    data(){
      return {
        img: require("../../assets/images/bgtest/12.jpg"),
      }
    },
    components: {
      Nav, Yinshi
    },
  }
</script>

<style scoped lang="less">
  section{
    padding: 20px;
    color: #515250;
    a{
      color: skyblue;
    }
    img{
      width: 100%;
      height: 320px;
    }
  }
  .red{
    color: #bd4147;
  }
  #about{
    .Yinshi{
      margin-top: 60px;
    }
    .main{
      margin: 0 auto;
      box-sizing: border-box;
      width: 100%;
      max-width: 1380px;
      padding: 20px 5% 0;
      >.content{
        background-color: #fff;
        line-height: 21px;
        h2{
          margin-bottom: 1em;
          padding-left: 14px;
          font-weight: 700;
          border-left: 4px #6bc30d solid;
        }
        p{
          padding-left: 18px;
          line-height: 2em;
        }
      }
    }
  }
</style>