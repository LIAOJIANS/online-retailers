// 入口文件
import Vue from 'vue'
// 安装路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import moment from 'moment'

// 定义全局的过滤器
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})
// 导入VUEX
import vuex from 'vuex'
Vue.use(vuex)

// 拿到本地储存上的数据
var car = JSON.parse(localStorage.getItem("car") || "[]")
var store = new vuex.Store({
    state: {
        car: car
    },
    mutations: {
        addToCar(state, goodsinfo) {

            var flag = false

            state.car.some(item => {
                if(item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            if(!flag) {
                state.car.push(goodsinfo);
            }
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updataGoodsInfo(state, goodsinfo) {
            state.car.some(item => {
                if(item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count);
                    return true
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removeFromCar(state, id) {
            state.car.some((item, i) => {
                if(item.id == id) {
                    state.car.splice(i, 1);
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car));
        },
        updataGoodsSelect(state, info) {
            state.car.some(item => {
                if(item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count; 
            })
            return o;
        },
        getGoodsSelect(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsCountsAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if(item.selected) {
                    o.count += item.count;
                    o.amount += item.price * item.count;
                }
            })
            return o;
        } 
    }
})



// 导入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//  设置请求的根路径
Vue.http.options.root = ' https://www.easy-mock.com/mock/5c9f427ebfe3a8723f44ffb2/example'

// 导入Mui的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 导入Mint-ui 组件
// import { Header, Swipe, SwipeItem, Button, Lazyload} from 'mint-ui'
// import 'mint-ui/lib/style.css'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);
import MintUi from 'mint-ui'
Vue.use(MintUi)
import 'mint-ui/lib/style.css'

// 图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)


// 导入路由模块
import router from './router'

// 导入App根组件
import app from './App.vue'

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})