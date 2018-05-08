<template>
  <div class="page flex">
    <app-header title="体检报告详情" class="flex0 header">
      <i class="back" slot="back"></i>
    </app-header>
    <ul class="nav flex flex0">
      <li class="flex0 center" :class="[index==currentIndex?'cover':'']" @click="currentIndex=index"
          v-for="(item,index) in navs">{{item.name}}
      </li>
    </ul>
    <div id="test-detail" class="main flex1 overflow-y-auto overflow-touch relative" @scroll="scroll($event)">
      <template v-if="currentIndex==0">
        <div class="wrap" v-html="info.htmlXJ"></div>
      </template>
      <template v-if="currentIndex==1">
        <div v-html="info.zONGJIANJY" class="wrap"></div>
      </template>
      <template v-if="currentIndex<2">
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
            {{info.zONGJIANRQ.substr(0,10)}}
          </div>
          <div>
            <dt>审核日期：</dt>
            {{info.sHENHERQ.substr(0,10)}}
          </div>
        </dl>
        <div class="notice">
          <h3>温馨提示：</h3>
          <p>1.体检结论仅根据本次所检项目结果所做，可能难以全面反映您的健康状况。</p>
          <p>2.您过去所患的疾病，因这次体检范围所限未能发现到的情况，仍按原诊断及治疗。</p>
          <p>3.查出的疾病请及时到专科就诊治疗。</p>
          <p>4.若需复查相关异常体检指标，或有不明之处可来国际保健中心一楼健康咨询门诊，我们将提供优质的健康保健指导。</p>
          <p>5.为了尊重和保护您的个人隐私，本保健中心在每一份体检报告上都粘有封口带，请您在取到体检报告后确认封口带的完整性。</p>
        </div>
      </template>
      <template v-if="currentIndex==2">
        <div class="notice2">(异)仅代表存在异常指标,其它的检查项目也请仔细查看</div>
        <div class="rep">
          <h3 class="flex">
            <div class="title flex1 fs16">检验报告</div>
            <div class="more color_main flex0" @click="show(0)">{{showPart[0]?'收起':'查看'}}<font
              class="iconfont"
              :class="[showPart[0]?'close':'open']">&#xe72d;</font>
            </div>
          </h3>
          <div class="jianyan-box" v-if="showPart[0]">
            <jy-item ref="jy" v-for="(o,i) in examinationDetailsTest" :key="i" :o.sync="o" :i="i"
                     @open="openT"></jy-item>
          </div>
        </div>
        <div class="rep">
          <h3 class="flex">
            <div class="title flex1 fs16">检查报告</div>
            <div class="more color_main flex0" @click="show(1)">{{showPart[1]?'收起':'查看'}}<font
              class="iconfont"
              :class="[showPart[1]?'close':'open']">&#xe72d;</font>
            </div>
          </h3>
          <div class="jiancha-box" v-if="showPart[1]">
            <jc-item ref="jc" v-for="(o,i) in examinationDetailsExamination" :key="i" :o="o" :i="i"
                     @open="openE"></jc-item>
          </div>
        </div>
        <p style="height: 10px">&nbsp;</p>
      </template>
    </div>
    <router-link :to="{path:'/report/consult/'+team}" tag="div" class="sub center flex0">体检咨询</router-link>
    <msg ref="msg"></msg>
    <div v-if="showCurrT" class="fixed fixedtable">
      <table>
        <tr>
          <th width="40">NO.</th>
          <th>项目/单位</th>
          <th align="right" class="pr10">结果/参考值</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import {compatCache, testCache} from "../../../lib/cache"
  import JyItem from '../../../plugins/report/jyitem'
  import JcItem from '../../../plugins/report/jcitem'
  import {getENV} from "../../../lib/util";
  import {TijianxjToHtml} from "../../../lib/filter";

  const NAVS = [
    {name: '体检异常'},
    {name: '医生建议'},
    {name: '体检报告'},
  ]

  export default {
    data() {
      return {
        showCurrT: false,
        team: '',
        currentIndex: 0,
        navs: NAVS,
        pat: {},
        info: {},
        showPart: [true, true],
        examinationDetailsTest: [],
        examinationDetailsExamination: []
      };
    },
    computed: {},
    components: {JcItem, JyItem},
    mixins: [],
    created() {
      this.currTable = null;
      this.team = getENV().team;
      this.info = testCache.get();
      this.pat = compatCache.get();
      this.info.htmlXJ = TijianxjToHtml(this.info.zONGJIANXJ);
      this.info.zONGJIANJY = this.info.zONGJIANJY.replace(/\r/g, res => `<br/>`);
      this.info.zONGJIANJY = this.info.zONGJIANJY.replace(/[\d]+\.[^<]+?<br\/>/g, res => `<h5>${res}</h5><p>`);
      this.getData(this.info.tIJIANBM, this.info.bAH);
      this.getTeam()
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      currentIndex(newV) {
        this.showCurrT = false;
        let dom = document.querySelector("#test-detail");
        dom && (dom.scrollTop = 0);
        newV == 2 && this.getData(this.info.tIJIANBM, this.info.bAH)
      }
    },
    methods: {
      reset(type) {
        this.showCurrT = false;
        switch (type) {
          case "t":
            this.examinationDetailsTest.map((res, i) => {
              res.open = false;
              return res;
            });
            break;
          case "e":
            this.examinationDetailsExamination.map((res, i) => {
              res.open = false;
              return res;
            })
            break;
        }


      },

      scrollToElement(scrollDom, dom) {
        this.currTable = dom.querySelector('.table');
        console.log(scrollDom.scrollTop, dom.offsetTop, scrollDom.getBoundingClientRect(), dom.getBoundingClientRect());
        if (scrollDom.scrollTop > dom.offsetTop) scrollDom.scrollTop = dom.offsetTop;
      },
      scroll(e) {
        let dom = e.target;
        let {currTable} = this;
        if (currTable) {
          let {height: H} = dom.getBoundingClientRect(), {height: h, top: t} = currTable.getBoundingClientRect();
          console.log(H, h, t);
          if (h > H) {
            if (t > 85) this.showCurrT = false;
            if (t < 85) this.showCurrT = true;
            if (0 - t + 85 + 35 > h) this.showCurrT = false;
          } else this.showCurrT = false;
        }
      },

      show(index) {
        let val = this.showPart[index];
        this.showPart.splice(index, 1, !val);
      },

      openT(index) {
        let scrollDom = document.getElementById('test-detail'), dom = this.$refs.jy[index].$el;
        setTimeout(() => {
          this.scrollToElement(scrollDom, dom);
        }, 200);
        this.reset('e');
        this.examinationDetailsTest.map((res, i) => {
          if (i == index) res.open = !res.open;
          else res.open = false;
          return res;
        })
      },

      openE(index) {
        let scrollDom = document.getElementById('test-detail'), dom = this.$refs.jc[index].$el;
        setTimeout(() => {
          this.scrollToElement(scrollDom, dom);
        }, 200);
        this.reset('t');
        this.examinationDetailsExamination.map((res, i) => {
          if (i == index) res.open = !res.open;
          else res.open = false;
          return res;
        })
      },

      async getTeam() {
        let ret = await this.$http('nethos.system.param.string', {key: 'EXAM_TEAM', defaultString: 'EXAM_TEAM'})
        if (ret.code == 0) {
          this.team = ret.obj;
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
      },

      async getData(TIJIANBM, BAH) {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('zheer.yygh.ApiJyjcService.ExamListDetails', {TIJIANBM, BAH});
        loading.hide();
        if (ret.code == 0) {
          this.examinationDetailsTest = ret.examinationDetailsTest.map((res) => {
            res.open = false;
            res.ycts = res.list.some(o => [0, 1].indexOf(parseInt(o.yICHANGTS)) >= 0);
            res = Object.assign({}, res.list[0], res);
            return res;
          });
          this.examinationDetailsExamination = ret.examinationDetailsExamination.map((res) => {
            res.open = false;
            res.ycts = res.list.some(o => [0, 1].indexOf(parseInt(o.yICHANGTS)) >= 0);
            res = Object.assign({}, res.list[0], res);
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

  .pr10 {
    padding-right: 10px;
  }

  .notice2 {
    padding: 10px;
    color: #666;
    font-size: 12px;
  }

  .iconfont {
    display: inline-block;
    transition: all 0.5s;
    &.open {
      transform: rotate(180deg);
    }
  }

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

  .fixedtable {
    left: 10px;
    right: 10px;
    top: 85px;
    background-color: #f6f6f6;
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
    }
    th {
      height: 35px;
      color: #666666;
      font-weight: normal;
    }
  }
</style>
