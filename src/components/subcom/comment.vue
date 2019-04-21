<template>
  <div class="cmt-contenter">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请开始你的BB，只能BB（120）字" maxlength="120" v-model="msg"></textarea>

    <mt-button type="primary" size="large" @click="setp">发表评论</mt-button>

    <div class="cmt-list">
       <div class="cmt-item" v-for="(item, index) in comments" :key="item.add_time">
        <div class="cmt-title">
            第{{ index+1 }}楼 &nbsp;&nbsp; 用户：{{ item.user_name }}&nbsp;&nbsp; 发表时间：{{ item.add_time  }}&nbsp;&nbsp;
        </div>
        <div class="cmt-body">{{ item.content }}</div>
      </div>
       
    </div>

    <mt-button type="danger" size="large" plain @click="getmorelist ">加载更多</mt-button>
  </div>
</template>


<script>
import { Toast } from 'mint-ui'; 
export default {
    data() {
        return {
            pageIndex: 1,
            comments: [],
            content: '',
            msg:''
        };
    },
    created() {
        this.getComments();
    },
    methods: {
        getComments() { // 加载数据
            this.$http.get("pinlun?id" + this.id + "?page" + this.pageIndex)
            .then(result => {
                if(result.body.status === 0) {
                    this.comments = this.comments.concat(result.body.success);
                    console.log(result.body)
                } else {
                    Toast("获取评论失败!")
                }
            })
        },
        getmorelist() {
            this.pageIndex++;
            this.getComments();
        },
        setp() {
            if(this.msg.trim().length === 0) {
                return Toast("你BB的不能为空");
            }
            var cmt = { user_name: '匿名用户', add_time: Date.now(), content: this.msg.trim() }
            this.comments.unshift(cmt);
        }
    },
    props: ['id']
};
</script>

<style lang="less" scoped>
.cmt-contenter {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 13px;
    margin: 0;
    height: 85px;
  }
  .cmt-list {
      margin-top: 2px;
    .cmt-item {
      font-size: 12px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>

