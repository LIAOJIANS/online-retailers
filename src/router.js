
//手动导入路由包
import VueRouter from 'vue-router'

// 导入对应的组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import shopcarContainer from './components/tabbar/shopcarContainer.vue'
import newList from './components/news/Newlist.vue'
import newInfo from './components/news/Newinfo.vue'
import pohtoList from './components/pohto/PohtoList.vue'
import pohtoInfo from './components/pohto/PohtoInfo.vue'
import goodlist from './components/goods/goodlist.vue'
import goodInfo from './components/goods/goodInfo.vue'
import goodsdesc from './components/goods/Goodsdesc.vue'
import goodscomment from './components/goods/Goodscomment.vue'


//c创建路由对象
var router = new VueRouter({
    routes: [ // 配置路由规则
        { path: '/', redirect: '/home' },
        { path: '/home', component: HomeContainer },
        { path: '/member', component: MemberContainer },
        { path: '/shopcar', component: shopcarContainer },
        { path: '/search', component: SearchContainer },
        { path: '/home/newlist', component: newList },
        { path: '/home/newinfo/:id', component: newInfo },
        { path: '/pohto/pohtolist', component: pohtoList },
        { path: '/pohto/pohtoinfo/:id', component: pohtoInfo },
        { path: '/home/goodlist', component: goodlist},
        { path: '/home/goodinfo/:id', component: goodInfo },
        { path: '/home/goodsdesc/:id', component: goodsdesc, name: "goodsdesc" },
        { path: '/home/goodscomment/:id', component: goodscomment, name: "goodscomment" }

    ],
    linkActiveClass: 'mui-active'
})
// 暴露对象
export default router