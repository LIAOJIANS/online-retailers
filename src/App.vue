<template>
  <div class="app-container">
    <!-- 顶部header区域 -->
    <mt-header class="header" fixed title="山山商城">
      <span slot="left" @click="goback()" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 中间路由区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部tabble区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-new" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-new" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  created() {
    this.flag = this.$route.path === "/home" ? false : true;
  },
  methods: {
    goback() {
      this.$router.go(-1)
    }
  },
  watch: {
    "$route.path": function (newUrl) {
      if(newUrl === "/home") {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  },
}
</script>
<style>
</style>
<style lang="less" scoped>
.header {
  z-index: 9999;
}
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
// 由于mui组件有BUG，所以修改mui-tab-item类名
.mui-bar-tab .mui-tab-item-new.mui-active {
  color: #007aff;
}
.mui-bar-tab .mui-tab-item-new {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}
.mui-bar-tab .mui-tab-item-new .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}
.mui-bar-tab .mui-tab-item-new .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>



