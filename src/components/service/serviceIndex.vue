<template>
    <div class="service">
        <div class="serviceCenter">
            <router-link tag="div" to="/myDoctor/recentChat" class="avatarArea">
              <img src="../../../static/img/我的医生.png" alt="">
            </router-link>
        </div>
    </div>
</template>
<script>
  export default{

  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
.service{
  position: fixed;
  top:50px;
  left:0;
  right:0;
  bottom:0;
  background-color: $bgColor1;
  .serviceCenter{
    width:690rem/$rem;
    height:100%;
    background-color: $bgColor1;
    margin:0 auto;
    .avatarArea{
      width:260rem/$rem;
      height:260rem/$rem;
      margin-top: 10px;
      background-color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width:140rem/$rem;
        height:140rem/$rem;
      }
    }
  }
}
</style>
