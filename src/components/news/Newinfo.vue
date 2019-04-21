<template>
    <div class="newinfo-container">
        <h3 class="title">新闻详情</h3>
        <p class="subtitle">
            <span>发表时间：</span>
            <span>点击0次</span>
        </p>
        <hr>
        <div class="content"></div>
        <comment :id="this.id">
            
        </comment>
    </div>    
</template>
 <script>

 import comment from '../subcom/comment.vue'

 export default {
     data() {
         return {
            id: this.$route.params.id,
            getnewinfo:{}
         }
     },
    //  created() {
    //      this.getnewinfo();
    //  },
     methods: {
        //  getnewinfo() {
        //      this.$http.get('' + this.id).then(result => {

        //      })
        //  }
     },
     components: {
         'comment' : comment
     }
 }
 </script>
 <style lang="less" scoped>
    .newinfo-container {
        padding: 0 4px;
        .title {
            font-size: 16px;
            color:red;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between
        }
    }
 </style>
 
