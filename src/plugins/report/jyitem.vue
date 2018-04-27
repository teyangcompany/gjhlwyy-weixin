<template>
    <div class="jyitem">
        <h6 @click="open" class="fs14"><font class="iconfont" v-if="!o.open">&#xe6b7;</font><font v-else
                                                                                                  class="iconfont">&#xe72c;</font>{{o.zUHEXMMC}}
        </h6>
        <div class="table" v-if="o.open">
            <table>
                <thead>
                <th width="40">NO.</th>
                <th>项目/单位</th>
                <th align="right" class="pr10">结果/参考值</th>
                </thead>
                <tbody>
                <tr v-for="(oo,ii) in o.list">
                    <td>{{ii+1}}</td>
                    <td>
                        <p class="p1">{{oo.xIANGMUMC}}</p>
                        <p class="p2 fs10 color_999" v-if="oo.jILIANGDW">({{oo.jILIANGDW}})</p>
                    </td>
                    <td>
                        <p class="p3 right">{{oo.tIJIANJG}} <span v-if="oo.yICHANGTS==0">↓</span><span
                                v-if="oo.yICHANGTS==1">↑</span></p>
                        <p class="p2 fs10 color_999 right">参考值:{{oo.cANKAOXX}}</p>
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
                                <label>报告日期：</label>{{o.sHENHERQ|splitTime}}
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
  import {splitTime} from "../../lib/filter";

  export default {
    props: {
      i: Number,
      o: Object
    },
    data() {
      return {};
    },
    computed: {},
    filters: {splitTime},
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
        this.$emit("open", this.i);
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
        padding: 10px;
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
    }

    .info {
        background-color: #f6f6f6;
        color: #333;
        li {
            label {
                color: #666666;
            }
            padding-left: 10px;
            font-size: 12px;
        }
    }
</style>
