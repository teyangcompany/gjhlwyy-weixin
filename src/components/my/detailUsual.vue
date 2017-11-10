<template>
  <div class="page flex">
    <app-header class="header flex0" ref="header" title="常用就诊人">
      <i slot="back"></i>
      <div class="right" slot="right" @click="del">删除</div>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <div class="wrap flex" @click="handleRealName(compatInfo.isRealnameAuth)">
        <div class="label flex0">
          实名认证
        </div>
        <div class="text flex1">
          {{compatInfo.isRealnameAuth | isAuth}}
        </div>
      </div>

      <div class="title">
        个人信息
      </div>

      <div class="wrap flex" @click="edit('name',compatInfo.compatName)">
        <div class="label flex0">
          姓名
        </div>
        <div class="text flex1">
          {{compatInfo.compatName}}
        </div>
      </div>

      <div class="wrap flex" @click="edit('idcard',compatInfo.compatIdcard)">
        <div class="label flex0">
          身份证
        </div>
        <div class="text flex1">
          {{compatInfo.compatIdcard}}
        </div>
      </div>

      <div class="wrap flex" @click="noChange">
        <div class="label flex0">
          手机号
        </div>
        <div class="text flex1">
          {{compatInfo.compatMobile}}
        </div>
      </div>

      <div class="wrap flex nobg">
        <div class="label flex0">
          年龄
        </div>
        <div class="text flex1">
          {{compatInfo.compatAge}}
        </div>
      </div>

      <div class="wrap flex nobg">
        <div class="label flex0">
          性别
        </div>
        <div class="text flex1">
          {{compatInfo.compatGender | getGender}}
        </div>
      </div>

      <div @click="area" class="wrap flex">
        <div class="label flex0">
          所在地区
        </div>
        <div class="text flex1">
          {{compatInfo.areaName}}
        </div>
      </div>

      <div class="wrap flex" @click="ship">
        <div class="label flex0">
          与我关系
        </div>
        <div class="text flex1">
          {{compatInfo.relationship}}
        </div>
      </div>

      <div class="title">
        医院信息
      </div>

      <div v-for="hos in compatInfo.records" class="wrap flex nobg">
        <div class="label">
          {{hos.hosName}}
        </div>
        <div class="text flex1">({{hos.compatMedicalRecord ? hos.compatMedicalRecord : ""}})</div>
      </div>
      <div class="wrap flex nobg">
        <router-link :to="{path:'/hospital',query:{action:'auth',compatId:compatInfo.compatId}}"
                     class="add flex1 center">+添加医院账号
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  import AppHeader from "../../plugins/app-header.vue"
  import api from '../../lib/api'
  import weui from 'weui.js'
  import {isAuth, getGender} from "../../lib/filter"
  import {mainHeightMixin} from "../../lib/mixin"
  import {debug} from "../../lib/util"
  import {relationship} from "../../lib/config"
  import getArea from "../../utils/formatArea"


  export default {
    data() {
      return {
        compatInfo: {},
        index: 0
      }
    },
    computed: {},
    created() {
      this.$route.query.index && (this.index = this.$route.query.index);
      this.getCompatInfo();
    },
    methods: {
      edit(type) {
        if (this.compatInfo.isRealnameAuth) {
          weui.alert("<i class='weui-icon-warn weui-icon-size70'></i><br/><br/>" +
            "您已通过实名认证，无法修改姓名、身份证号", {
            buttons: [
              {
                label: "我知道了",
                type: "primary"
              }
            ]
          })
          return
        }

        this.$router.push({
          path: "/my/edit",
          query: {
            service: "nethos.pat.compat.modify.v2",
            mode: type,
            value: value,
            id: this.compatInfo.compatId
          }
        })

      },
      noChange() {
        weui.alert("微信不允许修改手机号，请下载app")
      },
      async getCompatInfo() {
        let data = await  api("nethos.pat.compat.list", {})
        if (data.code == 0) {
          this.compatInfo = data.list[this.index] || {};
          if (this.compatInfo.selfCompat) {
            this.$router.replace("/my/data");
          }
        } else {
          weui.alert(data.msg);
        }
      },
      handleRealName(auth) {
        let path = "/my/auth", query = {
          compatId: this.compatInfo.compatId
        }
        this.$router.push({path, query});
      },
      async modify(form) {
        let loading = weui.loading("修改中...");
        let options = {
          compatId: this.compatInfo.compatId
        }
        options = Object.assign({}, options, form);
        let ret = await api("nethos.pat.compat.modify.v2", options);
        loading.hide();
        if (ret.code == 0) {
          let userInfo = Object.assign({}, this.compatInfo, ret.obj);
          this.compatInfo = userInfo;
          setTimeout((res) => {
            weui.toast("修改成功");
          }, 200)
        }

      },
      ship() {
        let menus = relationship.map((item) => {
          return {
            label: item,
            onClick: () => {
              this.modify({
                relationship: item
              })
            }
          }
        })

        weui.actionSheet(menus, [
          {
            label: '取消',
            onClick: () => {
            }
          }
        ]);


      },
      area() {
        let that = this;
        let container = "body", list = getArea(), defaultValue = this.compatInfo.areaCode;
        defaultValue && (defaultValue = getArea(this.compatInfo.areaCode, 'code'))
        let options = {
          container,
          defaultValue,
          onConfirm(arr) {
            that.modify({
              areaCode: arr[2].value
            })
          }
        }
        weui.picker(list, options)
      },
      del() {
        let that = this;
        weui.confirm("是否删除该常用就诊人?", () => {
          that.delete()
        })
      },
      async delete() {
        let loading = weui.loading("加载中...")
        let compatId = this.compatInfo.compatId, ret = await api("nethos.pat.compat.delete", {compatId})
        loading.hide();
        if (ret.code == 0) {
          setTimeout(() => {
            weui.toast("删除成功")
          }, 500)
          this.$router.go(-1);
        } else {
          setTimeout((res) => {
            weui.alert(ret.msg);
          }, 500)

        }
      }
    },
    mixins: [mainHeightMixin],
    filters: {
      isAuth, getGender
    },
    components: {
      AppHeader,
    }
  }
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
      line-height: 1;
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
