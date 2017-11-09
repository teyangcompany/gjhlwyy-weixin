<template>
    <div class="auth page flex">
        <app-header title="选择医院" class="flex0">
            <i slot="back"></i>
        </app-header>
        <div class="main">
            <ul>
                <li @click="handle(hos)" class="flex flex-center" v-for="hos in list">
                    <div class="text flex1">
                        {{hos.hosName}}{{hos.compatMedicalRecord ? "(" + hos.compatMedicalRecord + ")" : ""}}
                    </div>
                    <div class="icon flex0" v-if="!hos.compatMedicalRecord">
                        <span class="color_999">去绑定</span> <img src="../../../static/img/arrow.png" alt="">
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
    import AppHeader from "../../plugins/app-header.vue"
    import api from "../../lib/api"
    import {debug} from "../../lib/util"
    import weuijs from "weui.js"

    export default {
        data() {
            return {
                action: "",
                list: []
            };
        },
        computed: {},
        components: {AppHeader},
        created() {
            this.action = this.$route.query.action;
            this.getHos();
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            handle(hos) {
                this[`handle_${this.action}`] && this[`handle_${this.action}`](hos);
            },//nethos.book.compat.bind.new
            doSuccess(type, obj) {
                if (type == "nethos.book.compat.bind.new") {
                    weuijs.alert("<i class='weui-icon-success weui-icon-size70'></i><br/><br/>" +
                        "新建成功，您的病案号是<br/><br/>" +
                        "<h3>" + obj.compatMedicalRecord +
                        "</h3>" +
                        "初次前往医院就诊时请务必携带身份证和医保卡（本），缺一不可。", {
                        buttons: [
                            {
                                label: "继续使用",
                                type: "primary"
                            }
                        ]
                    })
                } else {
                    weuijs.alert("<i class='weui-icon-success weui-icon-size70'></i><br/><br/>" +
                        "绑定成功，您的病案号是<br/><br/>" +
                        "<h3>" + obj.compatMedicalRecord +
                        "</h3>", {
                        buttons: [
                            {
                                label: "继续使用",
                                type: "primary"
                            }
                        ]
                    })
                }

            },
            async next(compatId, bookHosId, service = "nethos.book.compat.bind") {
                let loading = weuijs.loading("加载中");
                let ret = await api(service, {compatId, bookHosId})
                loading.hide();
                if (ret.code != 0) {
                    setTimeout(() => {
                        weuijs.alert(ret.msg || "服务端错误" + ret.code, () => {
                            this.$router.go(-1);
                        });
                    }, 500)
                } else {
                    this.doSuccess(service, ret.obj);
                }

            },
            async handle_auth(hos) {
                //debug("hos", hos);
                if (hos.compatMedicalRecord) {
                    return
                }
                let bookHosId = hos.bookHosId;
                let compatId = this.$route.query.compatId;
                let loading = weuijs.loading("加载中...")
                let ret = await api("nethos.book.compat.bind.check", {compatId, bookHosId});
                loading.hide();
                if (ret.code == 0) {
                    if (ret.obj == "needBind") {
                        weuijs.confirm(
                            "该就诊人没有绑定医院帐号，无法使用该功能。请先绑定医院帐号。",
                            {
                                buttons: [{
                                    label: "取消",
                                    type: "default"
                                }, {
                                    label: "去绑定",
                                    type: "primary",
                                    onClick: () => {
                                        this.next(compatId, bookHosId);
                                    }
                                }]
                            });
                    }
                    else if (ret.obj == "needCreate") {
                        weuijs.confirm(
                            "该就诊人没有在医院建过档，需要实名认证并新建病案号，才能使用该功能。", {
                                buttons: [{
                                    label: "取消",
                                    type: "default",
                                    onClick: () => {
                                        debug("cancel")
                                    }
                                }, {
                                    label: "新建病案号",
                                    type: "primary",
                                    onClick: () => {
                                        this.next(compatId, bookHosId, "nethos.book.compat.bind.new");
                                    }
                                }]
                            });
                    } else {
                        weuijs.toast("已经绑定");
                    }

                }

            },
            async getHos() {
                let loading = weuijs.loading("加载中...")
                let res = await api("nethos.pat.compat.record", {
                    compatId: this.$route.query.compatId
                });
                loading.hide();
                if (res.code == 0) {
                    this.list = res.list
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/public";

    .auth {
        flex-direction: column;
        .main {
            ul > li {
                @include border(bottom);
                padding: 15px;
                .icon {
                    img {
                        height: 15px;
                    }
                }
            }
        }
    }
</style>
