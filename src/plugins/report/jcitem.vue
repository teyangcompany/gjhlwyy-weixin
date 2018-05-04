<template>
  <div class="jcitem">
    <h6 @click="open" class="fs14"><font class="iconfont" v-if="!o.open">&#xe6b7;</font>
      <font v-else class="iconfont">&#xe72c;</font>{{o.zUHEXMMC}} <span v-if="o.ycts" class="color_red">(异)</span>
    </h6>
    <ol v-if="o.list.length==1&&o.open" v-for="(oo,ii) in o.list">
      <li class="fs12 color_999 line2">项目名称:{{oo.xIANGMUMC}}</li>
      <li>
        <div class="title"><b class="color_main">|&nbsp;</b> 检查结果</div>
        <p class="color_666 fs12">{{oo.tIJIANJG||"暂无"}}</p>
      </li>
      <li>
        <div class="title"><b class="color_main">|&nbsp;</b> 检查结果描述</div>
        <p class="color_666 fs12">{{oo.jIELUN||"暂无"}}</p>
      </li>
      <ul class="flex">
        <li>
          <label>体检医生：</label>{{oo.jIANCHAYS}}
        </li>
        <li>
          <label>检查日期：</label>{{oo.jIANCHARQ.substr(0,10)}}
        </li>
      </ul>
    </ol>

    <div class="table" v-if="o.open&&o.list.length>1">
      <table>
        <thead>
        <th width="40">NO.</th>
        <th>项目/单位</th>
        <th align="right" class="pr10">结果/参考值</th>
        </thead>
        <tbody>
        <tr v-for="(oo,ii) in o.list">
          <td class="no">{{ii+1}}</td>
          <td>
            <p class="p1">{{oo.xIANGMUMC}}</p>
            <p class="p2 fs10 color_999" v-if="oo.jILIANGDW">({{oo.jILIANGDW}})</p>
          </td>
          <td align="right">
            <template v-if="oo.xIANGMUMC!='牙体'">
              <p class="p3 right" :class="['YICHANGTS'+oo.yICHANGTS]">{{oo.tIJIANJG}} <span
                v-if="oo.yICHANGTS==0">↓</span><span
                v-if="oo.yICHANGTS==1">↑</span></p>
              <p class="p2 fs10 color_999 right">参考值:{{oo.cANKAOXX}}</p>
            </template>
            <template v-else>
              <yanti-svg :data="oo.tIJIANJG"></yanti-svg>
            </template>
          </td>
        </tr>
        <tr>
          <td colspan="3" class="info">
            <ul class="flex">
              <li>
                <label>体检医生：</label>{{o.jIANCHAYS}}
              </li>
              <li>
                <label>体检日期：</label>{{o.jIANCHARQ.substr(0,10)}}
              </li>
            </ul>
            <ul class="flex">
              <li>
                <label>审核医生：</label>{{o.sHENHEYS}}
              </li>
              <li>
                <label>报告日期：</label>{{o.sHENHERQ|filter_report_shenheeq}}
              </li>
            </ul>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import YantiSvg from './svg'
  import {filter_report_shenheeq, splitTime} from "../../lib/filter";

  export default {
    props: {
      i: Number,
      o: Object
    },
    /*"\r 65|\r---|---\r |\r\r食物嵌塞 "*/
    data() {
      return {};
    },
    computed: {},
    filters: {
      splitTime, filter_report_shenheeq
      /*d(res) {
        console.log("1", res.match(/[\u4e00-\u9fa5]+/g))
        //console.log(res.split("|"));
        return res;
      }*/
    },
    components: {YantiSvg},
    mixins: [],
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      open() {
        this.$emit('open', this.i);
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .YICHANGTS0, .YICHANGTS1 {
    color: red;
  }

  .YICHANGTS2 {
    color: #2AB6B3;
  }

  .no {
    color: #999;
  }

  .pr10 {
    padding-right: 10px;
  }

  .line2 {
    @include lines(2);
  }

  h6 {
    padding: 10px 0;
  }

  .title {
    padding: 10px 0;
  }

  p {
    line-height: 1.5;
  }

  ol > ul {
    color: #333333;
    margin-top: 10px;
    background-color: #f6f6f6;
    @include h_lh(35px);
    li {
      label {
        color: #666666;
      }
      padding-left: 10px;
      font-size: 12px;
    }
  }

  .table {
    margin: 0 -10px;
  }

  table {
    table-layout: fixed;
    border-collapse: collapse;
    width: 100%;
  }

  th {
    background-color: #f6f6f6;
    height: px2rem(35px);
    font-weight: normal;
    flood-color: #666666;
  }

  tr {
    td {
      @include border(bottom, #ccc, after, dashed);
    }
  }

  tbody > tr:last-child {
    td {
      @include border(bottom, white);
    }
  }

  td {
    padding: 10px;
    font-size: 12px;
  }

  .info {
    color: #333;
    ul {
      background-color: #f6f6f6;
      &:first-child {
        margin-top: -10px;
        padding-top: 10px;
      }
      &:nth-child(2){
        padding-bottom: 10px;
      }
    }
    li {
      label {
        color: #666666;
      }
      padding-left: 10px;
      font-size: 12px;
    }
  }
</style>
