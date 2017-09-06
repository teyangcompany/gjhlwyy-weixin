<template>
  <div>
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="recordDetail">
      <div class="wrapTime border-1px">
        <div class="timeCenter">
          日期
          <div >
            2017-8-15
            <img src="../../../../static/img/查看更多.png" alt="">
          </div>
        </div>
      </div>
      <div class="wrapText border-1px">
        <div>
          <p>最近身体不是太舒服，眼睛也很疼</p>
        </div>
      </div>
      <div class="wrapImg">
        <div>
          <img src="../../../../static/img/c10.jpg" alt="">
          <img src="../../../../static/img/c12.jpg" alt="">
          <img src="../../../../static/img/c15.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import weui from 'weui.js'
  import {getCurrentTime} from '../../../utils/getTime.js'
  export default{
    data(){
      return{
        title:'病历详情',
        rightTitle:'',
        time:"",
        date:""
      }
    },
    mounted(){
      this.time = getCurrentTime()
    },
    methods:{
      selectOther(){
        let that =this
        weui.datePicker({
          start: new Date(),
          end: 2030,
          defaultValue: [new Date().getFullYear(), new Date().getMonth()+1, new Date().getDate()],
          onChange: function(result){
          },
          onConfirm: function(result){
            that.$set(that.$data,'date',result)
          },
        })
      }
    },
    components:{
      'VHeader':header
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  @import '../../../common/mixin.scss';
  .recordDetail{
    width:100%;
    position: fixed;
    top: 50px;
    bottom:0;
    left:0;
    right:0;
    background-color: white;
    .wrapTime{
      width:100%;
      height: 90rem/$rem;
      .timeCenter{
        width: 690rem/$rem;
        height: 90rem/$rem;
        margin:0 auto;
        display: flex;
        align-items:center;
        font-size: 32rem/$rem;
        color: #333333;
        justify-content: space-between;
        >div{
          font-size: 32rem/$rem;
          color: #333333;
          img{
            width: 15rem/$rem;
            display: inline-block;

          }
        }
      }
    }
    .wrapInput{
      width:100%;
      height: 90rem $rem;
      .inputTitle{
        width: 690rem/$rem;
        height: 90rem/$rem;
        line-height: 90rem/$rem;
        margin:0 auto;
        font-size: 32rem/$rem;
        color: #333333;
      }
    }
    .wrapText{
      width:100%;
      height: 300rem/$rem;
      >div{
        width: 690rem/$rem;
        margin:0 auto;
        p{
          margin:0;
          padding:0;
          width:690rem/$rem;
          height:300rem/$rem;
        }
      }
    }
    .wrapImg{
      width:100%;
      >div{
        width: 690rem/$rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        img{
          width: 140rem/$rem;
          height: 140rem/$rem;
          display: inline-block;
          margin-top: 30rem/$rem;
          margin-right: 24rem/$rem;
        }
        div.uploadTip{
          margin-left: 30rem/$rem;
          h3{
            font-size: 28rem/$rem;
            color: #333333;
            font-weight: normal;
          }
          h5{
            font-size: 24rem/$rem;
            color: #999999;
            margin-top: 20rem/$rem;
            font-weight: normal;
          }
        }
      }
    }

  }
</style>
