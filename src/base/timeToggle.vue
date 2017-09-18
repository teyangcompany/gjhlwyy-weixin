<template>
  <!-- 切换就诊人模块-->
  <my-popup :show="showPat" @activate="close">
    <div slot="contain" class="contain">
      <div class="alertTitle border-1px">
        <span class="m light">{{ option}} </span>
        <span>号源情况以医院实际情况为准</span>
      </div>
      <div class="main" id="wrapper">
        <div>
          <div v-for="(item,index) in patList" @click="checkDoctor(index)" v-if="patList.length != 0">
            <p class="dark border-1px">{{item.numNo}}号，时间 {{ item.numTime }}</p>
          </div>
          <div v-else>
             <p>暂无可用号源</p>
          </div>
          <!--<p class="lightBlue border-1px" @click="addPat()" v-if="path !='/bookService'">添加家庭成员 <span> <img src="../../static/img/add.png"></span></p>-->
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
  import BScroll from 'better-scroll'
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
      _initPatient(){
        this.myScroll = new BScroll("#wrapper",{
          click:true
        })
        console.log(this.myScroll)
      },
      checkDoctor(index,item){
        this.$emit("activate",index,item);
      },
      addPat(){
        this.$router.push("/add");
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
      },
      patList(){
        this.$nextTick(()=>{
          this._initPatient()
        })
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
    div.main,div.ft{
      background:white;
      p{
        position:relative;
        height: 20px;
        line-height: 20px;
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
    div.alertTitle{
      height: 60px;
      background-color: white;
      span{
        height: 25px;
        line-height: 25px;
        font-size: 28rem/$rem;
        display: block;
        background-color: white;
        padding-left: 20px;
        color: #666666;
      }
      span:nth-child(2){
        color: #999999;
      }
    }
    div#wrapper{
      height:10rem;
      width:100%;
      flex: 1 1 auto;
      overflow:hidden;
    }
  }
</style>
