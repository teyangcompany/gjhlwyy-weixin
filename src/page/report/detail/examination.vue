<template>
  <div class="page flex">
    <app-header class="flex0" title="检查详情">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main flex1 overflow-y-auto overflow-touch">
      <h3 class="p10">{{data.checkName}}</h3>
      <div class="info p10">
        <ul class="overflow-hidden">
          <li class="float-left flex">
            <my-label title="姓名"></my-label>
            <span>{{pat.compatName}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="送检医生"></my-label>
            <span>{{data.sendDoc}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="性别"></my-label>
            <span>{{data.gender|getGender}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="检验医生"></my-label>
            <span>{{data.examineDoc}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="年龄"></my-label>
            <span>{{pat.compatAge}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="审核医生"></my-label>
            <span>{{data.changeDoc}}</span>
          </li>
          <div class="float-left flex">
            <my-label title="送检时间"></my-label>
            <span>{{data.sendTime}}</span>
          </div>
          <div class="float-left flex">
            <my-label title="检验时间"></my-label>
            <span>{{data.checkTime}}</span>
          </div>
          <div class="float-left color_666 flex">
            具体报告信息请以医院纸质报告为准！
          </div>
        </ul>
      </div>
      <div class="result p10">
        <h4>检查结果</h4>
        <div v-html="data.checkResult"></div>
      </div>
      <div class="desc p10">
        <h4>检查结果描述</h4>
        <div v-html="data.checkDetail"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {compatCache, examinationCache} from "../../../lib/cache";
  import MyLabel from '../../../plugins/my-label'
  import {getGender} from "../../../lib/filter";

  export default {
    data() {
      return {
        pat: {},
        data: {}
      };
    },
    computed: {},
    filters: {getGender},
    components: {MyLabel},
    mixins: [],
    created() {
      this.pat = compatCache.get();
      this.data = examinationCache.get();

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../../common/public";

  .p10 {
    padding: 10px;
  }

  h3 {
    font-size: 14px;
    line-height: 1.2;
    background: #399dfd;
    color: white;
  }

  .main {
    background: $bgColor;
  }

  .info {
    background-color: white;
    line-height: 1.2;
    .my-label {
      font-size: 14px;
      flex: 0 0 auto;
      width: 65px;
      justify-content: space-between;
      color: #666666;
    }
    span {
      margin-left: 10px;
    }
    li {
      width: 50%;
    }
    li + li + li {
      margin-top: 10px;
    }
    ul > div {
      margin-top: 10px;
      width: 100%;
    }
  }

  .result, .desc {
    margin-top: 10px;
    background-color: white;
    h4 {
      font-size: 15px;
    }
  }

  .page {
    flex-direction: column;
  }
</style>
