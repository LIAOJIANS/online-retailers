<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item', item.id == 0 ?  'mui-active' : '']"
            v-for="item in listTop"
            :key="item.id"
            @click="getimgList(item.id)"
          >{{ item.title }}</a>
        </div>
      </div>
    </div>
    <ul>
      <router-link  v-for="item in imgList" :key="item.id" tag="li" :to="'/pohto/pohtoinfo/' + item.id">
        <img v-lazy="item.imageUrl">
        <div class="info">{{ item.title }}</div>
      </router-link>
    </ul>
  </div>
</template>

<script>
// 导入muiJS文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      listTop: [],
      imgList: []
    };
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getlistTop();
    this.getimgList(0);
  },
  methods: {
    getlistTop() {
      this.$http.get("listtop").then(result => {
        console.log(result.body);
        if (result.body.status === 0) {
          result.body.data.unshift({ title: "全部", id: 0 });
          this.listTop = result.body.data;
        }
      });
    },
    getimgList(id) {
      this.$http.get("imagelist?" + id).then(result => {
        if (result.body.status === 0) {
          this.imgList = result.body.data;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
ul {
	list-style: none;
	padding: 10px;
	margin: 0;
	margin-bottom: -10px;
  li {
	  max-width: 100%;
	  margin-bottom: 10px;
	  box-shadow: 0 0 9px #999;
	  position: relative;
	  background-color: #ccc;
	  img {
		  width: 100%;
		  display: block;
	  }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
	}
	.info {
		position: absolute;
		color: #fff;
		left: 0;
		bottom: 0;
		font-size: 14px;
		background: rgba(0, 0, 0, 0.5);
	}
  }
}
</style>
