<template>
  <div class="page flex">
    <app-header title="体检报告详情" class="flex0">
      <i class="back" slot="back"></i>
    </app-header>
    <ul class="nav flex flex0">
      <li class="flex0 center" :class="[index==currentIndex?'cover':'']" @click="currentIndex=index"
          v-for="(item,index) in navs">{{item.name}}
      </li>
    </ul>
    <div id="test-detail" class="main flex1 overflow-y-auto overflow-touch">
      <template v-if="currentIndex==0">
        <div class="wrap" v-html="info.zONGJIANXJ"></div>
        <dl>
          <div>
            <dt>总检医生：</dt>
            {{info.zONGJIANYS}}
          </div>
          <div>
            <dt>审核医生：</dt>
            {{info.sHENHEYS}}
          </div>
          <div>
            <dt>总检日期：</dt>
            {{info.zONGJIANRQ}}
          </div>
          <div>
            <dt>审核日期：</dt>
            {{info.sHENHERQ}}
          </div>
          <div>
            <dt>体检医院：</dt>
            浙江大学医学院附属第二医院
          </div>
        </dl>
      </template>
      <template v-if="currentIndex==1">
        <div v-html="info.zONGJIANJY" class="wrap"></div>
      </template>
      <div class="notice" v-if="currentIndex<2">
        <h3>温馨提示：</h3>
        <p>1.体检结论仅根据本次所检项目结果所做，可能难以全面
          反映您的健康状况。</p>
        <p>2.您过去所患的疾病，因这次体检范围所限未能发现到的
          情况，仍按原诊断及治疗。</p>
        <p>3.查出的疾病请及时到专科就诊治疗。</p>
      </div>
      <template v-if="currentIndex==2">
        <div class="rep">
          <h3 class="flex">
            <div class="title flex1 fs16">检验报告</div>
            <div class="more color_main flex0">查看<font class="iconfont">&#xe72b;</font></div>
          </h3>
          <div class="jianyan-box">
            <jy-item v-for="(o,i) in examinationDetailsTest" :key="i" :o.sync="o" :i="i" @open="openT"></jy-item>
          </div>
        </div>
        <div class="rep">
          <h3 class="flex">
            <div class="title flex1 fs16">检查报告</div>
            <div class="more color_main flex0">查看<font class="iconfont">&#xe72b;</font></div>
          </h3>
          <div class="jiancha-box">
            <jc-item v-for="(o,i) in examinationDetailsExamination" :key="i" :o="o" :i="i" @open="openE"></jc-item>
          </div>
        </div>
        <p style="height: 10px">&nbsp;</p>
      </template>
    </div>
    <div class="sub center flex0">咨询医生</div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {compatCache, testCache} from "../../../lib/cache"
  import JyItem from '../../../plugins/report/jyitem'
  import JcItem from '../../../plugins/report/jcitem'

  const NAVS = [
    {name: '体检结果'},
    {name: '医生建议'},
    {name: '体检报告'},
  ]

  export default {
    data() {
      return {
        currentIndex: 0,
        navs: NAVS,
        pat: {},
        info: {},
        examinationDetailsTest: [],
        examinationDetailsExamination: []
      };
    },
    computed: {},
    components: {JcItem, JyItem},
    mixins: [],
    created() {
      this.info = testCache.get();
      this.pat = compatCache.get();
      this.info.zONGJIANXJ = this.info.zONGJIANXJ.replace(/[\d]+\.[^\d]+?[：:]{1}/g, res => `<h5>${res}</h5><p>`);
      this.info.zONGJIANXJ = this.info.zONGJIANXJ.replace(/[↑↓]{1}/g, res => `<font class="red">${res}</font>`);
      this.info.zONGJIANJY = this.info.zONGJIANJY.replace(/\r/g, res => `<br/>`);
      this.info.zONGJIANJY = this.info.zONGJIANJY.replace(/[\d]+\.[^<]+?<br\/>/g, res => `<h5>${res}</h5><p>`);
      this.getData(this.info.tIJIANBM, this.info.bAH);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      openT(index) {
        this.examinationDetailsTest.map((res, i) => {
          if (i == index) res.open = !res.open;
          else res.open = false;
          return res;
        })
      },

      openE(index) {
        this.examinationDetailsExamination.map((res, i) => {
          if (i == index) res.open = !res.open;
          else res.open = false;
          return res;
        })
      },

      async getData(TIJIANBM, BAH) {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('zheer.yygh.ApiJyjcService.ExamListDetails', {TIJIANBM, BAH});
        loading.hide();
        if (ret.code == 0) {
          this.examinationDetailsTest = ret.examinationDetailsTest.map((res) => {
            res.open = false;
            res = Object.assign({}, res.list[0], res);
            return res;
          });
          this.examinationDetailsExamination = ret.examinationDetailsExamination.map((res) => {
            res.open = false;
            return res;
          });
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../common/public";

  .page {
    flex-direction: column;
  }

  .jianyan-box {
    margin: 0 -10px;
  }

  .main {
    background: $bgColor;
    padding-top: 10px;
  }

  .rep {
    padding: 10px;
    border-radius: 5px;
    margin: 0 10px;
    background-color: white;
    h3 {
      .more {
        font-size: 12px;
      }
    }
  }

  .rep + .rep {
    margin-top: 10px;
  }

  .notice {
    color: #666666;
    padding: 10px;
    h3 {
      font-size: 14px
    }
    p {
      font-size: 12px
    }
  }

  dl {
    background-color: white;
    margin-top: 10px;
    padding: 10px;
    div {
      display: flex
    }
    dt {
      color: #666666;
    }
  }

  .nav {
    li {
      width: (100%/3);
      @include h_lh(40px);
    }
    .cover {
      @include border(bottom, $mainColor, after, solid, 4px);
    }
  }

  .sub {
    @include h_lh(45px);
    background-color: $mainColor;
    color: white;
  }
</style>
