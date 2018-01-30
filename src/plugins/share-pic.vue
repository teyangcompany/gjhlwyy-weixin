<template>
  <div v-if="showTag">
    <img @click="hide" v-if="device=='iphone'" class="fixed" src="../../static/img/share.ios.png" alt="">
    <img @click="hide" v-if="device=='android'" class="fixed" src="../../static/img/share.android.png" alt="">
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showTag: false,
        device: ''
      };
    },
    computed: {},
    components: {},
    created() {
      this.device = window.device;
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      hide() {
        this.showTag = false
      },
      show() {
        this.showTag = true;
      }
    }
  };
</script>

<style scoped lang="scss">
  img {
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
  }
</style>
