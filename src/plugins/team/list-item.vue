<template>
  <router-link tag="div" :to="{path:'/team/'+data.id+'/detail'}" class="list-item flex">
    <div class="thumb flex0">
      <img :src="data.teamAvatar||'http://img.yiren.hk/group1/M00/00/67/oYYBAFnGJb-AZWRzAACW81v1Hac78.jpeg'" alt="">
    </div>
    <div class="info flex1 lh1">
      <h3>{{data.teamName}}</h3>
      <div>{{data.teamResume}}</div>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: {
      data: Object
    },
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  @import "../../common/public";

  .list-item {
    background-color: white;
    padding: $commonSpace;
  }

  .list-item + .list-item {
    @include border(top);
  }

  .thumb {
    margin-right: $commonSpace;
    @include w_h(px2rem(80px), px2rem(60px));
    img {
      @include w_h(px2rem(80px), px2rem(60px));
    }
  }

  .info {
    h3 {
      font-size: 16px;
      color: #333333;
    }
    div {
      margin-top: 5px;
      font-size: 14px;
      color: #999999;
      line-height: 1.3;
      @include lines(2);
    }
  }
</style>
