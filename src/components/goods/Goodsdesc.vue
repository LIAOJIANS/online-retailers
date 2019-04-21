<template>
    <div class="goodsdecs">
        <h3>{{ desc.title }}</h3>
        <hr>
        <div class="content">
            <p>{{ desc.content }}</p>
            <img :src="desc.img" alt="">
            <img :src="desc.img1" alt="">
            <img :src="desc.img2" alt="">
            <img :src="desc.img3" alt="">
            <img :src="desc.img4" alt="">
            <img :src="desc.img5" alt="">
            <img :src="desc.img6" alt="">
            <img :src="desc.img7" alt="">
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            id: this.$route.params,
            desc: []
        }
    },
    created() {
        this.getdesc();
    },
    methods: {
        getdesc() {
            this.$http.get("getdesc?id" + this.id ).then(result => {
                if(result.body.status === 0) {
                    this.desc = result.body.data;
                }
            })
        }
    },
}
</script>
<style lang="less" scoped>
.goodsdecs {
    padding: 0 4px;
    h3 {
        font-size: 16px;
        text-align: center;
        color: #226aff;
        margin: 16px 0;
    }
    .content {
        img {
            width: 100%;
        }
    }
}
</style>

