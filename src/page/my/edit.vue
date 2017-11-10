<template>
  <div class="edit-form page">
    <app-header class="flex0 header relative" title="编辑资料">
      <i slot="back"></i>
      <div @click="save" class="right absolute" slot="right">保存</div>
    </app-header>
    <div v-if="mode=='name'" class="wrap flex nobg border-1px">
      <div class="label flex0">
        姓名:
      </div>
      <div class="text flex1">
        <input type="text" v-model="value">
      </div>
    </div>
    <div v-if="mode=='card'" class="wrap flex nobg border-1px">
      <div class="label flex0">
        身份证:
      </div>
      <div class="text flex1">
        <input type="text" v-model="value">
      </div>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import weuijs from "weui.js"
  import Msg from "../../plugins/msg.vue"
  import AppHeader from "../../plugins/app-header.vue"
  import api from "../../lib/api"
  import {editForm} from "../../lib/config"

  export default {
    data() {
      return {
        form: {},
        mode: "",
        service: "",
        value: "",
        id: ""
      };
    },
    computed: {},
    components: {AppHeader, Msg},
    created() {
      let query = this.$route.query;
      for (let k in query) {
        this.$set(this.$data, k, query[k]);
      }
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async save() {
        let form = {};
        form[editForm[this.service].id] = this.id;
        form[editForm[this.service][this.mode]] = this.value;
        let l = weuijs.loading("修改中...")
        let ret = await api(this.service, form)
        l.hide();
        if (ret.code == 0) {
          weuijs.toast("编辑成功")
          setTimeout((res) => {
            this.$router.go(-1);
          }, 3000)
        } else {
          this.$refs.msg.show(ret.msg || "服务端错误" + ret.code)
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .wrap {
    background-image: url("../../../static/img/more.png");
    @include backgroundImageSet(17px/2, 30px/2, 19rem);
    padding: 15px 1.5rem 15px 1rem;
    align-items: center;
    line-height: 1;
    &.nobg {
      background: none;
    }
    .label {
      font-size: 17px;
    }
    .text {
      input {
        font-size: 16px;
        width: 98%;
        text-align: right;
      }
      text-align: right;
      color: #999999;
    }
  }
</style>
