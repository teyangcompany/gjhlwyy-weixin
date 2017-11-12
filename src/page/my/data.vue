<template>
  <div class="page flex">
    <app-header class="header flex0" ref="header" title="我的资料">
      <i slot="back"></i>
    </app-header>
    <div class="main overflow-y-auto" ref="main">
      <uploader @uploaded="uploaded" ref="uploader"></uploader>
      <div class="wrap flex">
        <div class="label flex1">
          头像
        </div>
        <div class="text flex0 ava">
          <img :src="patAva(userInfo)" @error="__avaError($event)" alt="" @click="uploadImg">
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

      <div class="wrap flex" @click="edit('name',sysCommonPatVo.compatName)">
        <div class="label flex0">
          姓名
        </div>
        <div class="text flex1">
          {{sysCommonPatVo.compatName}}
        </div>
      </div>

      <div class="wrap flex" @click="edit('card',sysCommonPatVo.compatIdcard)">
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

      <div class="wrap flex nobg">
        <div class="label flex0">
          年龄
        </div>
        <div class="text flex1">
          {{sysCommonPatVo.compatAge}}
        </div>
      </div>

      <div class="wrap flex nobg">
        <div class="label flex0">
          性别
        </div>
        <div class="text flex1">
          {{getSex(sysCommonPatVo.compatGender)}}
        </div>
      </div>

      <div @click="area" class="wrap flex">
        <div class="label flex0">
          所在地区
        </div>
        <div class="text flex1">
          {{userInfo.patAreaname}}
        </div>
      </div>

      <div class="wrap flex nobg">
        <div class="label flex0">
          与我关系
        </div>
        <div class="text flex1">
          本人
        </div>
      </div>

      <div class="title">
        医院信息
      </div>

      <div v-for="hos in sysCommonPatVo.records" class="wrap flex">
        <div class="label flex0">
          {{hos.hosName}}
        </div>
        <div class="text flex1">
          ({{hos.compatMedicalRecord}})
        </div>
      </div>
      <div class="wrap flex nobg">
        <router-link :to="{path:'/hospital',query:{action:'auth',compatId:sysCommonPatVo.compatId}}"
                     class="add flex1 center">+添加医院账号
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header.vue"
  import {isBindMixin, mainHeightMixin, avaErrorMixin} from "../../lib/mixin"
  import patAva from "../../utils/patAva"
  import getSex from "../../utils/getSex"
  import api from "../../lib/api"
  import weuijs from "weui.js"
  import Uploader from "../../plugins/upload.vue"
  import {debug} from "../../lib/util"
  import getArea from "../../utils/formatArea"

  export default {
    mixins: [isBindMixin, mainHeightMixin, avaErrorMixin],
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
      AppHeader, Uploader
    },
    created() {
      this._isBind().then((res) => {
        if (res !== false) {
          if (res.patAreacode && !res.patAreaname) {
            res.patAreaname = getArea(res.patAreacode, "text");
          }
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
      area() {
        let that = this;
        let container = "body", list = getArea(), defaultValue = this.userInfo.patAreacode;
        defaultValue && (defaultValue = getArea(this.userInfo.patAreacode, 'code'))
        let options = {
          container,
          defaultValue,
          onConfirm(arr) {
            that.modify({
              patAreacode: arr[2].value
            })
          }
        }

        weuijs.picker(list, options)
      },
      edit(type, value) {
        if (this.sysCommonPatVo.isRealnameAuth) {
          weuijs.alert("<p class='center'><i class='weui-icon-warn weui-icon-size70'></i></p><br>" +
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
            service: "nethos.pat.info.modify",
            mode: type,
            value: value,
            id: this.userInfo.patId
          }
        })
      },


      uploaded(ret) {
        if (ret.code == 0) {
          let form = {
            patAvatar: ret.obj.attaId
          }
          this.modify(form);
        }
      },

      async modify(form) {
        let loading = weuijs.loading("修改中...");
        let options = {
          patId: this.userInfo.patId
        }
        options = Object.assign({}, options, form);
        let ret = await api("nethos.pat.info.modify", options);
        loading.hide();
        if (ret.code == 0) {
          let userInfo = Object.assign({}, this.userInfo, ret.obj);
          this.userInfo = userInfo;
        }
        setTimeout((res) => {
          weuijs.toast("修改成功");
        }, 200)
      },

      uploadImg() {
        let dom = this.$refs.uploader.$el;
        dom.querySelector("input").click();
      },
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
        let query = {
          compatId: this.sysCommonPatVo.compatId
        }
        this.$router.push({
          path: "/my/auth",
          query: query
        })
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
      }
      .add {
        color: $mainColor;
      }
    }
    .ava {
      @include ava(50px);
    }
  }
</style>
