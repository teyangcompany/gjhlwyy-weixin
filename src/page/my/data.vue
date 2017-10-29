<template>
    <div class="page flex">
        <app-header class="header flex0" ref="header" title="我的资料">
            <i slot="back"></i>
        </app-header>
        <div class="main overflow-y-auto" ref="main">
            <div class="wrap flex">
                <div class="label flex0">
                    头像
                </div>
                <div class="text flex1">
                    <img :src="patAva(userInfo)" alt="">
                </div>
            </div>

            <div class="wrap flex" @click="handleRealName(sysCommonPatVo.isRealnameAuth)">
                <div class="label flex0">
                    实名认证
                </div>
                <div class="text flex1">
                    {{sysCommonPatVo.isRealnameAuth ? "已认证" : "未认证"}}
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
                    {{sysCommonPatVo.compatName}}
                </div>
            </div>

            <div class="wrap flex">
                <div class="label flex0">
                    身份证
                </div>
                <div class="text flex1">
                    {{sysCommonPatVo.compatIdcard}}
                </div>
            </div>

            <div class="wrap flex" @click="modifyPhone">
                <div class="label flex0">
                    手机号
                </div>
                <div class="text flex1">
                    {{sysCommonPatVo.compatMobile}}
                </div>
            </div>

            <div class="wrap flex">
                <div class="label flex0">
                    年龄
                </div>
                <div class="text flex1">
                    {{sysCommonPatVo.compatAge}}
                </div>
            </div>

            <div class="wrap flex">
                <div class="label flex0">
                    性别
                </div>
                <div class="text flex1">
                    {{getSex(sysCommonPatVo.compatGender)}}
                </div>
            </div>

            <div class="wrap flex">
                <div class="label flex0">
                    所在地区
                </div>
                <div class="text flex1">
                    {{userInfo.patAreaname}}
                </div>
            </div>

            <div class="wrap flex">
                <div class="label flex0">
                    与我关系
                </div>
                <div class="text flex1">
                    本人
                </div>
            </div>

            <div class="title">
                医院账号
            </div>

            <div class="wrap flex nobg">
                <div class="add flex1 center">+添加医院账号</div>
            </div>
        </div>

    </div>
</template>

<script>
    import AppHeader from "../../plugins/app-header.vue"
    import {isBindMixin, mainHeightMixin} from "../../lib/mixin"
    import patAva from "../../utils/patAva"
    import getSex from "../../utils/getSex"
    import api from "../../lib/api"
    import weuijs from "weui.js"

    export default {
        mixins: [isBindMixin, mainHeightMixin],
        data() {
            return {
                userInfo: {}
            };
        },
        computed: {
            sysCommonPatVo() {
                return this.userInfo.sysCommonPatVo ? this.userInfo.sysCommonPatVo : {}
            }
        },
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
            patAva, getSex,
            modifyPhone() {
                let msg = "\n" +
                    "\n" +
                    "修改手机号将同时更改您的登录手机号；\n" +
                    "\n" +
                    "并导致运营商认证、医院认证、医院帐号绑定失效，确定吗？\n";
                weuijs.confirm(msg,
                    () => {
                        this.$router.push("/changePhone")
                    })
            },

            handleRealName(isRealnameAuth) {
                if (!isRealnameAuth) {
                    let query = {
                        compatId: this.sysCommonPatVo.compatId
                    }
                    this.$router.push({
                        path: "/my/auth",
                        query: query
                    })
                }
            }
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
            padding: 15px 1.5rem 15px 1rem;
            align-items: center;
            &.nobg {
                background: none;
            }
            .label {
                font-size: 17px;
            }
            .text {
                text-align: right;
                color: #999999;
                img {
                    border-radius: 50%;
                    @include w_h(40px, 40px);
                }
            }
            .add {
                color: $mainColor;
            }
        }
    }


</style>
