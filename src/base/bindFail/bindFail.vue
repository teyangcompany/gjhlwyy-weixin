<template>
    <div class="loading">
        <img src="./u4197.png" alt="">
        <p>{{ title }}</p>
        <p class="second">{{ failDetail }}</p>
        <p class="third">{{ failDetailSecond }}</p>
        <p class="des" @click="iSee()">{{failKnow}}</p>
    </div>
</template>
<script>
    export default {
        props: {
            title: {
                type: String,
                default: ""
            },
            failDetail: {
                type: String,
            },
            failDetailSecond: {
                type: String,
            },
            failKnow: {
                type: String,
            }
        },
        methods: {
            iSee() {
                this.$emit("on-iSee")
            }
        }
    }
</script>
<style scoped lang="scss">
    @import '../../common/public.scss';

    .loading {
        width: 500rem/$rem;
        height: 650rem/$rem;
        margin: 0 auto;
        padding-top: 50rem/$rem;
        background-color: white;
        text-align: center;
        line-height: 1.5;
        border-radius: 12px;
        img {

            width: 150rem/$rem;
            height: 150rem/$rem;
        }
        p {
            font-size: 32rem/$rem;
            color: #333333;
        }
        p.des {
            margin-top: 20rem/$rem;
            line-height: 20px;
            font-size: 36rem/$rem;
            color: #4BCEC8;
        }
        p.second, p.third {
            text-align: left;
            width: 450rem/$rem;
            margin: 0 auto;
        }
    }
</style>
