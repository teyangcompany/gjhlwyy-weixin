<template>
    <div class="page flex">
        <app-header class="header flex0" ref="header" title="我的资料">
            <i slot="back"></i>
        </app-header>

        <div class="wrap flex">
            <div class="label flex0">
                头像
            </div>
            <div class="text flex1">
                <img :src="patAva(userInfo)" alt="">
            </div>
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                实名认证
            </div>
            <div class="text flex1">

            </div>
        </div>

        <div class="title">
            个人信息
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                姓名
            </div>
            <div class="text flex1">

            </div>
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                身份证
            </div>
            <div class="text flex1">

            </div>
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                手机号
            </div>
            <div class="text flex1">

            </div>
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                年龄
            </div>
            <div class="text flex1">

            </div>
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                性别
            </div>
            <div class="text flex1">

            </div>
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                所在地区
            </div>
            <div class="text flex1">

            </div>
        </div>

        <div class="wrap flex">
            <div class="label flex0">
                与我关系
            </div>
            <div class="text flex1">

            </div>
        </div>
    </div>
</template>

<script>
    import AppHeader from "../../plugins/app-header.vue"
    import {isBindMixin} from "../../lib/mixin"
    import patAva from "../../utils/patAva"

    export default {
        mixins: [isBindMixin],
        data() {
            return {
                userInfo: {}
            };
        },
        computed: {},
        components: {
            AppHeader
        },
        created() {
            this._isBind().then((res) => {
                if (res !== false) {
                    this.userInfo = res;
                }
            })
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            patAva,

        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/public";

    %column {
        flex-direction: column;
    }

    .page {
        @extend %column;
        .wrap + .wrap {
            @include border(top);
        }
        .title {
            background-color: $bgColor;
            padding: 10px 1rem;
        }
        .wrap {
            background-image: url("../../../static/img/more.png");
            @include backgroundImageSet(17px/2, 30px/2, 19rem);
            padding: 10px 1.5rem 10px 1rem;
            .label {
                font-size: 17px;
            }
            .text {
                text-align: right;
                img {
                    border-radius: 50%;
                    @include w_h(40px, 40px);
                }
            }
        }
    }


</style>
