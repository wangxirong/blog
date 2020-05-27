<template>
  <div id="richText">
    <textarea id="demo" style="display: none;" placeholder="hh"></textarea>
    <button type="button" class="layui-btn" @click="handleClick">提交留言</button>
  </div>
</template>

<script>
  export default {
    name: "RichText",
    data(){
      return {
        layedit: null,
        index: 0
      }
    },
    methods: {
      handleClick(){
        this.$emit("richClick", this.layedit.getContent(this.index))
      }
    },
    mounted() {
      layui.use('layedit', () => {
        this.layedit = layui.layedit;
        this.index = this.layedit.build('demo', {tool: ["face"], height: 150}); //建立编辑器
      });
    }
  }
</script>

<style scoped lang="less">
  #richText{
    text-align: left;
    button{
      margin-top: 15px;
    }
  }
</style>