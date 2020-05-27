<template>
  <div id="container">
    <!--    <div class="main">-->
    <div class="articleList">
      <div v-for="(item, index) in articleInfo">
        <div v-if="tagsIndex === '0' || articleTags[tagsIndex] === item.tag">
          <div class="top" v-if="index === 0">置顶</div>
          <div class="title">
            <span>【{{item.type}}】</span>
            <router-link :to="'/article/'+item._id">{{item.title}}</router-link>
          </div>
          <div class="time">
            <p class="date">{{item.date | date}}</p>
            <p class="month">
              {{item.date | month}}
              <span>月</span>
            </p>
            <p class="year">{{item.date | year}}</p>
          </div>
          <div class="content">
            <router-link :to="'/article/'+item._id"><img :src="item.surface" alt=""></router-link>
<!--            文章介绍-->
            <span v-text="item.description"></span>
          </div>
          <div class="read-more"><a href="">继续阅读</a></div>
          <div class="tags">
            <i class="el-icon-edit"></i>
            <a class="tag">{{item.tag}}</a>
          </div>
          <div class="visitor">
            <div class="read">
              <i class="el-icon-view"></i>
              {{item.pv}}
            </div>
            <div class="message">
              <i class="el-icon-chat-line-round"></i>
              {{item.comment.length}}
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="aside">
      <div :class="['search', {'fixed':ifSearchFixed}]">
        <div class="search-main">
          <input type="text" placeholder="输入关键字搜索">
          <i  class="el-icon-search"></i>
        </div>
        <div class="search-article">
          <ul @mouseleave="handleLeave">
            <li v-for="(item, index) in articleTags" @mouseenter="handleEnter(index)">
              <router-link :to="'/blog/'+index">
                {{item}}
              </router-link>
            </li>
            <div class="cover" :style="{top}"></div>
          </ul>
        </div>
      </div>
      <div class="hot">
        <h5>热门文章</h5>
        <ul>
          <li v-for="(item, index) in articleHot">
            <span>{{index + 1}}</span>
            <router-link :to="'/article/'+item._id">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="recommend">
        <h5>置顶推荐</h5>
        <ul>
          <li v-if="articleHot[0]">
            <span>1</span>
            <router-link :to="'/article/'+articleHot[0]._id">{{articleHot[0].title}}</router-link>
          </li>
        </ul>
      </div>
      <div class="visitor">
        <h5>最近访客</h5>
        <ul>
          <li v-for="item in visitorInfo">
            <img :src="item.user.photo" alt="" width="60" height="60">
            <span>{{item.user.user}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--    </div>-->
  </div>
</template>

<script>
  import require from "../../api";

  const {postVisitor, postArticleShow, postArticleHot, postArticleInfo} = require;

  export default {
    name: "Container",
    data(){
      return {
        //搜索框下弹固定
        ifSearchFixed: false
        //标签信息
        // ,articleTags: ["全部文章", "个人日记", "HTML5&CSS3", "JavaScript", "ASP.NET MVC", "其他"]
        ,articleTags: []
        ,top: "0px"

        // 热门文章
        ,articleHot: []

        // 访客信息
        ,visitorInfo: []

        // 所有文章信息
        ,articleInfo: []
        //所有文章加载完毕
        ,loadEnd: false
      }
    }
    ,methods: {
      handleEnter(index){
        // this.top = e.target.offsetTop + "px";
        this.top = 40 * index + "px";
      }
      ,handleLeave(){
        this.top = this.$route.params.id*40 + "px";
      }
      ,handleSearchScroll() {
        this.ifSearchFixed = document.documentElement.scrollTop >= 950;
        //滚动事件, 加载文章
        if (document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight) {
          //所有文章都加载了
          if (this.loadEnd) return;
          postArticleShow(this.tagsIndex).then(res => {
            if (res.data.code === 0) {
              if (res.data.data.length === 0) {
                this.loadEnd = true;
                return;
              }
              this.articleInfo.push(...res.data.data);
            } else {
              console.log("文章请求失败");
            }
          }).catch();
        }
      }
    }
    ,computed: {
      //路由id
      tagsIndex(){
        return this.$route.params.id;
      }
    }
    ,watch: {
      tagsIndex(){
        postArticleShow(this.tagsIndex, true).then(res => {
          if (res.data.code === 0){
            this.articleInfo = res.data.data;
          }else{
            console.log("文章请求失败");
          }
        }).catch(() => {
          alert("文章请求未知错误, 请稍后再试");
        });
      }
    }
    ,filters: {
      date(value) {
        // 2020-05-15T05:40:55.750Z
        return value.match(/\d+-\d+-(\d+)/)[1];
      },
      month(value) {
        return value.match(/\d+-(\d+)-/)[1];
      },
      year(value) {
        return value.match(/(\d+)-/)[1];
      }
    }
    ,mounted() {
      addEventListener("scroll", this.handleSearchScroll);
      postVisitor().then(res => {
        if (res.data.code === 0){
          this.visitorInfo = res.data.data;
        }
      }).catch();
      postArticleShow(this.tagsIndex, true).then(res => {
        if (res.data.code === 0){
          this.articleInfo = res.data.data;
        }else{
          console.log("文章请求失败");
        }
      }).catch(() => {
        alert("文章请求未知错误, 请稍后再试");
      });
      postArticleHot().then(res => {
        if (res.data.code === 0) {
          this.articleHot = res.data.data;
        } else {
          console.log("热门文章请求失败");
        }
      }).catch(() => {
        alert("未知错误, 请稍后再试");
      });
      postArticleInfo().then(res => {
        if (res.data.code === 0){
          this.articleTags = ["全部文章", ...res.data.data.tags];
        }else {
          console.log("文章标签请求失败");
        }
      }).catch(() => {
        alert("未知错误, 请稍后再试");
      });
    }
    ,destroyed(){
      // removeEventListener(this.handleSearchScroll)
      removeEventListener("scroll", this.handleSearchScroll)
    }
  }
</script>

<style scoped lang="less">
  #container {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 80px 5% 0;
    width: 100%;
    max-width: 1380px;

    /*border: 2px black solid;*/
    //清除浮动样式
    &::after {
      content: "";
      display: block;
      visibility: hidden;
      clear: both;
      height: 0;
    }
    .articleList {
      box-sizing: border-box;
      float: left;
      width: calc(100% - 300px - 20px);
      >div>div {
        position: relative;
        overflow: hidden;
        padding: 20px 30px 25px 30px;
        margin-bottom: 20px;
        background-color: #fff;

        .top {
          position: absolute;
          left: -22px;
          top: 6px;
          width: 74px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          font-size: 14px;
          background-color: #ff5722;
          color: #fff;
          user-select: none;
          transform: rotate(-45deg);
        }

        .title {
          padding: 5px 130px 5px 0;
          line-height: 30px;
          border-bottom: 2px #e8e9e7 solid;

          span {
            font-size: 16px;
            font-weight: 400;
            display: inline-block;
            vertical-align: bottom;
            color: #2ea7e0;
          }

          a {
            color: #212220;

            &:hover {
              text-decoration: underline;
              color: #6bc30d;
            }
          }
        }

        .time {
          position: absolute;
          right: 10px;
          top: 10px;
          background-color: #fff;
          padding: 0 20px 5px 20px;
          line-height: 32px;

          > .date {
            text-align: center;
            font-weight: 700;
            font-size: 40px;
            color: #6bc30d;
            position: relative;
            top: 2px;
          }

          > .month, .year {
            display: inline-block;
            margin-left: 10px;
            font-size: 18px;
            color: #989997;

          }
        }

        .content {
          margin-top: 20px;
          &::after {
            content: ".";
            display: block;
            visibility: hidden;
            clear: both;
            height: 0;
          }
          > a {
            position: relative;
            display: block;
            width: 300px;
            height: 180px;
            float: left;
            overflow: hidden;
            margin-right: 20px;
            /*hover时的动画*/
            &::before{
              content: "";
              display: block;
              position: absolute;
              left: -75px;
              width: 50px;
              height: 180px;
              box-shadow: 0 0 25px inset rgba(255,255,255,.3);
              transform: skewX(-15deg);
            }
            &:hover:before{
              transition: left .5s .7s;
              left: 330px;
            }
            > img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .read-more {
          position: relative;
          margin-top: 20px;
          height: 40px;
          line-height: 40px;

          > a {
            font-weight: bold;
            font-size: 14px;
            line-height: 40px;
            color: #383937;

            &:hover {
              text-decoration: underline;
              color: #6bc30d;
            }
          }

          &:after {
            content: "";
            /*display: inline-block;*/
            position: absolute;
            top: 20px;
            left: 100px;
            right: 0;
            height: 1px;
            background-color: #d0d0d0;
          }
        }

        .tags {
          float: left;

          > i {
            font-size: 16px;
          }

          > .tag {
            font-size: 12px;
            padding: 2px 5px;
            background-color: #f1f2f0;
            color: #787977;
            margin: 6px;

            &:hover {
              color: #fff;
              background-color: #6bc30d;
              text-decoration: none;
            }
          }
        }

        .visitor {
          float: right;
          color: #787977;

          > .read, .message {
            display: inline-block;
            margin-right: 30px;
            font-size: 14px;

          }

        }
      }
    }
    .aside {
      box-sizing: border-box;
      float: right;
      width: 300px;
      /*border: 1px pink solid;*/

      h5 {
        margin: 10px 20px;
        padding: 5px;
        line-height: 30px;
        font-weight: 400;
        border-bottom: 1px solid #e8e9e7;
        color: #383937;
        position: relative;
        font-size: 18px;
      }

      .search {
        background-color: #fff;

        &.fixed {
          position: fixed;
          z-index: 5;
          animation: searchMove .7s 1;
        }

        @keyframes searchMove {
          0% {
            top: -500px
          }
          40% {
            top: 80px
          }
          70% {
            top: 60px
          }
          100% {
            top: 80px
          }
        }

        .search-main {
          position: relative;
          box-sizing: border-box;
          padding: 20px;
          width: 300px;
          height: 80px;
          background-color: grey;

          input {
            box-sizing: border-box;
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            text-indent: 2em;
            border-radius: 40px;
            outline: none;
            border: none;
          }

          .el-icon-search {
            position: absolute;
            right: 40px;
            top: 29px;
            width: 22px;
            height: 22px;
            font-size: 24px;
            line-height: 22px;
            color: #787977;
            cursor: pointer;

            &:hover {
              color: #6bc30d;
            }
          }
        }

        .search-article {
          ul {
            position: relative;
            margin-top: 20px;
            padding-bottom: 20px;
            width: 300px;

            li {
              position: relative;
              width: 100%;
              height: 39px;
              border-bottom: 1px solid #f8f9f7;

              a {
                display: block;
                box-sizing: border-box;
                width: 100%;
                padding: 0 50px;
                line-height: 39px;
                font-size: 14px;
                color: #787977;

                &:hover {
                  background-color: rgba(186, 254, 210, 0.2);
                  text-decoration: none;
                }
              }


            }
            .cover {
              position: absolute;
              right: 0;
              height: 40px;
              border-right: 5px #484947 solid;
              transition: top .3s;
            }
          }
        }
      }

      .hot, .recommend, .visitor {
        background-color: #fff;
        margin-top: 20px;
        padding-bottom: 20px;

        a {
          color: #787977;

          &:hover {
            text-decoration: underline;
            color: #6bc30d;
          }
        }

        > ul {
          padding: 0 20px;
        }
      }

      .hot, .recommend {
        > ul {
          > li {
            display: block;
            line-height: 32px;
            position: relative;
            margin: 3px 0;
            counter-increment: nums;
            padding-left: 30px;
            overflow: hidden;
            word-wrap: normal !important;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #515250;

            > span {
              width: 22px;
              height: 22px;
              line-height: 22px;
              text-align: center;
              position: absolute;
              left: 0;
              top: 5px;
              border-radius: 100%;
              background-color: #edefee;
              text-shadow: 0 1px 0 rgba(255, 255, 255, .5);
            }


          }

          & li:nth-child(1) span {
            background-color: #e24d46;
            color: #fff;
          }

          & li:nth-child(2) span {
            background-color: #2ea7e0;
            color: #fff;
          }

          & li:nth-child(3) span {
            background-color: #6bc30d;
            color: #fff;
          }
        }
      }

      .visitor {
        > ul {
          text-align: center;

          li {
            display: inline-block;
            position: relative;
            width: 65px;
            height: 65px;
            vertical-align: top;
            font-size: 12px;

            > img {
              cursor: pointer;
            }

            > span {
              position: absolute;
              bottom: 5px;
              left: 0;
              right: 0;
              margin: auto;
              width: 60px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background-color: rgba(0, 0, 0, .2);
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }

        }
      }
    }

    /*TODO 响应式样式*/
    @media(max-width: 1024px){
      .articleList{
        width: 100%;
      }
      .aside {
        display: none;
      }
    }

  }

</style>