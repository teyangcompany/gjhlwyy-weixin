<template>
  <div class="page scan">
    <div class="wrapper" ref="main">
      <ul class="flex">
        <li class="flex1">
          <div><span>APP</span>下载</div>
          <img src="../../static/img/p1.1.png" alt=""></li>
        <li class="flex1">
          <div><span>微信</span>关注</div>
          <img src="../../static/img/p2.1.png" alt=""></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        index: 0
      };
    },
    computed: {},
    components: {},
    created() {
      this.index = this.$route.params;
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  .scan {
    ul {
      display: flex;
      li {
        list-style: none;
        width: 50%;
        flex: 0 0 auto;
        text-align: center;
        img {
          width: 90%;
        }
      }
    }
  }
</style>
