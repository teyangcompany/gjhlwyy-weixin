<template>
  <!-- 切换就诊人模块-->
  <my-popup :show="showPat" @activate="close">
    <div slot="contain" class="contain">
      <div class="title">
        <p class="m light border-1px">{{ option }}</p>
      </div>
      <div class="main" id="wrapper">
        <div>
          <div v-for="(item,index) in patList" @click="checkDoctor(index)">
            <p class="dark border-1px">{{item.compatName}}</p>
          </div>
          <p class="lightBlue border-1px" @click="addPat()" v-if="path !='/bookService'">添加常用就诊人 <span> <img src="../../static/img/add.png"></span></p>
        </div>
      </div>
      <div class="ft">
        <p class="dark cancel" @click="closeToggle()">取消</p>
      </div>
    </div>
  </my-popup>
</template>
<script>
  import MyPopup from "./pop.vue";
  import IScroll from 'iscroll'
  export default({
    data(){
      return{
        path:""
      }
    },
    components:{
      MyPopup
    },
    props:{
      showPat:{
        type:Boolean,
        default:false,
        required:true
      },
      patList:{
        type:Array,
        default:[],
        required:true
      },
      option:{
        type:String,
      }
    },
    mounted(){
      this.path = this.$route.path
    },
    methods:{
//      _initPatient(){
//         this.myScroll = new IScroll("#wrapper",{
//           mouseWheel: true,
//           momentum:true,
//           useTransition:true,
//           click:true
//         })
//      },
      checkDoctor(index){
        this.$emit("activate",index);
      },
      addPat(){
        this.$router.push("/addUsualPatient");
      },
      close(){
        this.$emit("close");
      },
      closeToggle(){
        this.$emit("toggleClosed")
      },
      close(){
        this.$emit("toggleClosed")
      }
    },
    watch:{
      "$route":function(){
        this.path = this.$route.path
      }
    }
  })
</script>
<style scoped lang="scss">
  @import "../common/var.scss";
  @import '../common/mixin.scss';
  @mixin letter{
    padding: 0.5rem 0.7rem;
  }
  .contain{
    background:rgb(238,238,238);
    display:flex;
    flex-direction:column;
    flex:1 1 auto;
    div{
      background:white;
      p{
        position:relative;
        font-size: 32rem/$rem;
        color: #333333;
        /*border-top:1px solid silver;*/
        @include letter;
        img{
          position:absolute;
          height:1rem;
          left:13rem;
          top:.8rem;
        }
      }
      flex:0 0 auto;
      text-align:center;
      padding:0 auto;
      &.ft{
        margin-top:.5rem;
      }
    }
    div#wrapper{
      /*height:10rem;*/
      /*width:100%;*/
      flex: 1 1 auto;
      /*overflow:hidden;*/
      >div{
        >p{
          >span{

          }
        }
      }
    }
  }
</style>
