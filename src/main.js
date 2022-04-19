import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import Problems from '../components/ProblemSet/Problems.vue'
// 导入全局样式表
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
 
// import Echarts from 'vue-echarts'
// import 'echarts/lib/chart/line'
 
// Vue.component('chart',Echarts)
import echarts from "echarts";
import { Notification } from 'element-ui';
import {MessageBox} from 'element-ui';
import { Loading } from 'element-ui'
Vue.prototype.$alert = MessageBox
Vue.prototype.$notify = Notification
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

let loading        //定义loading变量

function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}
function endLoading() {    //使用Element loading-close 方法
    loading.close()
}
//那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
//声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
//调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
    }
}

// 配置请求的根路径（本地）
axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
// 配置，可以用this访问$http
Vue.prototype.$http = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
