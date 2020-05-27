<template>
  <div id="blog">
      <Nav></Nav>
      <Container></Container>
  </div>

</template>

<script>
  import Nav from "../../components/Nav";
  import Container from "./Container";

  export default {
    name: "Blog",
    data(){
      return {

      }
    },
    methods: {

    },
    components: {
      Nav, Container
    }
  }
</script>

<style scoped lang="less">
</style>