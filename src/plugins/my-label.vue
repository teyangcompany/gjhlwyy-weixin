<template>
  <div class="my-label flex" v-html="html">
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      needColon: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        html: ''
      };
    },
    computed: {},
    components: {},
    created() {
      this.makeHTML();
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      makeHTML() {
        for (let i = 0; i < this.title.length; i++) {
          let char = this.title.substr(i, 1)
          if (i === this.title.length - 1 && this.needColon) {
            this.html += `<font class="block">${char}:</font>`;
          } else {
            this.html += `<font class="block">${char}</font>`;
          }
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/public";

</style>
