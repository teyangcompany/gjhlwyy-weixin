<template>
  <scroll class="list overflow-hidden" :height="scrollHeight" :probeType="2" :pullup="true"
          :data="list" @scrollToEnd="scrollToEnd">
    <ul>
      <div class="nodata center fs40" v-if="list.length==0">
        暂无咨询记录
        <br>
        <router-link to="/internetRoom">问医生</router-link>
      </div>
      <li @click="goDetail(item)" class="lh1"
          v-for="(item,index) in list" :key="index">
        <h3 class="flex">
          <div class="name flex0 color_333">{{item.consultTypeName}}</div>
          <div class="price flex1">￥{{item.consultFee}}</div>
          <div class="status flex0 color_333">{{item.consultStatusDescription}}</div>
        </h3>
        <div class="p color_333 fs40">
          {{item.consultContent}}
        </div>
        <div class="doc flex fs40">
          <div class="name flex1 color_999">{{item.teamName||item.docName||'医助团队'}}</div>
          <div class="time flex0 color_666">{{item.createTime|consultTime}}</div>
        </div>
      </li>
    </ul>
  </scroll>
</template>

<script>
  import {scrollHeightMixin} from "../../../lib/mixin";
  import Scroll from '../../../plugins/scroll'
  import weuijs from 'weui.js'
  import {formatTime} from "../../../lib/filter";
  import api from '../../../lib/api'
  import {DOWNLOAD, DOWNLOAD_CONTENT} from "../../../lib/config";

  export default {
    data() {
      return {
        hasNextPage: true,
        status: '',
        page: 1,
        list: [],
        bottomHeight: 0
      };
    },
    computed: {},
    filters: {
      consultTime: (time) => {
        let cha = new Date().getTime() - time;
        if (cha < 60 * 1000) {
          return "刚刚";
        } else if (cha < 3600 * 1000) {
          return `${Math.round(cha / 1000 / 60)}分钟前`;
        } else {
          return formatTime(time, '%Y-%m-%d %H:%M');
        }
      }
    },
    mixins: [scrollHeightMixin],
    components: {Scroll},
    created() {
      this.init();
      this.getStatus();
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      $route(newV, oldV) {
        if (newV != oldV) {
          this.list.splice(0);
          this.getStatus();
          this.getList();
        }
      }
    },
    methods: {
      goDetail(item) {
        if (['DOCPIC', 'TEAMPIC'].indexOf(item.consultType) >= 0) {
          this.$router.push({path: '/waitArrange', query: {consultId: item.consultId}})
        } else {
          weuijs.confirm(`${DOWNLOAD_CONTENT}进行${item.consultTypeName}`, {
            title: '提示',
            buttons: [
              {
                label: '取消',
                type: 'default',
                onClick: () => {
                }
              },
              {
                label: '下载APP',
                type: 'primary',
                onClick: () => {
                  location.href = DOWNLOAD
                }
              }
            ]
          })
        }

      },
      scrollToEnd() {
        if (this.hasNextPage) {
          this.page++;
          this.getList();
        }
      },
      getStatus() {
        let {params} = this.$route;
        if (params && params.status) {
          this.status = params.status;
        }
      },
      init() {
        let dom = document.querySelector('.my-consult-nav');
        if (!dom) {
          setTimeout(this.init, 20);
        } else {
          let obj = dom.getBoundingClientRect();
          obj.height && (this.bottomHeight = obj.height);
          this._calcScrollHeight();
        }
      },
      async getList() {
        let loading = weuijs.loading("加载中...");
        let params = {
          pageNo: this.page,
          pageSize: 10,
          sort: "create_time.desc"
        };
        if (this.status !== 'all') {
          params.statusList = [this.status];
        }
        let ret = await api('nethos.consult.info.list', params);
        if (ret.code == 0) {
          this.hasNextPage = ret.paginator.hasNextPage;
          this.list = this.list.concat(ret.list);
        } else {
          //this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../common/public";

  .fs40 {
    font-size: px2rem(40px, 1080);
  }

  .list {
    background-color: #F8F8F8;
  }

  ul {
    padding-bottom: px2rem(26px, 1080);
    padding-top: px2rem(26px, 1080);
    li + li {
      margin-top: px2rem(26px, 1080);
    }
  }

  li {
    background-color: white;
    padding: px2rem(50px, 1080) px2rem(42px, 1080) px2rem(34px, 1080) px2rem(42px, 1080);
  }

  h3 {
    @include border();
    padding-bottom: px2rem(50px, 1080);
    font-size: px2rem(43px, 1080);
  }

  .price {
    margin-left: $commonSpace;
    color: orange;
  }

  .p {
    padding: px2rem(34px, 1080) 0 px2rem(55px, 1080) 0;
    line-height: 1.5;
  }
</style>
