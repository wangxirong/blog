import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {
  Button, Icon, Dialog, Message, MessageBox,
  Form, FormItem, Input, Upload, Popover
} from "element-ui";

Vue
  .use(Button)
  .use(Icon)
  .use(Form)
  .use(FormItem)
  .use(Input)
  .use(Dialog)
  .use(Upload)
  .use(Popover)
// .use(element)
;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
