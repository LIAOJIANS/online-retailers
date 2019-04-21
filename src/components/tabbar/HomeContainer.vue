<template>
  <div>
     <!-- 轮播图区域 -->
    <sewper :lunbotuList="lunbotuList" :isfull="true"></sewper>
    <!-- 六宫格区域 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newlist">
          <img src="../../images/menu1.png" alt>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu2.png" alt>
          <!-- <span class="mui-badge">5</span> -->
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodlist" >
          <img src="../../images/menu3.png" alt>
          <div class="mui-media-body">商品购买</div>
        </router-link> 
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu4.png" alt>
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/pohto/pohtolist">
          <img src="../../images/menu5.png" alt>
          <div class="mui-media-body">分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/menu6.png" alt>
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import sewper from "../subcom/sewer.vue"
export default {
  data() {
    return {
      lunbotuList: []
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      this.$http
        .get(
          "api/lunbo"
        )
        .then(result => {
          if (result.body.static === 1) {
            // 成功
            this.lunbotuList = result.body.data;
          } else {
            // 失败
            Toast("加载图片失败");
          }
        });
    }
  },
  components: {
    sewper
  }
};
</script>
<style lang="less" scoped>
.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  li {
    border: 0;
    font-size: 13px;
    img {
      width: 60px;
      height: 60px;
    }
  }
  .mui-media-body {
    font-size: 13px;
  }
}
</style>


