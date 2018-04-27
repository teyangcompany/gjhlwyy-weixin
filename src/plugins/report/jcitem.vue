<template>
  <div class="jcitem">
    <h6 @click="open" class="fs14"><font class="iconfont" v-if="!o.open">&#xe6b7;</font><font v-else class="iconfont">&#xe72c;</font>{{o.zUHEXMMC}}--{{o.list.length}}
    </h6>
    <ol v-if="o.list.length==1&&o.open" v-for="(oo,ii) in o.list">
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
        <th align="right" class="pr10">结果</th>
        </thead>
        <tbody>
        <tr v-for="(oo,ii) in o.list">
          <td>{{ii+1}}</td>
          <td>
            <p class="p1">{{oo.xIANGMUMC}}</p>
            <p class="p2 fs10 color_999" v-if="oo.jILIANGDW">({{oo.jILIANGDW}})</p>
          </td>
          <td>
            <template v-if="oo.xIANGMUMC!='牙体'">
              <p class="p3 right">{{oo.tIJIANJG}}
                <span v-if="oo.yICHANGTS==0">↓</span><span
                  v-if="oo.yICHANGTS==1">↑</span></p>
            </template>
            <template v-else>

            </template>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
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
      /*d(res) {
        console.log("1", res.match(/[\u4e00-\u9fa5]+/g))
        //console.log(res.split("|"));
        return res;
      }*/
    },
    components: {},
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

  .pr10 {
    padding-right: 10px;
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

  ul {
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

  td {
    padding: 10px;
  }

</style>
