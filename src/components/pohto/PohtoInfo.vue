<template>
  <div class="all">
    <!-- 头部 -->
    <h3>{{ title.title }}</h3>
    <div class="button">
      <div class="add-time">发表时间：{{ title.add_time }}</div>
      <div class="click">点击次数：{{ title.click }}</div>
    </div>
    <hr>
    <!-- 缩略图 -->
      <div class="suolue"> 
       <vue-preview
        :list="list"
        :thumbImageStyle="{width: '95px', height: '80px', margin: '10px'}"
        :previewBoxStyle="{border: '1px solid #eee'}"
        :tapToClose="true"
        @close="closeHandler"
        @destroy="destroyHandler"
      />
    </div>
    <!-- 内容区 -->
    <div class="content">
      <p>{{ title.content }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      title: {},
      list: []
    };
  },
  created() {
    this.getTop();
    this.getThumbs();
  },
  methods: {
    getTop() {
      this.$http.get("imginfo?" + this.id).then(result => {
        if (result.body.status === 0) {
          this.title = result.body.data[0];
        }
      });
    },
    getThumbs() {
      this.$http.get("infoList?" + this.id).then(result => {
        console.log(result.body.data)
        if (result.body.status === 0) {
          result.body.data.forEach(item => {
            item.w = 600;
            item.h = 400;
          });
          this.list = result.body.data;
          console.log(this.list)
        }
      })
    },
   closeHandler() {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log('destroyHandler')
    }
  }
};
</script>
<style lang="less" scoped>
.all {
    padding: 0 3px;
  h3 {
    color: black;
    font-size: 15px;
    text-align: center;
    margin: 10px 0;
  }
  hr {
      margin: 5px 0;
      padding: 0;
  }
  .button {
    display: flex;
    justify-content: space-between;
    div  {
        font-size: 13px;
        color: #666;
    }
  }
  .content {
      font-size: 13px;
      line-height: 20px;
  }
}


</style>
