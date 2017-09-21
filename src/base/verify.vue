<template>
  <div>
    <p>
      {{ verifyTips }}
    </p>
  </div>
</template>
<script>
  export default{
    props:{
        verifyTips:{
            type:String,
            default:"手机号不能为空"
        }
    }
  }
</script>
<style scoped lang="scss">
  @import '../common/public.scss';
  div{
    p{
      background-color: #333333;
      color: #ffffff;
      width: 350rem/$rem;
      height: 80rem/$rem;
      font-size: 32rem/$rem;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
