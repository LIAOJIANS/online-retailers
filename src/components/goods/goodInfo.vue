<template>
  <div class="content">
   <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"> 
      <div class="ball" v-show="flag" ref="ball"></div>
   </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
            <sewper :lunbotuList="lunbotu" :isfull="false"></sewper>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{ goodlist.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>
            市场价：<del>￥{{ goodlist.market }}</del>&nbsp;&nbsp;&nbsp;销售价：<span class="now_price">￥{{ goodlist.sell }}</span>
          </p>
          <p class="buy-num">
            购买数量：<btn @getcont="getselectedCount" :max="goodlist.stock"></btn>
          </p>
          <p class="buy">
            <mt-button type="primary" size="small" >立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addShopcar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodlist.goods_no }}</p>
          <p>库存情况：{{ goodlist.stock }}</p>
          <p>上架时间：{{ goodlist.add_time }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="gointro(id)">图文介绍</mt-button>
        <mt-button type="danger" size="large" plain @click="goPinlun(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import sewper from "../subcom/sewer.vue";
import btn from "../subcom/numberBox.vue";
export default {
  data() {
    return {
        lunbotu: [],
        goodlist: [],
        id: this.$route.params.id,
        flag: false,
        selectedCount: 1
    };
  },
  created() {
      this.getLunBotu();
      this.getgoodslist();
  },
  methods: {
      getLunBotu() {
          this.$http.get("infoList").then(result => {
              if(result.body.status === 0 ) {
                  result.body.data.forEach( item => {
                      item.img_url = item.src;
                  });
                  this.lunbotu = result.body.data;
                  console.log(this.lunbotu)
              }
          })
      },
      getgoodslist() {
        this.$http.get("goods?id" + this.id).then(result => {
          console.log(result.body)
          if(result.body.status === 0) {
            this.goodlist = result.body.data;
          }
        })
      },
      gointro(id) {
        this.$router.push({ name: "goodsdesc", params: { id } })
      },
      goPinlun(id) {
        this.$router.push({ name: "goodscomment", params: { id } })
      },
      addShopcar() {
        this.flag = !this.flag;
        var goodsinfo = {
          id: this.id,
          count: this.selectedCount,
          price: this.goodlist.sell,
          selected: true
        };
        this.$store.commit("addToCar", goodsinfo);
      },
      beforeEnter(el) {
        el.style.transform = "translate(0, 0)";
      },
      enter(el, done) {
        el.offsetWidth;

        const ball = this.$refs.ball.getBoundingClientRect();
        const badge = document.getElementById("badge").getBoundingClientRect();
        const xDist =  badge.left - ball.left;
        const yDist =  badge.top - ball.top;

        el.style.transform = `translate(${xDist}px, ${yDist}px)`;
        el.style.transition = "all 1s cubic-bezier(.4, -0.3, 1, .68)";
        done();
      },
      afterEnter(el) {
        this.flag = !this.flag;
      },
      getselectedCount(count) {
        this.selectedCount = count;
        console.log(this.selectedCount)
      }
  },
  components: {
    sewper,
    btn
  }
};
</script>
<style lang="less" scoped>
.content {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .buy-num,
  .buy {
    display: flex;
    justify-content: space-between;
  }
  .mui-card-footer {
    display: block;
     button {
       margin: 15px 0;
     }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    top: 390px;
    left: 284px;
    z-index: 999;
  }
}
</style>
