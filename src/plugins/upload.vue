<template>
  <div class="uploader">
    <input ref="file" @change="change" type="file" :accept="accept">
  </div>
</template>

<script>
  import {debug} from "../lib/util"
  import weuijs from "weui.js"
  import readFile from "../utils/readfile"
  import api from "../lib/api"

  export default {
    props: {
      accept: {
        type: String,
        default: "image/*"
      }
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
    methods: {
      click() {
        let dom = this.$refs.file;
        dom.click();
      },

      change() {
        let dom = this.$refs.file, files = dom.files;
        debug("file", files);
        this.upload(files);
      },

      async upload(files) {
        let loading = weuijs.loading("上传中");
        for (let i = 0, file = files[i], l = files.length; i < l; i++) {
          let base64 = await readFile(file), originalName = file.name;
          let ret = await api("nethos.system.atta.upload.image.base64", {base64, originalName})
          this.$emit("uploaded", ret);
        }
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/public";

  .uploader {
    @include w_h(0px, 0px);
    input {
      @include w_h(0px, 0px);
      opacity: 0;
    }
  }
</style>
