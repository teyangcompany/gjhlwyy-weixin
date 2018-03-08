<template>
    <div class="page bg">
        <app-header title="常用就诊人">
            <i slot="back" class="back"></i>
            <router-link to="/addUsualPatient" tag="div" class="right absolute" slot="right">添加</router-link>
        </app-header>
        <scroll :height="scrollHeight" class="overflow-hidden" :data="list">
            <ul>
                <router-link :key="index" tag="li" :to="{path:'/detailUsual',query:{index:index}}" class="flex"
                             v-for="(item,index) in list">
                    <div class="flex1 lh1">
                        <h3 class="flex">
                            <div class="name fs40 mr30 color_333">{{item.compatName}}</div>
                            <div class="sex mr30 fs35 color_666">{{item.compatGender|getGender}}</div>
                            <div class="age mr30 fs35 color_666">{{item.compatAge}}</div>
                            <div class="status">
                                <span class="block fs30 color_999" :class="['status'+item.isRealnameAuth]">{{item.isRealnameAuth|isAuth}}</span>
                            </div>
                        </h3>
                        <div class="idcard flex fs35">
                            <my-label class="flex0 color_999" title="身份证号"></my-label>
                            <span class="flex1 color_777 fs35">{{item.compatIdcard|formatCardAndMobile(3,4,11)}}</span>
                        </div>
                        <div class="phone flex fs35">
                            <my-label class="flex0 color_999" title="手机号码"></my-label>
                            <span class="flex1 color_777 fs35">{{item.compatMobile|formatCardAndMobile(3,4,4)}}</span>
                        </div>
                        <div class="medical flex fs35">
                            <my-label class="flex0 color_999" title="病案号"></my-label>
                            <span class="flex1 color_777 fs35">{{item.compatMedicalRecord||'暂无病案号'}}</span>
                        </div>
                    </div>
                    <div class="flex0 icon">
                        <img src="../../../static/img/arrow.png" alt="">
                    </div>
                </router-link>
            </ul>
        </scroll>
    </div>
</template>

<script>
  import AppHeader from '../../plugins/app-header'
  import {scrollHeightMixin} from "../../lib/mixin";
  import Scroll from '../../plugins/scroll'
  import MyLabel from '../../plugins/my-label'
  import api from '../../lib/api'
  import weuijs from 'weui.js'
  import {getGender, isAuth, formatCardAndMobile} from "../../lib/filter";

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {},
    filters: {getGender, isAuth, formatCardAndMobile},
    components: {AppHeader, Scroll, MyLabel},
    mixins: [scrollHeightMixin],
    created() {
      this.getList();
    },

    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async getList() {
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.pat.compat.list', {});
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          //this.$refs.msg.show(ret.msg||"错误代码"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
    @import "../../common/public";

    .fs40 {
        font-size: 16px;
    }

    .fs35 {
        font-size: 14px;
    }

    .fs30 {
        font-size: 12px;
    }

    .mr30 {
        margin-right: px2rem(30px, 1080);
    }

    h3 {
        align-items: center;
        height: 20px;
    }

    .status {
        .statusfalse {
            border: 1px solid red;
            color: red;
        }
        span {
            border: 1px solid #999999;
            padding: 2px 5px;
            border-radius: 3px;
        }
    }

    .icon {
        img {
            width: px2rem(17px, 750);
        }
    }

    li {
        background-color: white;
        padding: px2rem(60px, 1080) px2rem(40px, 1080);
        align-items: center;
        .my-label {
            margin-right: px2rem(30px, 1080);
            width: px2rem(65px, 375);
            justify-content: space-between;
        }

        .idcard, .phone, .medical {
            margin-top: px2rem(57px, 1080);
        }
    }

    li + li {
        margin-top: px2rem(27px, 1080);
    }

    ul {
        padding-top: px2rem(27px, 1080);
    }

</style>
