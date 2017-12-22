<template>
  <div class="consult-bottom">
    <div class="wait center" v-if="status=='GOING' && message.length==0">
      {{consult.consultStatusDescription}}
    </div>
    <div class="replay flex">
      <div class="upload flex0">
        <img src="../../../static/img/keyboard.png" alt="">
      </div>
      <div class="input flex1">
        <input type="text">
      </div>
      <div class="btn flex0">
        <a class="unactive">发送</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['status', 'message', 'consult'],
    data() {
      return {};
    },
    computed: {},
    components: {},
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  $h: 50px;
  .consult-bottom {
    height: $h;
    .wait {
      line-height: $h;
      background-color: #f8f8f8;
      font-size: 12px;
      color: #333;
    }
    .replay {
      height: $h;
      align-items: center;
      .upload {
        padding-left: px2rem(5px);
        padding-right: px2rem(5px);
        $w: 30px;
        @include w_h($w+10px, $w);
        overflow: hidden;
        img {
          @include w_h($w, $w);
        }
      }
      .btn {
        padding-right: 5px;
        a {
          padding: 5px 10px;
          border-radius: 5px;
        }
        a.unactive {
          background-color: #f8f8f8;
          color: #ccc;
        }
        a.active {
          background-color: $mainColor;
          color: white;
        }
      }
    }
  }
</style>
