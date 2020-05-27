<template>
  <div id="home">
    <div :class="['menu-area', {'menu-click': ifMenuClick}]">
      <div class="menuBtn" @click="handleMenuClick">
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div class="menu-nav">
        <div class="nav-option">
          <router-link to="/">首页</router-link>
          <router-link to="/blog/0">博客</router-link>
          <router-link to="/message">留言</router-link>
        </div>
      </div>
      <div class="cover"></div>
    </div>

    <section class="section1">
      <div class="cover"></div>
      <div class="description">
        <h2>菜 王</h2>
        <h3>一个学习前端的私人博客网站</h3>
        <router-link to="/blog/0">Enter Blog</router-link>
      </div>
      <div class="slipBtn">
        <div class="myIcon-down" @click="handleSlide(winTop)"></div>
      </div>
    </section>
    <section class="section2"></section>
    <section class="section3"></section>
  </div>
</template>
<script>
  import Nav from '../components/Nav'

  export default {
    name: 'Home',
    data(){
      return {
        ifMenuClick: false,
      }
    },
    methods: {
      handleMenuClick(){
        this.ifMenuClick = !this.ifMenuClick;
      },
      handleSlide(height){
        console.log("1", this.winTop);
        return () => {
          console.log("2", this.winTop);
          height += 2;
          window.scroll(0, height);
          if (height <= window.innerHeight) {
            requestAnimationFrame(this.handleSlide(height));
          }
        }
      }
    },
    computed: {
      winTop(){
        return document.documentElement.scrollTop;
      }
    },
    components: {
      Nav
    }
  }
</script>
<style scoped lang="less">
  section{
    /*窗口宽 - 滚动条宽*/
    /*width: calc(100vw - 16px);*/
    height: 100vh;
  }
  #home{
    user-select: none;
    /*height: 3000px;*/
    /* 避免使用100vw产生横滚动条*/
    overflow: hidden;
    .menu-area{
      >.menuBtn {
        position: fixed;
        right: 55px;
        top: 40px;
        width: 40px;
        height: 40px;
        padding-top: 7px;
        box-sizing: border-box;
        border-radius: 50%;
        background: rgba(0,0,0,0.1);
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
      >.menu-nav {
        position: fixed;
        right: -70%;
        width: 50vw;
        height: 100vh;
        transition: .3s;
        z-index: 998;
        > .nav-option {
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
          right: 18vw;
          height: 30vh;
          > a {
            width: 100%;
            text-align: center;
            font-size: 20px;
            color: #686967;
            transition: .5s;
            &:after {
              content: "";
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              display: block;
              width: 0px;
              border-bottom: 2px #6bc30d solid;
              transition: .5s;
            }
            &:hover {
              color: #6bc30d;
              &:after {
                width: 70px;
              }
            }
          }
        }
        /*倾斜白色背景*/
        &:before {
          content: "";
          display: block;
          height: 100vh;
          background-color: #f8f9f7;
          transform: skew(-12deg);
        }
      }
      >.cover{
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);
        z-index: -100;
      }
      /*  点击菜单后的样式  */
      &.menu-click{
        >.menuBtn{
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
        >.menu-nav{
          right: -18%;
        }
        >.cover{
          z-index: 100;
        }
        /*  770px 处menu点击后的断点*/
        @media all and (max-width: 770px){
          >.menu-nav{
            /*滚动条偏差*/
            right: -8px;
            >.nav-option{
              right: 2vw;
            }
            &::before{
              transform: skew(0);
            }
          }
        }

      }

    } /*  menu-area end */
    >.section1{
      position: relative;
      background: url("../assets/images/bgtest/13.jpg") center/100% 100%;
      >.cover{
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);
      }
      >.description {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 100%;
        height: 150px;
        color: #fff;
        text-align: center;
        >h2{
          font-size: 28px;
          font-weight: normal;
        }
        >h3{
          padding: 20px 0 30px;
          font-size: 15px;
          font-weight: normal;
          letter-spacing: .5em;
        }
        >a {
          position: relative;
          display: inline-block;
          width: 106px;
          height: 38px;
          background-color: #1e9fff;
          line-height: 38px;
          color: #fff;
          border-radius: 5%;
          &:before {
            content: "";
            opacity: 0;
            display: block;
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.2);
            transition: .5s;
          }
          &:hover::before{
            opacity: 1;
          }
        }
      }
      >.slipBtn{
        position: absolute;
        left: 0;
        right: 0;
        bottom: 30px;
        margin: auto;
        width: 48px;
        height: 48px;
        z-index: 99;
        border-radius: 50%;
        cursor: pointer;
        transition: .5s;
        &:hover{
          background-color: #6bc30d;
        }
        >.myIcon-down{
          width: 18px;
          height: 18px;
          border-left: 5px #fff solid;
          border-bottom: 5px #fff solid;
          transform: translate(12px,8px) rotate(-45deg);
        }
      }
    }
    >.section2 {
      background: url("../assets/images/bgtest/10.jpg") center/cover;
    }
    >.section3 {
      background: url("../assets/images/bgtest/12.jpg") center/cover;
    }

  }

</style>