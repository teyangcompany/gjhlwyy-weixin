<template>
    <div class="recentChat">
        <div class="myDoctorList" ref="contactList">
            <div v-if="!doctorList" class="loading">
                <img src="../../../../static/img/loading.gif" alt="">
                <span>正在很努力的加载中...</span>
            </div>
            <div v-else-if="doctorList.length == 0" class="loading">
                <tips></tips>
            </div>
            <div v-else>
                <ul class="border-1px" v-for="(item,index) in doctorList" v-if="!item.bookDocId">
                    <div @click="goExpertDetail(index)">
                        <li>
                            <div class="cancelImg">
                                <img src="../../../../static/img/普通-门诊.png" alt="">
                            </div>
                            <div class="cancelIntro">
                                <div>
                                    <span class="chatDoctor"></span> <span class="doctorTitle">{{ item.docName }}</span>
                                    <p>{{ item.hosName }}</p>
                                </div>
                            </div>
                            <div class="cancelTime">
                                <div>
                                    <span class="year gray" v-if="item.schemeStatus == 0">无</span>
                                    <span class="year gray" v-if="item.schemeStatus == 1">停诊</span>
                                    <span class="year gray" v-if="item.schemeStatus == 2">已满</span>
                                    <span class="year" v-if="item.schemeStatus == 3">即将(未放号或号子被锁定)</span>
                                    <span class="year" v-if="item.schemeStatus == 4">预约</span>
                                    <img src="../../../../static/img/查看更多.png" alt="">
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
                <div class="blank border-1px"></div>
                <ul class="border-1px" v-for="(item,index) in doctorList" v-if="item.bookDocId">
                    <div @click="goFamousPage(index)">
                        <li>
                            <div class="avartarImg" v-if="item.docAvatar != ''">
                                <img :src="item.docAvatar" @load="refresh"
                                     onerror="javascript:this.src='./static/img/doctor.m.png'">
                            </div>
                            <div class="avartarImg" v-else>
                                <img src="../../../../static/img/doctor.m.png" alt="">
                            </div>
                            <div class="cancelIntro">
                                <div>
                                    <span class="chatDoctor">{{ item.docName }}</span> <span
                                        class="doctorTitle">{{ item.docTitle }}</span>
                                    <p>{{ item.docDescription }}</p>
                                </div>
                            </div>
                            <div class="cancelTime">
                                <div>
                                    <span class="year gray" v-if="item.schemeStatus == 0">无</span>
                                    <span class="year gray" v-if="item.schemeStatus == 1">停诊</span>
                                    <span class="year gray" v-if="item.schemeStatus == 2">已满</span>
                                    <span class="year" v-if="item.schemeStatus == 3">即将(未放号或号子被锁定)</span>
                                    <span class="year" v-if="item.schemeStatus == 4">预约</span>
                                    <img src="../../../../static/img/查看更多.png" alt="">
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
            <div v-if="showAlertTips" class="loading">
                <alert-tips></alert-tips>
            </div>
        </div>
        <!--<div class="myDoctorList" >-->
        <!--<div class="emptyHistory">-->
        <!--<span> 您还没有与医生进行聊天的记录</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--<div class="myDoctorList" v-else>-->
        <!--<div class="emptyHistory">-->
        <!--<loading></loading>-->
        <!--</div>-->
        <!--</div>-->
        <div class="loading-container">

        </div>
        <!--<v-mask  v-show="chatList.length == 0"></v-mask>-->
    </div>
