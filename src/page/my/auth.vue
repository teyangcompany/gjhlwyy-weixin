<template>
  <div class="auth page flex">
    <app-header title="实名认证" class="flex0">
      <i slot="back"></i>
    </app-header>
    <div class="main">
      <h3 class="center">每人每天只能进行5次认证，请保证信息无误后再进行认证</h3>
      <ul>
        <li class="flex" @click="doAuth('hospital')">
          <div class="icon flex0"><img src="../../../static/img/yy.auth.png" alt=""></div>
          <div class="text flex1">
            <div class="name">医院认证</div>
            <div class="desc">绑定医院账号即完成认证</div>
          </div>
          <div class="right flex0">
            <ol :class="[hospital?'ok':'no']" class="flex flex-center">
              <li v-if="hospital===true"><i class="weui-icon-success"></i></li>
              <li class="t flex0">{{hospital | authText}}</li>
              <li class="i flex0" v-if="hospital===false"><img src="../../../static/img/arrow.png" alt="">
              </li>
            </ol>
          </div>
        </li>
        <li class="flex" @click="doAuth('police')">
          <div class="icon flex0"><img src="../../../static/img/ga.auth.png" alt=""></div>
          <div class="text flex1">
            <div class="name">公安认证</div>
            <div class="desc">由公安系统对您的姓名、<br>身份证号进行认证</div>
          </div>
          <div class="right flex0 ">
            <ol :class="[ploice?'ok':'no']" class="flex flex-center">
              <li v-if="ploice===true"><i class="weui-icon-success"></i></li>
              <li class="t flex0">{{ploice | authText}}</li>
              <li class="i flex0" v-if="ploice===false"><img src="../../../static/img/arrow.png" alt="">
              </li>
            </ol>
          </div>
        </li>
        <li class="flex">
          <div class="icon flex0"><img src="../../../static/img/yys.auth.png" alt=""></div>
          <div class="text flex1">
            <div class="name">运营商认证</div>
            <div class="desc">由运营商对您的姓名、<br>身份证号、手机号进行认证</div>
          </div>
          <div class="right flex0">
            <ol class="flex">
              <li class="t flex0">暂未开通</li>
            </ol>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import AppHeader from "../../plugins/app-header.vue"
  import {backpathCache} from "../../lib/cache"
  import {isBindMixin} from "../../lib/mixin"
  import weuijs from "weui.js"
  import api from "../../lib/api"
  import {debug} from "../../lib/util"

  export default {
    data() {
      return {
        ploice: false,
        hospital: false
      };
    },
    filters: {
      authText(auth) {
        return auth ? "已认证" : "点击认证"
      }
    },
    computed: {},
    mixins: [isBindMixin],
    components: {AppHeader},
    created() {
      this._isBind().then((res) => {
        if (res !== false) {
          this.sysCommonPatVo = res.sysCommonPatVo
        }
      });
      this.compatId = this.$route.query.compatId;
      this.authDetail(this.compatId)
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      doAuth(type) {
        this[`doAuth_${type}`] && this[`doAuth_${type}`]();
      },
      async authDetail(compatId) {
        //await api("nethos.sys.user.auth.list")
        try {
          let ret = await api("nethos.sys.user.auth.list", {
            compatId
          });
          if (ret.code == 0) {
            let list = ret.list;
            list.forEach((item) => {
              this.$set(this.$data, item.authType.toLowerCase(), item.enabled);
              debug('data', this.$data);
            });
          }
        } catch (e) {
          throw e;
        }


      },

      async doAuth_police() {
        if (this.ploice) {
          return
        }
        let loading = weuijs.loading("加载中");
        let ret = await api("nethos.sys.user.auth", {
          name: this.sysCommonPatVo.compatName,
          compatId: this.compatId,
          Idcard: this.sysCommonPatVo.compatIdcard
        })
        loading.hide()
        if (ret.code == 0 && ret.obj === true) {
          setTimeout(() => {
            weuijs.toast("认证成功");
            this.authDetail(this.compatId);
          }, 200)
        }
      },
      doAuth_hospital() {
        if (this.hospital) {
          return
        }
        let query = {action: "auth"};
        if (this.$route.query && this.$route.query.compatId) {
          query.compatId = this.$route.query.compatId;
        }

        this.$router.push({
          path: "/hospital",
          query: query
        });
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .auth {
    flex-direction: column;
    .main {
      h3 {
        color: #2cb08b;
        background-color: #dbf9d7;
        padding: 10px 0px;
        font-size: 12px;
      }
      ul > li {
        @include border(bottom);
        padding: 10px;
        align-items: center;
        .icon {
          margin-right: 10px;
          img {
            width: 60px;
          }
        }
        .text {
          .name {
            font-size: 16px;
          }
          .desc {
            line-height: 1.3;
            padding-top: 5px;
            color: #999999;
            font-size: 12px;
          }
        }
        .right {
          ol {
            &.no {
              .t {
                color: #3685c7;
              }
            }
            &.ok {
              .t {
                color: #00a59a;
              }
            }
            li {
              &.t {
                color: #666;
                margin-right: 5px;
              }
              img {
                height: 15px;
              }
            }
          }
        }
      }
    }
  }
</style>
