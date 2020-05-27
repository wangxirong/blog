<template>
  <div id="app">
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
  import Footer from "./components/Footer";

  export default {
    name: "App",
    components: {
      Footer
    }
  }
</script>
<style lang="less" >
  @import "assets/css/reset.less";
  @import "assets/css/font.css";

  #app{
    background: url("./assets/images/bg.jpg") center/100% 100% fixed;
  }
</style>
