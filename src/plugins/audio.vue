<template>
  <audio :src="url"
         @canplay="canplay"
         @timeupdate="timeupdate"
         @ended="ended"
         ref="audio"></audio>
</template>

<script>
  import {debug} from "../lib/util";
  import {audioPlayStatusCache} from "../lib/cache";

  export default {

    props: ['url'],
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      play() {
        let el = this.$refs.audio;
        if (!el || !this.url) {
          setTimeout(this.play, 20);
        } else {
          el.play();
          if (el.readyState < 3) {
            setTimeout(this.play, 20);
          }
        }
      },

      loadstart() {
        debug("loadstart");
      },

      canplay() {
        debug("canplay");
        //this.play();
      },

      timeupdate() {
        let el = this.$refs.audio;
        debug("playing--", el.currentTime);
      },

      ended() {
        audioPlayStatusCache.set({url: this.url, status: 'ended'});
        this.$emit('ended');
      }
    }
  };
</script>

<style scoped lang="scss">

</style>
