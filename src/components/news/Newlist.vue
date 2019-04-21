<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newlist" :key="item.id">
        <router-link :to="'/home/newinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{item.title}}</h1>
            <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dataFormat}}</span>
              <span>点击次数{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      newlist: []
    };
  },
  created() {
    this.getNewlist();
  },
  methods: {
    getNewlist() {
      this.$http.get("aip/newlist").then(result => {
        if (result.body.status === 0) {
          this.newlist = result.body.data;
        } else {
          Toast("获取数据失败！！");
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 12px;
    }
    p {
      font-size: 12px;
      color: #226af2;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

