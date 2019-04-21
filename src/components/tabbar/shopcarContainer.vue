<template>
  <div class="content">
    <div class="mui-card" v-for="(item, index) in goodlist" :key="item.id">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <mt-switch v-model="$store.getters.getGoodsSelect[item.id]" @change="selectedChange(item.id, $store.getters.getGoodsSelect[item.id])"></mt-switch>
          <img :src="item.thumb_path" alt>
          <div class="info">
            <h3>{{ item.title }}</h3>
            <p class="box">
              <span class="price">￥{{ item.sell }}</span>
              <shopcar :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></shopcar>
              <a href="#" @click.prevent="remove(item.id, index)">删除</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计（不含运费）</p>
            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountsAndAmount.count }}</span> 件， 总价<span class="red">￥{{ $store.getters.getGoodsCountsAndAmount.amount }}</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
    <!-- <p>{{ $store.getters.getGoodsSelect}}</p> -->
  </div>
</template>
<script>
import shopcar from "../subcom/shopCar.vue";
export default {
  data() {
    return {
      goodlist: []
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      var idArr = [];
      this.$store.state.car.forEach(item => idArr.push(item.id));
      if (idArr.length <= 0) {
        return;
      }
      this.$http.get("shopcar?id=" + idArr.join(",")).then(result => {
        if (result.body.status === 0) {
          this.goodlist = result.body.data;
        }
        console.log(this.goodlist);
      });
    },
    remove(id, index) {
      this.goodlist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectedChange(id, val) {
      console.log(id, val)
      this.$store.commit("updataGoodsSelect", {id, selected: val})
    }
  },
  components: {
    shopcar
  }
};
</script>
<style lang="less" scoped>
.content {
  background-color: #eee;
  overflow: hidden;
  .mui-card-content-inner {
    display: flex;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
    margin-left: 10px;
  }
  h3 {
    font-size: 13px;
  }
  .info {
    margin-left: 10px;
    .box {
      display: flex;
      margin-top: 20px;
    }
    .price {
      color: red;
      font-size: 14px;
      font-weight: bold;
      margin-right: 3px;
    }
    a {
      margin-left: 3px;
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
