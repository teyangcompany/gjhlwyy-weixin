<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle" @on-consult="goMyConsult()" @on-index="goIndex()"></v-header>
    <div class="search border-1px flex" @click>
      <router-link tag="div" to="/search" class="flex1">
        <i class="weui-icon-search"></i><span>按科室、姓名搜索医生</span>
      </router-link>
    </div>
    <div class="tab border-1px">
      <div class="tab-item" :class="{choose_type:sortBy == 'displaySort'}">
        <div class="tab_item_container">
          <span @click="chooseType('displaySort')" v-if="sortPick == ''">全部科室
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </span>
          <span @click="chooseType('displaySort')" v-else>{{ sortPick }}
            <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
              <polygon points="0,3 10,3 5,8"/>
            </svg>
          </span>
        </div>
      </div>
      <div class="tab-item" :class="{choose_type:sortBy == 'displayType'}">
        <div class="tab_item_container">
          <div class="tab_item_border">
            <span @click="chooseType('displayType')" v-if="typePick == ''">全部咨询形式
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
            </span>
            <span @click="chooseType('displayType')" v-else>{{ typePick }}
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div class="tab-item" :class="{choose_type:sortBy == 'displayDefault'}">
        <div class="tab_item_container">
          <div class="sort_item_border">
            <span @click="chooseType('displayDefault')" v-if="defaultPick == ''">默认排序
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
            </span>
            <span @click="chooseType('displayDefault')" v-else>{{ defaultPick }}
              <svg width="10" height="10" xmlns="http://www.w3.org/2000/svg" version="1.1" class="sort_icon">
                <polygon points="0,3 10,3 5,8"/>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
    <transition name="showlist">
      <div class="dropType allRoom" v-show="sortBy == 'displaySort'">
        <div class="wrapWhole">
          <div class="wrapMenu" ref="wrapMenu">
            <ul>
              <li class="border-1px allLi" :class="{category_active:clickIndex == index}"
                  v-for="(item,index) in together"
                  @click="selectCategoryName(item,index)"><span>{{ item.gbDeptName }}</span><img
                v-if="arrow[index] == '1'" src="../../../../static/img/left-arrow.png" alt=""></li>
              <!--<div class="weui-cells weui-cells_radio weuiMargin">-->
              <!--<label class="weui-cell weui-check__label"  >-->
              <!--<div class="weui-cell__bd">-->
              <!--<p></p>-->
              <!--</div>-->
              <!--<div class="weui-cell__ft">-->
              <!--<input type="radio" class="weui-check" name="radio1"  :value=" item.deptId " v-model="firstPick"/>-->
              <!--<span class="weui-icon-checked"></span>-->
              <!--</div>-->
              <!--</label>-->
              <!--</div>-->
            </ul>
          </div>
          <div class="wrapContent" ref="wrapContent">
            <ul>
              <!--<li class="border-1px" v-if=" categoryDetail == 1" v-for="item in categoryDetail">{{ item.gbDeptName }}</li>-->
              <!--<li class="border-1px" v-for="item in categoryDetail">{{ item.gbDeptName }}</li>-->
              <div class="weui-cells weui-cells_radio weuiMargin">
                <label class="weui-cell weui-check__label" v-for="(item,index) in categoryDetail"
                       @click="selectSecond(index,item)">
                  <div class="weui-cell__bd">
                    <p>{{ item.gbDeptName }}</p>
                  </div>
                  <div class="weui-cell__ft">
                    <input type="radio" class="weui-check" name="radio1" :value="item.gbDeptName " v-model="sortPick"/>
                    <span class="weui-icon-checked"></span>
                  </div>
                </label>
              </div>

            </ul>
          </div>
        </div>
      </div>
    </transition>
    <transition name="showlist">
      <div class="dropType" v-show="sortBy == 'displayType'">
        <ul>
          <div class="weui-cells weui-cells_radio weuiMargin">
            <label class="weui-cell weui-check__label" for="x31">
              <div class="weui-cell__bd">
                <p>全部咨询形式</p>
              </div>
              <div class="weui-cell__ft">
                <input type="radio" class="weui-check" name="radio3" id="x31" value="全部咨询形式" v-model="typePick"/>
                <span class="weui-icon-checked"></span>
              </div>
            </label>
            <label class="weui-cell weui-check__label" for="x32">
              <div class="weui-cell__bd">
                <p>视频咨询</p>
              </div>
              <div class="weui-cell__ft">
                <input type="radio" name="radio3" class="weui-check" id="x32" value="视频咨询" v-model="typePick"/>
                <span class="weui-icon-checked"></span>
              </div>
            </label>
            <label class="weui-cell weui-check__label" for="x33">
              <div class="weui-cell__bd">
                <p>图文咨询</p>
              </div>
              <div class="weui-cell__ft">
                <input type="radio" name="radio3" class="weui-check" id="x33" value="图文咨询" v-model="typePick"/>
                <span class="weui-icon-checked"></span>
              </div>
            </label>
          </div>
        </ul>

      </div>
    </transition>
    <transition name="showlist">
      <div class="dropType" v-show="sortBy == 'displayDefault'">
        <ul>
          <div class="weui-cells weui-cells_radio weuiMargin">
            <label class="weui-cell weui-check__label" for="x41">
              <div class="weui-cell__bd">
                <p>默认排序</p>
              </div>
              <div class="weui-cell__ft">
                <input type="radio" class="weui-check" name="radio4" id="x41" value="默认排序" v-model="defaultPick"/>
                <span class="weui-icon-checked"></span>
              </div>
            </label>
            <label class="weui-cell weui-check__label" for="x42">
              <div class="weui-cell__bd">
                <p>按好评排</p>
              </div>
              <div class="weui-cell__ft">
                <input type="radio" name="radio4" class="weui-check" id="x42" value="按好评排" v-model="defaultPick"/>
                <span class="weui-icon-checked"></span>
              </div>
            </label>
          </div>
        </ul>
      </div>
    </transition>
    <transition name="showcover">
      <div class="back_cover" v-show="sortBy" @click="hideCover"></div>
    </transition>
    <div class="roomList" @click="hideCover" ref="doctor">
      <!--<div v-if="showVideo">-->
      <!--<ul class="border-1px" v-for=" item in doctorList" v-if="showVideo && item.docVideoConsultStatus == true">-->
      <!--<router-link tag="div" :to="{ path:'/onlineDoctorCard',query:{docId:item.docId} }">-->
      <!--<li>-->
      <!--<div class="cancelImg">-->
      <!--<img :src="item.docAvatar" alt="">-->
      <!--</div>-->
      <!--<div class="cancelIntro">-->
      <!--<div>-->
      <!--<span class="myDoctor"><span class="titleName">{{ item.docName }}</span> <span class="rankName">{{ item.docTitle }}  {{ item.docDeptName }}</span></span>-->
      <!--<p>{{ item.docHosName }}</p>-->
      <!--<p class="sortName"><span>{{ item.docPicConsultStatus == true ? "图文咨询":"" }}</span>-->
      <!--<span>{{ item.docVideoConsultStatus == true ? "视频问诊":"" }}</span>-->
      <!--</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<span class="distance">-->
      <!--<span class="score">{{ item.docScoure }}</span> 星-->
      <!--<img src="../../../../static/img/left-arrow.png" alt="">-->
      <!--</span>-->
      <!--</li>-->
      <!--</router-link>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div v-if="showPicture">-->
      <!--<ul class="border-1px" v-for=" item in doctorList" v-if="showPicture && item.docPicConsultStatus == true">-->
      <!--<router-link tag="div" :to="{ path:'/onlineDoctorCard',query:{docId:item.docId} }">-->
      <!--<li>-->
      <!--<div class="cancelImg">-->
      <!--<img :src="item.docAvatar" alt="">-->
      <!--</div>-->
      <!--<div class="cancelIntro">-->
      <!--<div>-->
      <!--<span class="myDoctor"><span class="titleName">{{ item.docName }}</span> <span class="rankName">{{ item.docTitle }}  {{ item.docDeptName }}</span></span>-->
      <!--<p>{{ item.docHosName }}</p>-->
      <!--<p class="sortName"><span>{{ item.docPicConsultStatus == true ? "图文咨询":"" }}</span>-->
      <!--<span>{{ item.docVideoConsultStatus == true ? "视频问诊":"" }}</span>-->
      <!--</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<span class="distance">-->
      <!--<span class="score">{{ item.docScoure }}</span> 星-->
      <!--<img src="../../../../static/img/left-arrow.png" alt="">-->
      <!--</span>-->
      <!--</li>-->
      <!--</router-link>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div v-if="showAllType">-->
      <!--<ul class="border-1px" v-for=" item in doctorList" >-->
      <!--<router-link tag="div" :to="{ path:'/onlineDoctorCard',query:{docId:item.docId} }">-->
      <!--<li>-->
      <!--<div class="cancelImg">-->
      <!--<img :src="item.docAvatar" alt="">-->
      <!--</div>-->
      <!--<div class="cancelIntro">-->
      <!--<div>-->
      <!--<span class="myDoctor"><span class="titleName">{{ item.docName }}</span> <span class="rankName">{{ item.docTitle }}  {{ item.docDeptName }}</span></span>-->
      <!--<p>{{ item.docHosName }}</p>-->
      <!--<p class="sortName"><span>{{ item.docPicConsultStatus == true ? "图文咨询":"" }}</span>-->
      <!--<span>{{ item.docVideoConsultStatus == true ? "视频问诊":"" }}</span>-->
      <!--</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<span class="distance">-->
      <!--<span class="score">{{ item.docScoure }}</span> 星-->
      <!--<img src="../../../../static/img/left-arrow.png" alt="">-->
      <!--</span>-->
      <!--</li>-->
      <!--</router-link>-->
      <!--</ul>-->
      <!--</div>-->
      <!--<div v-if="showRoom">-->
      <!--<ul class="border-1px" v-for=" item in doctorList" v-if="showRoom && item.docDeptName == sortPick">-->
      <!--<router-link tag="div" :to="{ path:'/onlineDoctorCard',query:{docId:item.docId} }">-->
      <!--<li>-->
      <!--<div class="cancelImg">-->
      <!--<img :src="item.docAvatar" alt="">-->
      <!--</div>-->
      <!--<div class="cancelIntro">-->
      <!--<div>-->
      <!--<span class="myDoctor"><span class="titleName">{{ item.docName }}</span> <span class="rankName">{{ item.docTitle }}  {{ item.docDeptName }}</span></span>-->
      <!--<p>{{ item.docHosName }}</p>-->
      <!--<p class="sortName"><span>{{ item.docPicConsultStatus == true ? "图文咨询":"" }}</span>-->
      <!--<span>{{ item.docVideoConsultStatus == true ? "视频问诊":"" }}</span>-->
      <!--</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<span class="distance">-->
      <!--<span class="score">{{ item.docScoure }}</span> 星-->
      <!--<img src="../../../../static/img/left-arrow.png" alt="">-->
      <!--</span>-->
      <!--</li>-->
      <!--</router-link>-->
      <!--</ul>-->
      <!--</div>-->
      <div v-if="doctorList.length == 0" class="loading">
        <img src="../../../../static/img/loading.gif" alt="">
        <span>正在很努力的加载中...</span>
      </div>
      <div v-else>
        <ul class="border-1px" v-for=" item in doctorList">
          <router-link tag="div" :to="{ path:'/onlineDoctorCard',query:{docId:item.docId} }">
            <li>
              <div class="cancelImg">
                <img v-if="item.docAvatar" :src="item.docAvatar" alt=""
                     onerror="javascript:this.src='./static/img/doctorM.png'">
                <img v-else-if="item.docAvatar == ''" src="../../../../static/img/doctorM.png" alt="">
                <img src="../../../../static/img/doctorM.png" alt="" v-else>
              </div>
              <div class="cancelIntro">
                <div>
                  <span class="myDoctor"><span class="titleName">{{ item.docName }}</span> <span
                    class="rankName">{{ item.docTitle }} </span></span>
                  <p>{{ item.docHosName }}  {{ item.docDeptName }} </p>
                  <p class="sortName"><span> <img src="../../../../static/img/11.png" alt=""
                                                  v-if="item.docPicConsultStatus == true"> {{ item.docPicConsultStatus == true ? "图文咨询" : ""
                    }}</span>
                    <span> <img src="../../../../static/img/shipin.png" alt=""
                                v-if="item.docVideoConsultStatus == true"> {{ item.docVideoConsultStatus == true ? "视频咨询" : ""
                      }}</span>
                  </p>
                </div>
              </div>
              <!--<span class="distance" v-if="item.docScoure">-->
              <!--<span class="score" >{{ item.docScoure.toFixed(1) }}</span> 分-->
              <!--</span>-->
              <span class="distance" v-if="item.docScoure">
                      <span class="score">{{ item.docScoure.toFixed(1) }}</span> 分
                      <img src="../../../../static/img/left-arrow.png" alt="">
                    </span>
              <span class="distance" v-else>
                      暂无评分
                      <img src="../../../../static/img/left-arrow.png" alt="">
                    </span>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import BScroll from 'better-scroll'
  import api from '../../../lib/api'
  import weui from 'weui.js'
  import {isLoginMixin} from "../../../lib/mixin"
  import {tokenCache} from '../../../lib/cache'

  export default {
    mixins: [isLoginMixin],
    data() {
      return {
        title: "网络诊间",
        rightTitle: "我的咨询",
        sortBy: '',
        sortPick: "",
        firstPick: "",
        typePick: "",
        showVideo: false,
        showPicture: false,
        showAllType: false,
        showRoom: false,
        defaultPick: "",
        angle: 0,
        doctorList: [],
        roomId: "",
        firstRoom: "",
        allRoom: [
          {
            gbDeptName: "全部科室",

          }
        ],
        together: "",
        childRoom: "",
        restaurant_category_id: "",
        categoryDetail: null,
        clickIndex: 0,
        gbDeptCode: "",
        arrow: [],
        doctorScroll: null
      }
    },
    created() {
      api("nethos.doc.list", {}).then((data) => {
        if (data.code == 0) {
          this.doctorList = data.list;
          this._initScroll();
        } else if (!(data.msg)) {
          this.doctorList = false
          weui.alert("网络错误，请稍后重试")
        } else {
          this.doctorList = false
          weui.alert(data.msg)
        }
      })
      api("nethos.system.gbdept.list", {
        token: tokenCache.get()
      }).then((data) => {
        if (data.code == 0) {
          this.firstRoom = data.list
          this.together = this.allRoom.concat(this.firstRoom)
          this.categoryDetail = this.together[this.clickIndex].sonGbDeptList
//          console.log(item)
          console.log("下面是togetrher")
          console.log(this.together)
          console.log("上面是together")
          console.log(this.categoryDetail)
          this.together.forEach(item => {

            if (item.hasOwnProperty("sonGbDeptList")) {
              this.arrow.push('1')
            } else {
              this.arrow.push('0')
            }
          })
          console.log(this.arrow)
        } else if (!(data.msg)) {
          weui.alert("网络错误，请稍后重试")
        } else {
          weui.alert(data.msg)
        }
      })

//        api("nethos.hos.list",{
//        }).then((data)=>{
//          console.log(data.list)
//          this.roomId = data.list[0].hosId
//          api("nethos.dept.list",{
//            hosId:this.roomId
//          }).then((data)=>{
//             this.firstRoom =  data.list
//            console.log(data.list)
//
//          })
//        })
    },
    mounted() {

    },
    methods: {
      _initScroll() {
        setTimeout((res) => {
          this.doctorScroll = new BScroll(this.$refs.doctor, {
            click: true
          });
        }, 200)

      },
      _initWrapMenu() {
        if (this.displaySort = true) {
          this.wrapWholeScroll = new BScroll(this.$refs.wrapMenu, {
            click: true
          })
        } else {
          return
        }
      },
      _initWrapContent() {
        if (this.displaySort = true) {
          this.wrapWholeScroll = new BScroll(this.$refs.wrapContent, {
            click: true
          })
        } else {
          return
        }
      },
      onLoad() {
        this.doctorScroll && this.doctorScroll.refresh();
      },
      goMyConsult() {
        console.log(this.path)
        api("nethos.pat.info.get", {
          token: tokenCache.get()
        }).then((data) => {
          console.log(data.obj)
          if (data.code == 0) {
            console.log(data, 66666)
            this.$router.push('/myConsult/online/commented')
          } else {
            this.$router.push({
              path: "/bindRelativePhone",
              query: {backPath: this.path}
            });
          }
        })

      },
      goIndex() {
//            this.$router.push('/myProfile/index')
      },
      chooseType(type) {
        if (this.sortBy !== type) {
          this.sortBy = type
          if (type == 'displaySort') {
            this.$nextTick(() => {
              this._initWrapMenu()
              this._initWrapContent()
            });
          }
        } else {
          this.sortBy = ''
        }
      },
      hideCover() {
        this.sortBy = ''
      },
      displayAll() {

      },
      selectCategoryName(item, index) {
        this.clickIndex = index
        this.categoryDetail = this.together[index].sonGbDeptList;
        if (this.arrow[index] == 0) {
          console.log(item, "此处为空白")
          this.gbDeptCode = item.gbDeptCode
          this.sortPick = item.gbDeptName
          this.sortBy = ''
          if (this.typePick == "视频问诊") {
            if (this.defaultPick == '按好评排') {
              api("nethos.doc.list", {
                gbDeptCode: this.gbDeptCode,
                docVideoConsultStatus: true,
                sort: "docScoure.desc",
              }).then((data) => {
                if (data.code == 0) {
                  this.doctorList = data.list
                  console.log(data.list)
                } else {
                  weui.alert(data.msg)
                }
              })
            } else {
              api("nethos.doc.list", {
                gbDeptCode: this.gbDeptCode,
                docVideoConsultStatus: true,
              }).then((data) => {
                if (data.code == 0) {
                  this.doctorList = data.list
                  console.log(data.list)
                } else {
                  weui.alert(data.msg)
                }
              })
            }
            this.$set(this.$data, 'showVideo', true)
          } else if (this.typePick == "图文咨询") {
            if (this.defaultPick == '按好评排') {
              api("nethos.doc.list", {
                gbDeptCode: this.gbDeptCode,
                docPicConsultStatus: true,
                sort: "docScoure.desc",
              }).then((data) => {
                if (data.code == 0) {
                  this.doctorList = data.list
                  console.log(data.list)
                } else {
                  weui.alert(data.msg)
                }
              })
            } else {
              api("nethos.doc.list", {
                gbDeptCode: this.gbDeptCode,
                docPicConsultStatus: true,
              }).then((data) => {
                if (data.code == 0) {
                  this.doctorList = data.list
                  console.log(data.list)
                } else {
                  weui.alert(data.msg)
                }
              })
            }
            this.$set(this.$data, 'showVideo', false)
            this.$set(this.$data, 'showPicture', true)
          } else {
            if (this.defaultPick == '按好评排') {
              api("nethos.doc.list", {
                gbDeptCode: this.gbDeptCode,
                sort: "docScoure.desc",
              }).then((data) => {
                if (data.code == 0) {
                  this.doctorList = data.list
                  console.log(data.list)
                } else {
                  weui.alert(data.msg)
                }
              })
            } else {
              api("nethos.doc.list", {
                gbDeptCode: this.gbDeptCode,
              }).then((data) => {
                if (data.code == 0) {
                  this.doctorList = data.list
                  console.log(data.list)
                } else {
                  weui.alert(data.msg)
                }
              })
            }
            this.$set(this.$data, 'showVideo', false)
            this.$set(this.$data, 'showPicture', false)
            this.$set(this.$data, 'showAllType', true)
          }
        }
      },
      selectSecond(index, item) {
        this.gbDeptCode = item.gbDeptCode
        console.log(this.gbDeptCode)
        if (this.typePick == "视频问诊") {
          if (this.defaultPick == '按好评排') {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docVideoConsultStatus: true,
              sort: "docScoure.desc",
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docVideoConsultStatus: true,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
          this.$set(this.$data, 'showVideo', true)
        } else if (this.typePick == "图文咨询") {
          if (this.defaultPick == '按好评排') {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docPicConsultStatus: true,
              sort: "docScoure.desc",
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docPicConsultStatus: true,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
          this.$set(this.$data, 'showVideo', false)
          this.$set(this.$data, 'showPicture', true)
        } else {
          if (this.defaultPick == '按好评排') {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              sort: "docScoure.desc",
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
          this.$set(this.$data, 'showVideo', false)
          this.$set(this.$data, 'showPicture', false)
          this.$set(this.$data, 'showAllType', true)
        }
//          api("nethos.doc.list",{
//            gbDeptCode:this.gbDeptCode
//          }).then((data)=>{
//            this.doctorList = data.list
//            console.log(data.list)
//          })
      }
    },
    components: {
      "VHeader": header
    },
    watch: {
      sortPick() {
        this.sortBy = ''
        this.$set(this.$data, 'showRoom', true)

      },
//      firstPick(){
//         console.log(this.firstPick)
//         api("nethos.dept.info",{
//           deptId:this.firstPick
//         }).then((data)=>{
//             console.log(data)
//         })
//      },
      typePick() {
        this.sortBy = ''
        if (this.typePick == "视频问诊") {
          if (this.defaultPick == '按好评排') {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docVideoConsultStatus: true,
              sort: "docScoure.desc",
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docVideoConsultStatus: true,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
          this.$set(this.$data, 'showVideo', true)
        } else if (this.typePick == "图文咨询") {
          if (this.defaultPick == '按好评排') {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docPicConsultStatus: true,
              sort: "docScoure.desc",
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docPicConsultStatus: true,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
          this.$set(this.$data, 'showVideo', false)
          this.$set(this.$data, 'showPicture', true)
        } else {
          if (this.defaultPick == '按好评排') {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              sort: "docScoure.desc",
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
          this.$set(this.$data, 'showVideo', false)
          this.$set(this.$data, 'showPicture', false)
          this.$set(this.$data, 'showAllType', true)
        }
        this.$nextTick(() => {
          setTimeout(() => {
            this._initScroll();
          }, 200)
        });
      },
      defaultPick() {
        this.sortBy = ''
        if (this.defaultPick == '按好评排') {
          if (this.typePick == "视频问诊") {
            api("nethos.doc.list", {
              sort: "docScoure.desc",
              gbDeptCode: this.gbDeptCode,
              docVideoConsultStatus: true
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else if (this.typePick == "图文咨询") {
            api("nethos.doc.list", {
              sort: "docScoure.desc",
              gbDeptCode: this.gbDeptCode,
              docPicConsultStatus: true
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              sort: "docScoure.desc",
              gbDeptCode: this.gbDeptCode,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
        } else {
          if (this.typePick == "视频问诊") {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docVideoConsultStatus: true
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else if (this.typePick == "图文咨询") {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
              docPicConsultStatus: true
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          } else {
            api("nethos.doc.list", {
              gbDeptCode: this.gbDeptCode,
            }).then((data) => {
              if (data.code == 0) {
                this.doctorList = data.list
                console.log(data.list)
              } else {
                weui.alert(data.msg)
              }
            })
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';

  .search {
    position: absolute;
    left: 0;
    top: 50px;
    right: 0;
    background-color: white;
    z-index: 60;
    @include h_lh(40px);
    > div {
      color: #666666;
      text-align: center;
    }
  }

  .showlist-enter-active, .showlist-leave-active {
    transition: all 0.2s ease-out;
    transform: translateY(0);
  }

  .showlist-enter, .showlist-leave-active {
    opacity: 0;
    transform: translateY(-100%)
  }

  .showcover-enter-active, .showcover-leave-active {
    transition: opacity .3s
  }

  .showcover-enter, .showcover-leave-active {
    opacity: 0
  }

  .back_cover {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 3;
    opacity: 0.3;
    background-color: rgb(0, 0, 0);
  }

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    position: fixed;
    top: 90px;
    line-height: 40px;
    z-index: 60;
    background-color: white;
    .tab-item {
      flex: 1;
      text-align: center;
      .sort_icon {
        /*position: absolute;*/
        /*top: 15px;*/
        /*right: 5px;*/
        transition: 0.3s;
        fill: #666;
      }
      /*position: relative;*/
      /*background-color: #0BB20C;*/
      span {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        font-size: 30rem/$rem;
        color: #333333;
        /*display: flex;*/
        /*align-items: center;*/
        /*justify-content: center;*/

      }
    }
    .choose_type {
      span {
        color: $mainColor;
      }
      .sort_icon {
        transform: rotate(180deg);
        transition: 0.3s;
        fill: $mainColor;
      }
    }
    .tab-item:last-child {
      border-right: none;
    }
  }

  .dropType {
    position: absolute;
    z-index: 4;
    top: 130px;
    width: 100%;
    /*background-color: #0BB20C;*/
    background-color: white;
    .weuiMargin {
      margin: 0;
      p {
        font-size: 32rem/$rem;
        color: #333333;
      }
    }
    li {
      list-style-type: none;
      height: 50px;
      line-height: 50px;
      font-size: 32rem/$rem;
      color: #333333;
    }
  }

  .allRoom {
    height: 800rem/$rem;
    overflow: hidden;
    /*background-color: #04BE02;*/
    .wrapWhole {
      display: flex;
      .wrapMenu {
        flex: 1;
        height: 800rem/$rem;
        overflow: hidden;
        ul {
          li {
            list-style-type: none;
            background-color: $bgColor2;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              padding-left: 30rem/$rem;
              font-size: 32rem/$rem;
              color: #333333;
              line-height: 20px;
            }
            img {
              width: 16rem/$rem;
              height: 24rem/$rem;
              padding-right: 10rem/$rem;
            }
          }
          .category_active {
            background-color: white !important;
          }
        }
      }
      .wrapContent {
        flex: 2;
        height: 800rem/$rem;
        overflow: hidden;
        ul {
          li {
            list-style-type: none;
            padding-left: 50rem/$rem;
            font-size: 32rem/$rem;
            color: #999999;
          }
        }
      }
    }
  }

  .roomList {
    position: fixed;
    top: 130px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    .loading {
      position: absolute;
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
    ul {
      padding: 0;
      margin: 0;
      position: relative;
      height: 180rem/$rem;
      /*border-bottom: 1px solid rgb(205,205,205);*/
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
            width: 120rem/$rem;
            height: 120rem/$rem;
            border-radius: 7px;
          }
        }
        .cancelIntro {
          flex: 2;
          display: flex;
          align-items: center;
          /*line-height: 25px;*/
          > div {
            .myDoctor {
              border-radius: 5px;
              display: inline-block;
              font-size: 32rem/$rem;
              color: #333333;
              line-height: 1.6;
              /*line-height: 18px;*/
              text-align: center;
              .titleName {
                font-size: 32rem/$rem;
                color: #333333;
              }
              .rankName {
                font-size: 28rem/$rem;
                color: #666666;
              }
            }
            p {
              margin: 0;
              color: #999999;
              font-size: 28rem/$rem;
            }
            p.sortName {
              width: 400rem/$rem;
              color: $mainColor;
              display: flex;
              justify-content: space-between;
              span {
                display: flex;
                align-items: center;
                img {
                  width: 40rem/$rem;
                  height: 40rem/$rem;
                  margin-right: 8px;
                }
              }
            }
          }
        }
        .distance {
          position: absolute;
          right: 30rem/$rem;
          top: 78rem/$rem;
          font-size: 28rem/$rem;
          color: #999999;
          .score {
            color: $assistWordBrown;
          }
          img {
            width: 16rem/$rem;
            height: 24rem/$rem;
            margin-left: 5px;
          }
        }
      }
    }
    > * {
      touch-action: none;
    }
  }
</style>
