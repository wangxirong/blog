<template>
  <div id="message">
    <Nav></Nav>
    <div class="main">
      <div class="m-msgArea">
        <h2>留言板</h2>
        <p>沟通交流，拉近你我！</p>
        <RichText @richClick="handleClick"></RichText>
      </div>
      <div class="m-content">
        <ul class="parent">
          <li v-for="(parentItem,pIndex) in comments">
            <div class="p-ima" :style="{'background-image':'url('+parentItem.user.photo+')'}"></div>
            <div class="p-usr">
              <span>{{parentItem.user.user}}</span>
<!--              <span class="browser">{{parentItem.browser}}</span>-->
            </div>
            <div class="p-comment" v-html="parentItem.content"></div>
            <div class="p-info">
              <i class="layui-icon layui-icon-location" style="font-size: 14px;"></i>
<!--              <span>{{parentItem.location}}</span>-->
              <span>{{parentItem.date | date}}</span>
              <span class="reply" @click="handleReply(pIndex)"
                    v-text="parentItem.reply.ifReplyClickArr[0] === pIndex&& parentItem.reply.ifReplyClickArr[1] === undefined?'收起':'回复'"
              ></span>
            </div>
            <ul class="children" v-if="parentItem.children.length !== 0">
              <li v-for="(childrenItem, cIndex) in parentItem.children">
                <div class="p-ima" :style="{'background-image':'url('+childrenItem.user.photo+')'}"></div>
                <div class="c-user">
                  <span>{{childrenItem.user.user}}</span>
                  <span>回复</span>
                  <span>{{childrenItem.reUser}}</span>
                  <span class="comment">{{childrenItem.content}}</span>
                </div>
                <div class="c-info">
                  <i class="layui-icon layui-icon-location" style="font-size: 14px;"></i>
                  <span>{{childrenItem.location}}</span>
                  <span class="browser">{{childrenItem.browser}}</span>
                  <span>{{childrenItem.date | date}}</span>
                  <span class="reply" @click="handleReply(pIndex, cIndex)"
                        v-text="parentItem.reply.ifReplyClickArr[0] === pIndex&& parentItem.reply.ifReplyClickArr[1] === cIndex?'收起':'回复'"
                  >回复</span>
                </div>
              </li>
            </ul>
            <div v-if="parentItem.reply.ifReplyClick">
              <textarea v-model="parentItem.reply.content" name="replyContent" :placeholder="'回复【'+parentItem.reply.reUser+'】'" class="layui-textarea" style="min-height: 80px;margin-bottom: 10px"></textarea>
              <button class="layui-btn layui-btn-xs" @click="handleReplySubmit(pIndex)">提交</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import Nav from "../../components/Nav";
  import RichText from "./RichText";

  import require from "../../api";
  const {commitMessage, postIfLogin, postMessageList, commitChildMessage} = require;

  function toTwo(str) {
    return ((str+"").length === 1?"0":"")+str;
  }
  export default {
    name: "Message",
    data(){
      return {
        userInfo: null,
        //是否显示子回复框
        ifChildCommentShow: false,
        //测试数据
        comment: [
          {
            reply: {
              content: "",
              reUser: "", //父用户id
              ifReplyClick: false,
              ifReplyClickArr: [],
            },
            user: {
              _id: "5ebe15e3168ebe2264a49aa1",
              user: "king",
              photo: "http://localhost:3000/img/upload/avatar/5ebe1f518ade121ed89594a8.jpg",
            },
            content: "博主你好博主你好博主你好博主你好博主你好博主你好博主你好博主你好博主你好博主你好博主你好",
            date: new Date(),
            location: "广东省广州市",
            browser: "Chrome 80.0.3987",
            children: [
              {
                user: {
                  _id: "5ebe15e3168ebe2264a49aa2",
                  user: "luo",
                  photo: "http://localhost:3000/img/upload/avatar/5ebe1f518ade121ed89594a8.jpg",
                },
                date: new Date(),
                content: "1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好1你好!!!!",
                location: "广东省广州市",
                browser: "Chrome 79.0.3945",
                reUser: "1"
              },
              {
                user: {
                  _id: "5ebe15e3168ebe2264a49aa3",
                  user: "wang",
                  photo: "http://localhost:3000/img/upload/avatar/5ebe1f518ade121ed89594a8.jpg",
                },
                date: new Date(),
                content: "2222222你好",
                location: "北京市",
                browser: "Chrome 79.0.3945",
                reUser: "2"
              }
            ]
          },
        ],
        //留言信息
        comments: [],
        //是否可加载留言
        ifLoadComment: true,
        //留言加载完毕
        loadEnd: false,
        //已加载的留言数
        skip: 5,
        //每次加载留言数
        limit: 5
      }
    },
    methods: {
      //提交留言
      handleClick(val){
        if (!this.userInfo) {
          layui.use('layer', function(){
            let layer = layui.layer;
            layer.msg('请先登录',{
              time:3000,
              icon: 5
            });
          });
          return;
        }
        commitMessage({user: this.userInfo._id, content: val}).then(res => {
          if (res.data.code === 0) {
            layui.use('layer', function () {
              let layer = layui.layer;
              layer.msg('留言成功', {
                time: 3000,
                icon: 6
              });
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            layui.use('layer', function () {
              let layer = layui.layer;
              layer.msg(res.data.msg, {
                time: 3000,
                icon: 6
              });
            });
          }
        }).catch(() => {
          layui.use('layer', function () {
            let layer = layui.layer;
            layer.msg('未知错误, 请稍后再试', {
              time: 3000,
              icon: 2
            });
          });
        });
      },
      // 回复父留言
      handleReply(pIndex, cIndex){
        if (pIndex !== undefined){
          //点击子留言
          if (this.comments[pIndex].reply.ifReplyClickArr[0] === pIndex && this.comments[pIndex].reply.ifReplyClickArr[1] === cIndex) {
            //已被点击
            this.comments[pIndex].reply.ifReplyClick = false;
            this.comments[pIndex].reply.ifReplyClickArr = [];
          }else {
            //未被点击, 触发点击
            this.comments[pIndex].reply.ifReplyClick = true;
            this.comments[pIndex].reply.ifReplyClickArr = [pIndex, cIndex];
            this.comments[pIndex].reply.user = this.userInfo._id;
            if (cIndex === undefined) {
              this.comments[pIndex].reply.reUser = this.comments[pIndex].user.user;
            }else {
              this.comments[pIndex].reply.reUser = this.comments[pIndex].children[cIndex].user.user;
            }
          }
        }
      },
      //提交留言的留言
      handleReplySubmit(pIndex){
        let options = {
          parentId: this.comments[pIndex]._id,
          user: this.userInfo._id,
          content: this.comments[pIndex].reply.content,
          reUser: this.comments[pIndex].reply.reUser
        };
        commitChildMessage(options).then(res => {
          if (res.data.code === 0) {
            layui.use('layer', function () {
              let layer = layui.layer;
              layer.msg('留言成功', {
                time: 3000,
                icon: 6
              });
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            layui.use('layer', function () {
              let layer = layui.layer;
              layer.msg(res.data.msg, {
                time: 3000,
                icon: 6
              });
            });
          }
        })
      },
      //滚动事件, 加载留言
      handleScroll() {
        if (document.documentElement.clientHeight + window.scrollY >= document.documentElement.scrollHeight) {
          //所有留言都加载了
          if (this.loadEnd) return;
          postMessageList(this.skip,this.limit).then(res => {
            if (res.data.code === 0) {
              let comArr = res.data.data.map(item => {
                item.reply = {
                  reUser: "",
                  content: "",
                  ifReplyClick: false,
                  ifReplyClickArr: [],
                };
                return item
              });
              this.comments.push(...comArr);
              this.skip += comArr.length;
              //所有留言已加载
              if (comArr.length < this.limit) {
                this.loadEnd = true;
              }
            }else {
              console.log("留言加载", res.data.msg);
            }
          }).catch(() => {
            console.log("服务器错误")
          });
        }
      }
    },
    mounted() {
      //登陆信息
      postIfLogin().then(res => {
        this.userInfo = res.data.userInfo;
      }).catch(() => {
        alert("未知错误, 请稍后再试");
      });
      //获取留言
      postMessageList().then(res => {
        if (res.data.code === 0){
          this.comments = res.data.data.map(item => {
            item.reply = {
              reUser: "",
              content: "",
              ifReplyClick: false,
              ifReplyClickArr: [],
            }
            return item
          });
        }else{
          console.log("请求留言失败", res.data.msg);
        }
      });
      addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
      removeEventListener("scroll", this.handleScroll);
    },
    filters: {
      date(val){
        let d = new Date(val);
        let YY = toTwo(d.getFullYear()),
          MM = toTwo(d.getMonth()+1),
          DD = toTwo(d.getDate()),
          h = toTwo(d.getHours()),
          m = toTwo(d.getMinutes()),
          s = toTwo(d.getSeconds());
        return `${YY}/${MM}/${DD} ${h}:${m}:${s}`;
      }
    },
    components: {
      Nav, RichText
    }
  }
</script>
<style scoped lang="less">
  #message{
    width: 100%;
    >.main{
      margin: 0 auto;
      box-sizing: border-box;
      width: 100%;
      max-width: 1380px;
      padding: 80px 5% 0;
      >.m-msgArea{
        padding: 15px;
        text-align: center;
        background-color: #fff;
        >h2{
          font-weight: 700;
          font-size: 2rem;
        }
        >p{
          font-size: 1.25rem;
          margin: 1rem 0;
        }
      }
      >.m-content{
        span{
          line-height: 25px;
          margin-right: 5px;
          font-size: 12px;
        }
        span.comments {
          margin: 0;
          font-size: 14px;
        }
        span.browser{color: #a93838}
        span.reply{
          color: #009688;
          cursor: pointer;
          user-select: none;
        }
        margin-top: 20px;
        background-color: #fff;
        >.parent{
          >li{
            position: relative;
            padding: 10px 10px 20px 75px;
            border-bottom: 1px black dotted;
            .p-ima{
              position: absolute;
              left: 20px;
              top: 10px;
              width: 45px;
              height: 45px;
              background-size: 100% 100%;
              border-radius: 50%;
            }
            .p-usr{
              line-height: 20px;
              span:nth-child(1){
                color: #01aaed;
                font-weight: 700;
              }
            }
            .p-comment{
              margin-bottom: 10px;
            }
            .children{
              &:before {
                content: "";
                display: block;
                margin-top: 10px;
                width: 100%;
                border-bottom: 1px #ccc dotted;
              }
              li{
                position: relative;
                padding: 10px 10px 0px 75px;
                .c-user{
                  span:nth-child(1),span:nth-child(3) {
                    color: #01aaed;
                    font-weight: 700;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
