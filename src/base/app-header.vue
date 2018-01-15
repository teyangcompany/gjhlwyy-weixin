<template>
  <header id="header">
        <div class="left" @click="back">
          <slot name="left">
            <font><span>&#xe61d;</span></font>
          </slot>
         </div>
        <slot class="bf"> </slot>
      <div class="right bf">
        <slot name="right"></slot>
      </div>
  </header>
</template>


<script>

  export default {
    props: {},
    data() {
      return {};
    },
    computed: {},

    mounted() {
//        document.getElementById("header").addEventListener("touchmove",this.preventDefault);
    },
    beforeDestroy() {
//        document.getElementById("header").removeEventListener("touchmove",this.preventDefault);
    },

    methods: {
        preventDefault(e){
            e.preventDefault();
        },
      back(){
        this.$router.go(-1)
      }
    }

  };
</script>

<style scoped lang="scss">
  @import "../common/public.scss";
  @font-face {
    font-family: 'iconfont';
    src: url('//at.alicdn.com/t/font_33qiq29sp5y7gb9.woff') format('woff'),
  }
  span{
    font-family: 'iconfont';
    font-size: 18px;
  }

  $w:4.5rem;

  header{
    position: relative;
    height:88rem/$rem;
    line-height: 88rem/$rem;
    background-color: white;
    width: 100%;
    text-align: center;
    border-bottom:1px solid gainsboro;
   z-index:998;
  }




.left{
  position: absolute;
  top:0px;
  left: 10px;
  /*height: 45px;*/
  /*line-height: 45px;*/
  z-index: 998;
}
  .right{
    position: absolute;
    top: 0px;
    right: 15px;
    height: 45px;
    line-height: 45px;
    z-index: 998;
  }

</style>
