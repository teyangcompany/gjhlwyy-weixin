<template>
  <div class="page largeImg">
    <div>
      <img :src="largeImg" alt="" @click="makeSmall">
    </div>
    <i class="weui-icon-delete weui-icon_gallery-delete" @click="deleteImg"></i>
  </div>
</template>

<script>
  import {delpicCache} from "../lib/cache"

  export default {
    data() {
      return {
        query: {},
        largeImg: ""
      };
    },
    computed: {},
    components: {},
    created() {
      this.query = this.$route.query
      this.largeImg = this.$route.query.src;
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      makeSmall() {
        let query = this.query;
        delete query.index
        delete query.src;
        this.$router.replace({path: "/pictureConsultNext", query: query});
      },
      deleteImg() {
        let query = this.query
        delpicCache.set(query.index)
        delete query.index
        delete query.src;
        this.$router.replace({path: "/pictureConsultNext", query: query});
      }

    }
  };
</script>

<style scoped lang="scss">
  .largeImg {
    position: fixed;
    left: 0;
    right: 0;
    top: 0px;
    bottom: 0px;
    display: flex;
    z-index: 1000;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #666666;
    > div {
      position: absolute;
      top: 50px;
      bottom: 50px;
      display: flex;
      /*background-color: #3CC51F;*/
      align-items: center;
      img {
        width: 100%;
      }
    }
    i {
      position: fixed;
      left: 47%;
      bottom: 10px;
    }
  }
</style>
