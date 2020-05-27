<template>
  <div id="article">
    <div class="main">
      <div class="head">
        <h2>{{article.title}}</h2>
        <p class="articleInfo">
          <span>作者: <a href="javascript: void(0)" class="skyblue">菜王</a></span>
          <span>围观群众: {{article.pv}}</span>
          <span>更新于 {{article.updateDate | date}}</span>
        </p>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="backward">
        <router-link to="/blog/0">返回上一页</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import showdown from "showdown";
  import require from "../../api";

  //将md文档转换成html格式
  let converter = new showdown.Converter();
  let {postArticle} = require;

  export default {
    name: "Article",
    data(){
      return{
        article: {},
      }
    },
    filters: {
      date(val) {
        let time = new Date(val);
        return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
      }
    },
    components: {
    },
    mounted() {
      postArticle(this.$route.params.id).then(res => {
        if (res.data.code === 0){
          res.data.data.content = converter.makeHtml(res.data.data.content)
          this.article = res.data.data;
        }else {
          console.log(res.data.msg);
        }
      })
    }
  }
</script>

<style scoped lang="less">
  #article{
    box-sizing: border-box;
    width: 100%;
    padding: 20px 5% 0;
    .main{
      box-sizing: border-box;
      padding: 30px;
      background-color: #fff;
      .head{
        margin-bottom: 20px;
        border-bottom: 1px black solid;
        .articleInfo{
          margin-bottom: 5px;
          .skyblue{
            color: skyblue;
            &:hover{
              text-decoration: underline;
            }
          }
          span{
            margin-right: 10px;
          }
        }
      }
      .content{
        /deep/img{
          margin: 10px 0;
          max-width: 100%;
        }
        /deep/h3{
          line-height: 2em;
        }
        /deep/pre{
          padding: 16px;
          overflow: auto;
          line-height: 1.45;
          background-color: rgb(51,51,51);
          border-radius: 3px;
          code{
            color: #aaa;
            font-family: "Microsoft Sans Serif";
          }
        }
      }
      .backward{
        text-align: center;
        margin-top: 15px;
        a{
          color: skyblue;
          &:hover{
            color: yellowgreen;
          }
        }
      }
    }
  }
</style>