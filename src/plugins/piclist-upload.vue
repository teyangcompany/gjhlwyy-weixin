<template>
  <div class="piclist-upload">
    <input ref="input" type="file" @change="change" multiple>
    <ul class="overflow-hidden">
      <li v-for="(pic,index) in pics" v-if="index<9" class="float-left">
        <img :src="pic.url" alt="" @click="scan(pic)">
        <div class="mask" v-if="pic.status!='end'">
          {{pic.progress}}%
        </div>
      </li>
      <li class="float-left" v-if="pics.length<9">
        <img @click="selectFile" src="../../static/img/添加图片.png" alt="">
      </li>
      <li class="float-left" v-if="pics.length==0">
        <span>添加图片</span>
        <span>请上传患处图片,让医生更了解您的病情</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {arrayFind} from "../lib/util";
  import readFile from "../utils/readfile"
  import uploadApi from "../lib/uploadApi"
  import weuijs from 'weui.js'

  export default {
    data() {
      return {
        pics: [],
        start: 0
      };
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      pics(newV) {
        this.$emit('uploaded', newV);
      }
    },
    methods: {
      scan(pic) {
        let gallery = weuijs.gallery(pic.url, {
          onDelete: () => {
            weuijs.confirm('确定删除该图片？', () => {
              let index = this.pics.findIndex((res) => {
                return res.file == pic.file;
              });
              gallery.hide(() => {
                this.pics.splice(index, 1);
              });
            })
          }
        });
      },
      selectFile() {
        this.$refs.input.click();
      },
      change() {
        let el = this.$refs.input,
          files = el.files;
        this.doUpload(files);
      },
      async doUpload(files) {
        this.$emit("status", 'queue');
        await this.addQueue(files);
        await this.uploadQueue(files);
      },

      async uploadQueue(files) {
        this.$emit("status", 'loading');
        for (let i = 0; i < files.length; i++) {
          let file = files[i],
            pic = arrayFind(this.pics, (res) => {
              return res.file == file;
            }),
            index = this.pics.findIndex((res) => {
              return res.file == file;
            }),
            ret = await uploadApi(file, (progress) => {
              let {loaded, total} = progress;
              let pro = parseFloat(loaded / total);
              pro = Math.round(parseFloat(pro.toFixed(2)) * 100);
              console.log('--p1--', pro);
              pic.progress = pro;
              this.pics.splice(index, 1, pic);
            });
          if (ret.code == 0) {
            pic.url = ret.obj.url;
            pic.status = "end";
            pic.id = ret.obj.attaId;
            this.pics.splice(index, 1, pic);
          }
        }
        this.$emit("status", 'loaded');
      },

      async addQueue(files) {
        for (let i = 0; i < files.length; i++) {
          let res = await readFile(files[i]);
          this.pics.push({
            file: files[i],
            url: res,
            status: 'start',
            progress: 0
          })
        }
        return this.pics;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/public";

  .piclist-upload {
    position: relative;
    input {
      position: absolute;
      left: -1000px;
      top: -1000px;
    }
    ul {
      $w: px2rem(75px);
      li {
        position: relative;
        padding-right: px2rem(10px);
        padding-bottom: px2rem(10px);
        img {
          width: $w;
          height: $w;
        }
        .mask {
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          line-height: $w;
          text-align: center;
          position: absolute;
          left: 0;
          top: 0;
          width: $w;
          height: $w;
          @include t_r_b_l();
        }
        span {
          padding-top: px2rem(8px);
          color: #777777;
          display: block;
          font-size: 12px;
          &:first-child {
            font-size: 14px;
            color: #333333;
          }
        }
      }
    }
  }
</style>
