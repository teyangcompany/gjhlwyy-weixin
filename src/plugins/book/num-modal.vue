<template>
  <div class="num" v-show="showTag">
    <div class="mask fixed" @click="hide"></div>
    <transition name="fade">
      <div class="main fixed bg_white flex" v-if="showTag">
        <h3 class="flex0">
          <div class="fs16"><span class="flex0 mr10 color_333">{{info.schemeDate.substr(0,10)}}</span>
            <span class="flex0 mr10 color_333">周{{info.weekNo|week}}</span>
            <span class="flex1 color_333">{{info.schemeAmpm|getOrderAmpm}}</span></div>
          <p class="color_999 fs14">号源时段以医院呢实际情况为准</p>
        </h3>
        <div class="list flex1 overflow-touch overflow-y-auto">
          <ul>
            <li v-for="(item,index) in list" :key="index" @click="check(item)" class="center color_333 fs16">
              {{item.numNo}}号 {{item.numTime.substr(11,5)}}
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {getOrderAmpm, week} from "../../lib/filter";
  import weuijs from 'weui.js'
  import api from '../../lib/api'

  export default {
    data() {
      return {
        showTag: false,
        info: {},
        list: []
      };
    },
    computed: {},
    filters: {week, getOrderAmpm},
    components: {},
    mixins: [],
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      check(data) {
        let scheme = this.info;
        this.$router.push({
          path: '/infoConfirm',
          query: {
            bookDeptId: scheme.bookDeptId,
            bookNumId: data.bookNumId,
            numTime: data.numTime,
            allInfo: JSON.stringify(scheme),
            listIndex: 0,
            bookSort: this.$route.query.bookSort
          }
        })
      },

      async show(data) {
        this.info = data;
        await this.getList(data.bookSchemeId);
        this.showTag = true;
      },
      hide() {
        this.showTag = false;
      },
      async getList(bookSchemeId) {
        let loading = weuijs.loading("加载中...");
        let ret = await api('nethos.book.num.list', {bookSchemeId})
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          //this.$refs.msg.show(ret.msg||"接口错误"+ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    transform: translateY(100%);
  }

  .mask, .main {
    @include t_r_b_l();
  }

  .mask {
    background-color: rgba(0, 0, 0, .5);
  }

  .main {
    flex-direction: column;
    top: 50%;
  }

  h3 {
    padding: $commonSpace;
    @include border();
  }

  li {
    @include h_lh(px2rem(105px, 1080));
  }

</style>
