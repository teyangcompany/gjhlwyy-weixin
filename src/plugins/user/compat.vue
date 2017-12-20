<template>
  <div class="compat flex">
    <div class="label flex1">选择常用就诊人</div>
    <div class="text flex0 right flex" @click="change">
      <span>{{currentCompat.compatName}} {{currentCompat.compatGender|getGender}} {{currentCompat.compatAge}}</span>
      <img height="15" src="../../../static/img/arrow.png" alt="">
    </div>
  </div>
</template>

<script>
  import api from "../../lib/api"
  import weuijs from "weui.js"
  import {getGender} from "../../lib/filter";

  export default {
    data() {
      return {
        list: [],
        current: 0
      };
    },
    computed: {
      currentCompat() {
        let compat = this.list[this.current];
        this.$emit("compat", compat)
        return compat || {};
      }
    },
    filters: {getGender},
    components: {},
    created() {
      this.getList();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      change() {
        let menus = [], actions = [{
          label: '取消',
          onClick: () => {
          }
        }];
        this.list.forEach((res, index) => {
          menus.push({
            label: res.compatName,
            onClick: () => {
              this.current = index;
            }
          });
        })
        weuijs.actionSheet(menus, actions);
      },

      async getList() {
        let loading = weuijs.loading("加载中...");
        let ret = await api("nethos.pat.compat.list", {});
        if (ret.code == 0) {
          this.list = ret.list;
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  .compat {
    .text {
      align-items: center;
      justify-content: right;
      span {
        color: #777777;
        margin-right: 5px;
      }
    }
  }
</style>
