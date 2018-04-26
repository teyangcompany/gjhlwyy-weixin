<template>
  <div class="page flex">
    <app-header class="flex0" title="检验详情">
      <i class="back" slot="back"></i>
    </app-header>
    <div class="main flex1 overflow-y-auto overflow-touch">
      <h3 class="p10">{{data.inspectType}}</h3>
      <div class="info p10">
        <ul class="overflow-hidden">
          <p class="float-left">NO.{{data.recordId}}</p>
          <li class="float-left flex">
            <my-label title="姓名"></my-label>
            <span>{{data.name}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="科室"></my-label>
            <span>{{data.inspectDept}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="性别"></my-label>
            <span>{{pat.compatGender|getGender}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="病区"></my-label>
            <span>{{data.inspectDept}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="年龄"></my-label>
            <span>{{data.age}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="床号"></my-label>
            <span>{{data.bedNo}}</span>
          </li>

          <li class="float-left flex">
            <my-label title="送检医生"></my-label>
            <span></span>
          </li>
          <li class="float-left flex">
            <my-label title="标本类型"></my-label>
            <span>{{data.specimenType}}</span>
          </li>

          <li class="float-left flex">
            <my-label title="检验医生"></my-label>
            <span>{{data.inspectDoc}}</span>
          </li>
          <li class="float-left flex">
            <my-label title="检验样本号"></my-label>
            <span>{{data.sampleNum}}</span>
          </li>

          <div class="float-left flex">
            <my-label title="临床诊断"></my-label>
            <span>{{data.diagnosis}}</span>
          </div>
          <div class="float-left flex">
            <my-label title="采集日期"></my-label>
            <span>{{data.collectionDate}}</span>
          </div>
          <div class="float-left flex">
            <my-label title="检验日期"></my-label>
            <span>{{data.inspectDate}}</span>
          </div>
          <div class="float-left flex">
            <my-label title="审核医生"></my-label>
            <span>{{data.examineDoc}}</span>
          </div>
          <div class="float-left color_666 flex">
            具体报告信息请以医院纸质报告为准！
          </div>
        </ul>
      </div>

      <div class="list">
        <table>
          <tr>
            <th width="30">NO</th>
            <th>项目</th>
            <th width="50">结果</th>
            <th width="70">参考值</th>
            <th width="60">单位</th>
          </tr>
          <tr v-for="(item,index) in list">
            <td>{{ item.expCode }}</td>
            <td>{{ item.expName }}</td>
            <td>{{ item.expResultNum }} <span style="color: red">{{item.status}}</span></td>
            <td>{{ item.consult}}</td>
            <td>{{ item.expUnit }}</td>
          </tr>
        </table>
      </div>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {compatCache, inspectCache} from "../../../lib/cache";
  import MyLabel from "../../../plugins/my-label"
  import {getGender} from "../../../lib/filter";

  export default {
    data() {
      return {
        pat: {},
        data: {},
        list: []
      };
    },
    computed: {},
    filters: {getGender},
    components: {MyLabel},
    mixins: [],
    created() {
      this.pat = compatCache.get();
      this.data = inspectCache.get();
      this.getList(this.data.recordId);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      getStatus(consult, expResultNum) {
        expResultNum = parseFloat(expResultNum);
        if (consult.indexOf('-') >= 0) {
          let arr = consult.split("-").map(res => parseFloat(res));
          if (expResultNum < arr[0]) return '↓';
          if (expResultNum > arr[1]) return '↑'
        }

        else if (consult.indexOf("<") >= 0) {
          consult = parseFloat(consult);
          if (expResultNum > consult) return '↑'
        }

        else if (consult.indexOf(">") >= 0) {
          consult = parseFloat(consult);
          if (expResultNum < consult) return '↓'
        }

        return "";
      },


      async getList(recordId) {
        let loading = this.$weuijs.loading("加载中...");
        let ret = await this.$http('nethos.book.inspect.info', {recordId});
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list.map((res) => {
            let {consult, expResultNum} = res;
            res.status = this.getStatus(consult, expResultNum);
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
      width: 75px;
      justify-content: space-between;
      color: #666666;
    }
    span {
      margin-left: 10px;
    }
    li {
      margin-top: 10px;
      width: 50%;
    }
    ul > div {
      margin-top: 10px;
      width: 100%;
    }

    ul > p {
      width: 100%;
    }
  }

  .list {
    margin-top: 10px;
    background: white;
    margin-top: 10px;
  }

  table {
    table-layout: fixed;
    width: 100%;
  }

  th {
    font-size: 14px;
  }

  td {
    color: #666666;
    font-size: 12px;
  }

  .page {
    flex-direction: column;
  }
</style>
