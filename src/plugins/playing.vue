<template>
    <span class="playing" @click="click">
      <font v-if="step==1">&#xe729;</font>
      <font v-if="step==2">&#xe728;</font>
      <font v-if="step==3">&#xe725;</font>
    </span>
</template>

<script>
  import {audioPlayStatusCache} from "../lib/cache";
  import {debug} from "../lib/util";

  export default {
    props: ['src'],
    data() {
      return {
        audioStatus: {},
        step: 3,
        timer: null
      };
    },
    computed: {},
    components: {},
    created() {
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      audioStatus: {
        handler(newV, oldV) {
          debug('newV', newV.status)
          if (newV.url == this.src && newV.status == 'ended') {
            this.pause();
          }
        },
        deep: true
      }
    },
    methods: {
      click() {
        this.$emit('click');
        this.playing();
      },
      pause() {
        clearInterval(this.timer);
        this.timer = null;
        this.step = 3;
      },
      playing() {
        this.audioStatus = audioPlayStatusCache.get();
        this.step++;
        if (this.step > 3) {
          this.step = 1;
        }
        if (!this.timer) {
          this.timer = setInterval(this.playing, 300);
        }
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
