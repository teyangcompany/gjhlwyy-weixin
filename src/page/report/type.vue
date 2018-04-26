<template>
  <div class="page flex">
    <app-header title="诊疗报告">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main flex1">
      <ul>
        <li v-for="(item,index) in types" class="flex" @click="handler(index,item)">
          <label class="flex1">{{item.name}}</label>
          <span class="flex0 iconfont">&#xe72a;</span>
        </li>
      </ul>

      <div>
        <h3>温馨提示：</h3>
        <p>1.检验报告：查看血常规、尿检等生化类报告单信息；</p>
        <p>2.检查报告：查看CT、MRI（磁共振）、X光、B超等检查类报告单信息；</p>
        <p>3.报告仅供参考，请以医院实际纸质报告为准。</p>
      </div>

    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {compatCache} from "../../lib/cache";
  import {REPORT_TYPE} from "../../lib/config";

  export default {
    data() {
      return {
        index: 0,
        list: [],
        types: REPORT_TYPE
      };
    },
    computed: {
      pat() {
        if (this.list.length > 0) return this.list[this.index]
        else return {}
      }
    },
    filters: {},
    components: {},
    mixins: [],
    created() {
      let {query} = this.$route;
      if (query && query.index) {
        this.index = query.index
      }
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      handler(index, data) {

        let {service} = data,
          {pat, pat: {compatMedicalRecord: patCard, compatId}} = this;
        compatCache.set(pat);
        this.$router.push({
          path: '/report/list',
          query: {index, patCard, compatId}
        })
      },

      async getList() {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('nethos.pat.compat.list', {});
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          this.$refs.msg.show(ret.msg || "错误代码" + ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .page {
    flex-direction: column;
  }

  .main {
    padding: px2rem(40px, 1080);
  }

  ul {
    border-radius: px2rem(40px, 1080);
    background-color: #f5fbfb;
  }

  li + li {
    @include border(top);
  }

  li {
    padding: 0 px2rem(40px, 1080);
    @include h_lh(px2rem(135px, 1080));
  }

  span {
    color: #666666;
  }

  h3 {
    margin: px2rem(40px, 1080) 0;
  }

  h3, p {
    color: #999;
  }
</style>
