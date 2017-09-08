<template>
    <div>
      <div class="weui-cells weui-cells_form" id="uploader">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <slot name="title">
                <div class="weui-uploader__hd">
                  <p class="weui-uploader__title bf">图片上传</p>
                </div>
              </slot>

              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                  <li class="weui-uploader__file" v-for="item,index of srcList">
                    <img :src="item.url" alt="" class="uploadImg" @click="deleteImg(index,item.attaFileUrl)"><br>
                    <!--<span>{{num+'%'}}</span>-->
                  </li>
                </ul>
                <!--<span class="bf">添加图片</span>-->
                <div class="weui-uploader__input-box uploadImg">
                  <input  @change="upLoad" id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" multiple/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom" v-show="showBig" >
        <test  :indexes="indexes" :flag="flag">
          <div class="test" v-for="item of srcList" >
            <slot name="del">
              <div>
                <top>
                  <div slot="left"></div>
                  <a style="background: white;border: none;font-size: 16px;color: #3CC51F"  class="step" @touchstart="testDelete(item.attaFileUrl)">删除</a>
                </top>
              </div>
            </slot>
            <div style="display: flex;height: 100%;align-items: center"  @click="showContain">
              <img :src="item.url" />
            </div>
          </div>
        </test>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import top from './app-header.vue'
import ajax from '../lib/ajax'
import test from './test.vue'
    export default{
      props:['imgList'],
        components: {
          test,
          top
        },
        data(){
            return {
              index:0,
            srcList:[],
              num:0,
              attaIdList:[],
              showBig:false,
              indexes:Number,
              flag:0
            }
        },
      watch:{
        imgList:function () {
          this.srcList=this.imgList.slice();
          this.getId()
        }
      },
        mounted(){

        },
      methods:{
        showContain(){
          this.$set(this.$data,'showBig',false)
        },

        testDelete(url){
            for(var i=0;i<this.srcList.length;i++){
              if(this.srcList[i].attaFileUrl==url){
                if(confirm('确定删除该图片？')){
                  this.srcList.splice(i,1)
                  this.attaIdList.splice(i,1);
                  this.$emit('getAttaIdsList',this.attaIdList)
                  this.$set(this.$data,'showBig',false)
                  console.log('删除');
                  return false;
                }
              }
            };

        },
        getId(){
          if(this.imgList){
              for(var i=0;i<this.imgList.length;i++){
                console.log(121221)
                this.attaIdList.push(this.imgList[i].attaId)
              }
              this.$emit('getAttaIdsList',this.attaIdList)
          }
        },
        getUrlIdList(val){

        },
        upLoad(e){
          if(this.attaIdList.length>8){
            alert('最多可以上传9张图片')
            return false;
          }else {

            var  url = window.URL || window.webkitURL || window.mozURL, files = e.target.files;
            console.log(files,9999)
            for (var i = 0, len = files.length; i < len; ++i) {
              var file = files[i];
              if (url) {
                var src  = {}
                src.url = url.createObjectURL(file);
                this.srcList.push(src);
              } else {
                var src  = {}
                src.url = e.target.result;
                var arr = this.srcList;
                arr.push(src)
                this.$set(this.$data,'srcList',arr);
              }
            }
            var file = e.target.files[0];
            var $this = this
            ajax(file,{
              progress:function (evt) {
                if (evt.lengthComputable) {
                  var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                  $this.$set($this.$data,'num',percentComplete)
                }else {
                  console.log('无法计算')
                }
              }
            }).then(data=>{
              if(data.succ){
                this.attaIdList.push(data.obj.attaId)
                this.$emit('getAttaIdsList',this.attaIdList)
                alert('上传成功')
              }else {
                alert('上传失败')
              }
            })
          }
        },
        deleteImg(indexes,url){
          this.$set(this.$data,'indexes',indexes)
          this.flag++;
          this.$set(this.$data,'showBig',true)

          var $this = this;

        }
      }
    }
</script>
<style scoped lang='scss'>
    @import '../common/public.scss';



    .uploadImg{
      width: 140rem/$rem;
      height: 140rem/$rem;
      margin: 3px;
    }

    #uploaderInput{
      width: 140rem/$rem;
      height: 140rem/$rem;
      display: inline-block;
    }
    .hint{
      padding-left: 30rem/$rem;
      box-sizing: border-box;
    }
    .weui-uploader__file{
      display: inline-block;
      margin: 0px;
      width: 140rem/$rem;
      height: 140rem/$rem;
      margin-right: 5px;
      margin-bottom: 5px;
    }
  .bottom{
    position: fixed;
    background: lightgrey;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
  }
    .test {
      float: left;
      width: 100%;
      height: 100%;
    }

   .test img {
      width: 100%;
      display: block;
    }
</style>
