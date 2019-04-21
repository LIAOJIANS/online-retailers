<template>
    <div class="goodlist">
        <router-link class="content" v-for="item in goodlist" :key="item.id" :to="'/home/goodinfo/' + item.id">
            <img :src=" item.imageUrl " alt="">
            <h3>{{ item.title }}</h3>
            <div class="buttomn">
                <p class="price">
                    <span class="new">￥{{ item.sell_price }}</span>
                    <span class="old">￥{{ item.new_price }}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>剩余{{ item.sot }}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" @click="getMore">
            加载更多
        </mt-button> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            pageindex: 1,
            goodlist:[]
        }
    },
    created() {
        this.getGoodlist();
    },
    methods: {
        getGoodlist() {
            this.$http.get('goodlist?page' + this.pageindex).then(result => {
                if(result.body.status === 0) {
                    this.goodlist = this.goodlist.concat(result.body.data);
                }
            })
        },
        getMore() {
            this.pageindex++;
            this.getGoodlist()
        }
    },

}
</script>

<style lang="less" scoped>
.goodlist {
    padding: 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .content {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 293px;
        img {
            width: 100%;
        }
        h3 {
            font-size: 14px;
            color: #000;
        }
        .buttomn {
            background-color: #eee;
            p {
                margin: 0;
                padding: 5px;
            }
            .price {
                .new {
                    font-size: 16px;
                    color: red;
                    font-weight: bold;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell {
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }
    }
}
</style>
