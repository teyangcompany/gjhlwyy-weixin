<template>
  <div class="loading">
    <img src="./u519.png" alt="">
    <p >{{ title }}</p>
    <p class="illNumber">{{illNumber}}</p>
    <p class="des" @click="iSee()">{{failKnow}}</p>
  </div>
</template>
<script>
  export default{
    props:{
      title:{
        type:String,
        default:""
      },
      illNumber:{
        type:String,
      },
      failKnow:{

      }
    },
    methods:{
      iSee(){
        this.$emit("on-iSee")
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
  .loading{
    width: 500rem/$rem;
    height: 500rem/$rem;
    margin: 0 auto;
    background-color:white;
    text-align: center;
    border-radius: 12px;
    img{
      padding-top: 60rem/$rem;
      width: 150rem/$rem;
      height: 150rem/$rem;
    }
    p{
      font-size: 32rem/$rem;
    }
    p.illNumber{
      color: $assistWordBlue;
    }
    p.des{
      margin-top: 20rem/$rem;
      line-height: 20px;
      font-size: 36rem/$rem;
      color: #4BCEC8;
    }
  }
</style>
