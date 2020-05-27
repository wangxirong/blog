/*
* 属性名
*   user  用户名
*   pwd   密码
*   VCode 验证码
*   limit 数据上限条数
*
* */
import axios from "axios";

//配置默认的参数
axios.defaults.baseURL = 'http://localhost:3000';//默认访问地址
// axios.defaults.baseURL = 'http://www.kingxr.top';//默认访问地址
axios.defaults.withCredentials = true; //跨域允许携带cookie
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"; //设置POST请求格式

export default {

  //获取文章信息
  postArticleInfo(){
    return axios.post("/article/getInfo")
  },
  postArticleHot(limit=8){
    return axios.post('/article/getHot',{limit});
  },
  //获取文章列表
  postArticleShow:(function(){
    let skip = 0;
    let limit = 5;
    return function(index=0,ifFresh = false){
      if(ifFresh){
        skip = 0;
        limit = 5;
      }
      let tag = ["","个人笔记","HTML&Css","JavaScript","Node","Vue","Other"][index];
      let data = {skip,limit,tag};
      skip += limit;
      return axios.post('/article/getShow',data);
    }
  })(),
  //获取单篇文章信息
  postArticle(_id){
    return axios.post('/article', {_id});
  },
  //获取延伸阅读
  postArticleExtend(tag){
    return axios.post("/article/extend",{tag});
  },
  //搜索文章
  postArticleSearch(keywords){
    return axios.post("/article/search",{keywords});
  },




  //获取验证码图片
  postRegisterVCode(){
    return axios.post("/register/vcode");
  },
  //验证码的提交验证
  postRegisterCheckVCode(VCode){
    return axios.post('/register/checkVCode',{VCode})
  },
  /*
  * 注册接口
  * @parmas
  *   options ：Object，必须，需要 user、pwd、svgCode 三条属性
  *   {user, pwd, VCode}
  * */
  postRegister(options){
    return axios.post("/register",options);
  },

  /*登录的接口{user, pwd}*/
  postLogin(options){
    return axios.post('/login',options);
  },
  postIfLogin(){
    return axios.post("/login/ifLogin");
  },
  postLogout(){
    return axios.post("/login/logout");
  },
  //验证用户名是否存在
  getCheckUsername(user){
    return axios.get("/login/checkUsername?user="+user);
  },




  /*留言的接口 options => {user:"id", content:""}*/
  commitMessage(options){
    return axios.post("/message/commit",options);
  },
  /*留言的留言接口 options => {parentId:"id",user:"id",content:"",reUser:""}*/
  commitChildMessage(options){
    return axios.post('/message/childCommit',options)
  },
  /*获取留言列表 options => */
  postMessageList(skip=0,limit=5){
    return axios.post('/message/getList',{skip,limit});
  },





  /*最近访问接口*/
  postVisitor(){
    return axios.post("/visitor");
  }


};