</template>
<script>
    import BScroll from 'better-scroll'
    import Tips from '../../../base/tips'
    import AlertTips from '../../../base/alertTips'
    import api from '../../../lib/api'
    import weui from 'weui.js'
    import {tokenCache} from '../../../lib/cache'
    //  import Loading from '../../../..base/loading/loading'
    export default {
        data() {
            return {
                showList: true,
                commonNum: "",
                bookDeptId: "",
                doctorList: "",
                waitLoading: 1,
                commonIndex: "",
                showAlertTips: false,
            }
        },
        created() {
            this.doctorListScroll = null;
            this.bookDeptId = this.$route.query.bookDeptId
            this.bookSort = this.$route.query.bookSort
            api("nethos.book.doc.list.scheme.list", {
                bookDeptId: this.bookDeptId
            }).then((data) => {
                if (data.code == 0) {
                    this.doctorList = data.list
                    this._initRecentChat()
                } else if (!(data.msg)) {
                    this.doctorList = true
                    this.showAlertTips = true
                    setTimeout(() => {
                        this.showAlertTips = false
                    }, 1000)
                } else {
                    this.doctorList = true
                    weui.alert(data.msg)
                }
            })
        },
        mounted() {

        },
        methods: {
            _initRecentChat() {
                setTimeout(() => {
                    this.doctorListScroll = new BScroll(this.$refs.contactList, {
                        click: true
                    });
                }, 200)
            },
            refresh() {
                this.doctorListScroll && this.doctorListScroll.refresh();
            },
            goExpertDetail(index) {
                this.commonIndex = index
                console.log(this.commonIndex)
                this.$router.push({
                    path: "/expertDetail",
                    query: {
                        bookDeptId: this.doctorList[this.commonIndex].deptSchemeList[0].bookDeptId,
                        bookSort: this.bookSort
                    }
                })
            },
            goFamousPage(index) {
                this.$router.push({
                    path: "/famousPage",
                    query: {bookDocId: this.doctorList[index].bookDocId, bookSort: this.bookSort}
                })
            },

        },
        watch: {
            doctorList() {
                console.log("scroll", this.doctorListScroll);
                setTimeout(() => {
                    this.refresh();
                }, 200)
            },
        },
        components: {
            Tips,
            AlertTips
        }
    }
</script>
<style scoped lang="scss">
    @import '../../../common/public.scss';

    .recentChat {
        width: 100%;
        position: fixed;
        top: 50px;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .myDoctorList {
        width: 100%;
        position: fixed;
        top: 50px;
        bottom: 0;
        left: 0;
        right: 0;
        touch-action: none;
        z-index: 1;
        background-color: white;
        .loading {
            position: fixed;
            top: 90px;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
                width: 100rem/$rem;
                margin-bottom: 10px;
            }
            span {
                font-size: 32rem/$rem;
                color: #999999;
            }
        }
        .emptyHistory {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            span {
                display: inline;
                > div {
                    color: #0FBDFF;
                    display: inline;
                }
            }
        }
        .blank {
            width: 100%;
            height: 20rem/$rem;
            background-color: rgb(245, 245, 245);
        }
        ul {
            padding: 0;
            margin: 0;
            height: 180rem/$rem;
            li {
                list-style-type: none;
                height: 180rem/$rem;
                display: flex;
                .cancelImg {
                    width: 160rem/$rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 110rem/$rem;
                        height: 110rem/$rem;
                        border-radius: 50%;
                    }
                }
                .avartarImg {
                    width: 160rem/$rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 110rem/$rem;
                        height: 110rem/$rem;
                    }
                }
                .cancelIntro {
                    flex: 2;
                    display: flex;
                    align-items: center;
                    line-height: 40rem/$rem;
                    .badgeDoc {
                        display: inline-block;
                        padding-top: -5px;
                        .myDoctor {
                            width: 80rem/$rem;
                            height: 36rem/$rem;
                            background-color: darkturquoise;
                            border-radius: 5px;
                            display: inline-block;
                            font-size: 10px;
                            color: white;
                            line-height: 40rem/$rem;
                            text-align: center;
                        }
                    }
                    p {
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        margin: 0;
                        color: #999999;
                        font-size: 28rem/$rem;
                    }
                    span.chatDoctor {
                        font-size: 32rem/$rem;
                        color: #333333;
                    }
                    span.doctorTitle {
                        font-size: 28rem/$rem;
                        color: #666666;
                    }
                }
                .cancelTime {
                    width: 200rem/$rem;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding-right: 20rem/$rem;
                    img {
                        width: 16rem/$rem;
                        height: 24rem/$rem;
                    }
                    span.year {
                        font-size: 28rem/$rem;
                        color: $mainColor;
                    }
                    span.gray {
                        color: #999999;
                    }
                    span.full {
                        color: #999999;
                    }
                }
            }
        }
        .loading-container {
            position: absolute;
            /*background-color: #E64340;*/
            width: 100%;
            top: 50%;
            z-index: 100;
            transform: translateY(-50%)
        }
    }
</style>
