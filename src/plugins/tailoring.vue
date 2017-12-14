<template>
  <div class="canvas" v-show="showTag" ref="mainbox">
    <canvas ref="ctx"></canvas>
    <div class="button">
      <a href="javascript:;" @click="ok" class="weui-btn weui-btn_primary">确 定</a>
    </div>
    <input ref="file" type="file" @change="change">
    <div class="mask" :style="maskStyle" ref="mask"></div>
  </div>
</template>

<script>
  import readEXIF from '../utils/readEXIF'
  import readImg from "../utils/readImg"
  import readFile from "../utils/readfile"
  import api from "../lib/api"
  import weuijs from "weui.js"

  export default {
    data() {
      return {
        hasListen: false,
        ctx: null,
        width: 0,
        maskStyle: {},
        showTag: false,
        tailoringWidth: 0,
        delta: 0,
        ratio: 0,
        exif: null
      };
    },
    computed: {},
    components: {},
    created() {
      let www = window.innerWidth;
      this.width = www;
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      init() {
        this.delta = 0;
        this.tailoringWidth = 0;
        this.ratio = 0;
        this.maskStyle = {
          left: '0px',
          top: '0px'
        }
      },

      change() {
        this.init();
        this.showTag = true;
        let el = this.$refs.file, files = el.files;
        this.tailoring(files[0]);
      },
      async tailoring(file) {
        let ret = await readFile(file),
          canvas1 = this.$refs.ctx,
          ctx = canvas1.getContext("2d"),
          img1 = await readImg(ret),
          exif = await readEXIF(ret);
        let {width: pW, height: pH} = img1, windowW = this.width, ratio = pW / pH, showW, showH;
        this.exif = exif;
        this.ctx = ctx;
        if (exif.Orientation == 6) {
          showW = windowW;
          showH = showW / ratio;
          canvas1.width = showH;
          canvas1.height = windowW;
          ctx.save();
          ctx.translate(showH, 0);
          ctx.rotate(90 * Math.PI / 180);
          ctx.drawImage(img1, 0, 0, showW, showH);
          ctx.restore();
          this.ratio = 1 / ratio;
        } else {
          if (ratio <= 1) {
            showH = windowW;
            showW = showH * ratio;
          } else {
            showW = windowW;
            showH = showW / ratio;
          }
          canvas1.width = showW;
          canvas1.height = showH;
          this.ratio = ratio;
          ctx.drawImage(img1, 0, 0, showW, showH);
        }
        this.tailoringWidth = Math.min(showW, showH);
        this.maskStyle = {
          width: `${this.tailoringWidth}px`,
          height: `${this.tailoringWidth}px`
        }
        this.move();

        /*if (ratio <= 1) {
          showH = windowW;
          showW = showH * ratio;
          this.maskStyle = {
            width: `${showW}px`,
            height: `${showW}px`
          }
        } else {
          showW = windowW;
          showH = showW / ratio;
          this.maskStyle = {
            width: `${showH}px`,
            height: `${showH}px`
          }
        }
        canvas1.width = showW;
        canvas1.height = showH;
        this.tailoringWidth = Math.min(showW, showH);
        ctx.drawImage(img1, 0, 0, showW, showH);
        this.move(ratio, windowW);*/
      },

      move() {
        if (this.hasListen) {
          return
        }
        let main = this.$refs.mainbox, mask = this.$refs.mask;
        util.toucher(main)
          .on("swipeStart", (res) => {
            //console.log('s', res);
          })
          .on('swipe', (res) => {
            let ratio = this.ratio, windowW = window.innerWidth, w = this.tailoringWidth;
            if (ratio <= 1) {
              mask.style.top = `${Math.max(0, Math.min(this.delta + res.moveY, windowW - w))}px`
            } else {
              mask.style.left = `${Math.max(0, Math.min(this.delta + res.moveX, windowW - w))}px`
            }
            //console.log('i', res);
          })
          .on('swipeEnd', (res) => {
            if (this.ratio <= 1) {
              this.delta = parseInt(mask.style.top);
            } else {
              this.delta = parseInt(mask.style.left);
            }
          })
        this.hasListen = true;
      },
      async ok() {
        let loading = weuijs.loading("上传中...");
        let imgData;
        if (this.ratio <= 1) {
          imgData = this.ctx.getImageData(0, this.delta, this.tailoringWidth, this.tailoringWidth);
        } else {
          imgData = this.ctx.getImageData(this.delta, 0, this.tailoringWidth, this.tailoringWidth);
        }
        let canvas = document.createElement("canvas"), ctx = canvas.getContext('2d');
        canvas.width = imgData.width;
        canvas.height = imgData.height;
        ctx.putImageData(imgData, 0, 0);
        let base64 = canvas.toDataURL(), originalName = new Date().getTime() + ".png";
        let ret = await api("nethos.system.atta.upload.image.base64", {base64, originalName})
        this.$emit("uploaded", ret);
        this.showTag = false;
        loading.hide();
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/public";

  .canvas {
    position: fixed;
    @include t_r_b_l();
    background-color: black;
    input {
      position: absolute;
      left: 1000px;
      top: 1000px;
    }
    .button {
      margin: 1rem 1rem 0;
    }
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      border: 1px solid yellow;
    }
  }
</style>
