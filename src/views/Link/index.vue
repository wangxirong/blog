<template>
  <div id="link">
    <Nav></Nav>
    <Yinshi class="Yinshi"></Yinshi>
    <div class="main">
      <section>
          <h2>链接申请说明</h2>
          <p>
            <i class="layui-icon layui-icon-close"></i>经常宕机&nbsp;
            <i class="layui-icon layui-icon-close"></i>不合法规&nbsp;
            <i class="layui-icon layui-icon-close"></i>插边球站&nbsp;
            <i class="layui-icon layui-icon-close"></i>红标报毒&nbsp;
            <i class="layui-icon layui-icon-ok"></i>原创优先&nbsp;
            <i class="layui-icon layui-icon-ok"></i>技术优先
          </p>
          <br>
          <p>交换友链可在留言板留言.本站链接如下：</p>
          <p>名称：菜王</p>
          <p>网址：http://www.kingxr.top</p>
          <p>图标：http://www.kingxr.top/images/defaultPhoto.jpeg</p>
          <p>描述：菜王的私人博客</p>
          <br>
          <p>申请提交后若无其它原因将在24小时内审核,如超过时间还未通过,请私信我.(各种额外因素)</p>
    </section>
      <ul class="link-list">
        <li v-for="item in linkList">
          <a :href="item.url" target="_blank">
            <img :src="item.photo" alt="">
            <h3>{{item.name}}</h3>
            <div>{{item.description}}</div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import Nav from "../../components/Nav";
  import Yinshi from "../../components/Yinshi";
  import Footer from "../../components/Footer";
  export default {
    name: "Link",
    data(){
      return {
        linkList: [
          {
            name: "菜王",
            url: "http://www.kingxr.top",
            photo: "http://www.kingxr.top/images/defaultPhoto.jpeg",
            description: "菜王·一个学习前端的私人博客网站"
          },
        ]
      }
    },
    components: {
      Nav, Yinshi
    }
  }
</script>
<style scoped lang="less">
  #link {
    .Yinshi {
      width: 100%;
      margin-top: 60px;
    }
    .main {
      margin: 0 auto;
      box-sizing: border-box;
      width: 100%;
      max-width: 1380px;
      padding: 20px 5% 0;
      section {
        padding: 20px;
        background-color: #fff;
        line-height: 21px;
        color: #515250;
        h2 {
          margin-bottom: 1em;
          padding-left: 14px;
          font-weight: 700;
          border-left: 4px #6bc30d solid;
        }
        p {
          padding-left: 18px;
          line-height: 2em;
        }
      }
      > .link-list {
        position: relative;
        left: -10px;
        margin-top: 20px;
        width: calc(100% + 20px);
        //清除浮动样式
        &::after {
          content: "";
          display: block;
          visibility: hidden;
          clear: both;
          height: 0;
        }
        > li {
          float: left;
          box-sizing: border-box;
          width: 25%;
          padding: 0 10px 20px;
          >a{
            position: relative;
            top: 0;
            display: block;
            box-sizing: border-box;
            padding: 20px;
            height: 154px;
            background-color: #fff;
            transition: .3s;
            img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
              vertical-align: baseline;
            }
            h3{
              display: inline-block;
              padding: 10px 0 9px 20px;
              overflow: hidden;
            }
            div{
              margin-top: 14px;
            }
            &:hover{
              top: -3px;
              box-shadow: 5px 5px 10px rgba(255,255,255,.5);
            }
          }
        }
        @media screen and (max-width: 1024px){
          >li{
            width: 50%;
          }
        }
        @media screen and (max-width: 768px){
          >li{
            width: 100%;
          }
        }
      }

    }
  }
</style>