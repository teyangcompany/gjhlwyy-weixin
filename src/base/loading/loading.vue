<template>
    <div class="loading">
      <img src="./loading.gif" alt="">
      <p class="des">{{ title }}</p>
    </div>
</template>
<script>
  export default{
      props:{
          title:{
              type:String,
              default:"加载中..."
          }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
.loading{
  width: 260rem/$rem;
  height: 260rem/$rem;
  margin: 0 auto;
  background-color:white;
  text-align: center;
  border-radius: 12px;
  img{
    padding-top: 60rem/$rem;
    width: 94rem/$rem;
    height: 94rem/$rem;
  }
  .des{
    margin-top: 40rem/$rem;
    line-height: 20px;
    font-size: 32rem/$rem;
    color: #4BCEC8;
  }
}
</style>
