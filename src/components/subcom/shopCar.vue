<template>
  <div>
    <div class="mui-numbox" data-numbox-min="1" style="height: 20px">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="initcount" @change="countChanged" ref="numbxo" readonly>
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>
</template>
<script>
import mui from "../../lib/mui/js/mui.min.js"
export default {
    mounted() {
        mui(".mui-numbox").numbox();
    },
    methods: {
      countChanged() {
        this.$store.commit("updataGoodsInfo", {
          id: this.goodsid,
          count: this.$refs.numbxo.value
        })
      }
    },
    props: ["initcount", "goodsid"],
}
</script>
<style lang="less" scoped>

</style>
