<template>
  <div class="page">
    <app-header :title="reportType.name">
      <i class="back" slot="back"></i>
    </app-header>
    <ul class="nav flex">
      <li :style="style" class="flex0 center" :class="[index==currentIndex?'cover':'']"
          @click="currentIndex=index"
          v-for="(item,index) in date">{{item.name}}
      </li>
    </ul>
    <scroll :height="scrollHeight" :data="list" class="list">
      <ul>
        <li @click="handler(o,0)" class="type0" v-for="(o,i) in list" v-if="reportType.name=='检查报告'">
          <h3 class="color_333">{{o.checkName}}</h3>
          <div class="flex color_666">
            <div class="flex1">
              {{pat.compatName}}
            </div>
            <div class="flex0">{{o.checkTime}}</div>
          </div>
        </li>
        <li @click="handler(o,1)" class="type1" v-for="(o,i) in list" v-if="reportType.name=='检验报告'">
          <h3 class="color_333">{{o.inspectType}}</h3>
          <div class="flex color_666">
            <div class="flex1">
              {{pat.compatName}}
            </div>
            <div class="flex0">{{o.inspectDate}}</div>
          </div>
        </li>
        <div @click="handler(o,2)" class="type2" v-for="(o,i) in list" v-if="reportType.name=='体检报告'">
          <h3 class="color_333 flex">
            <span class="flex1 fs16">报告日期:</span>
            <span class="flex0 color_main fs14">查看详情</span>
          </h3>
          <div>
            <h4>体检结果</h4>
            <p v-html="o.zONGJIANXJ"></p>
          </div>
        </div>
      </ul>
    </scroll>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {REPORT_TYPE} from "../../lib/config";
  import {scrollHeightMixin} from "../../lib/mixin";
  import Scroll from '../../plugins/scroll'
  import {formatTime} from "../../lib/filter";
  import {getENV} from "../../lib/util";
  import {compatCache, examinationCache, inspectCache, testCache} from "../../lib/cache";

  const DATEARR = [[90, "三个月"], [182, '半年内'], [365, '一年内'], [365 * 3, '三年内']];


  export default {
    data() {
      return {
        style: {},
        list: [],
        date: [],
        reportType: {},
        bottomHeight: 40,
        currentIndex: 0,
        pat: {}
      };
    },
    computed: {},
    components: {Scroll},
    mixins: [scrollHeightMixin],
    created() {
      let {query} = this.$route;
      this.pat = compatCache.get();
      this.reportType = REPORT_TYPE[query.index];
      this.getDateArr(query.index);
      this.getData();
    },
    mounted() {

    },
    beforeDestroy() {

    },

    watch: {
      currentIndex(newV) {
        this.getData(newV);
      }
    },

    methods: {
      handler(data, type = 0) {
        let {$router} = this;
        switch (type) {
          case 0:
            examinationCache.set(data);
            $router.push('/report/detail/examination');
            break;
          case 1:
            inspectCache.set(data);
            $router.push('/report/detail/inspect');
            break;
          case 2:
            testCache.set(data);
            $router.push('/report/detail/test');
            break;
        }
      },

      getDateArr(index) {
        let now = new Date().getTime(),
          endDate = formatTime(now, "%Y-%m-%d");
        this.date = DATEARR.map((res) => {
          return {
            name: res[1],
            startDate: formatTime(now - res[0] * 24 * 3600 * 1000, "%Y-%m-%d"),
            endDate
          }
        }).filter((o, i) => {
          if (index == 0 || index == 1) {
            return i < 3;
          } else {
            return i > 1;
          }
        });

        this.style = {
          width: (100 / this.date.length) + "%"
        }

      },

      async getData(index = 0) {
        let {reportType: {service}, date, $route: {query}} = this,
          {endDate, startDate} = date[index],
          BAH = query.patCard, STARTDATE = startDate, ENDDATE = endDate;
        if (getENV().plat == "dev") {
          BAH = "10856071"
        }
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http(service, Object.assign({}, query, {endDate, startDate, BAH, ENDDATE, STARTDATE}));
        if (ret.code == 0) {
          this.list = ret.list.map((res) => {
            res.zONGJIANXJ && (res.zONGJIANXJ = res.zONGJIANXJ.replace(/\r+?/g, '<br/>'));
            return res;
          });
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
        loading.hide();
      }


    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .list {
    padding-top: 10px;
    background-color: $bgColor;
    ul > div + div {
      margin-top: 10px;
    }
    ul > div {
      padding: 0 10px;
      background-color: white;
      h3 {
        @include h_lh(45px);
        @include border(bottom, #ccc, after, dashed);
      }
      div {
        padding: 10px 0;
        p {
          @include lines(2);
          color: #666666;
          line-height: 1.5;
        }

      }
    }
    li + li {
      margin-top: 10px;
    }
    li {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      background-color: white;
      > div {
        margin-top: 10px;
      }
      h3 {
        line-height: 1.2;
        font-size: 14px;
      }
    }
  }

  .nav {
    li {
      @include h_lh(40px);
    }
    .cover {
      @include border(bottom, $mainColor, after, solid, 4px);
    }
  }
</style>
