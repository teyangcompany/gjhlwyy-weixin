<template>
  <div class="wrapIll">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="ill">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea"  placeholder="请输入文本" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import header from '../../../base/header'
  export default{
    data(){
      return{
        title:"既往史",
        rightTitle:"保存"
      }
    },
    components: {
      "VHeader":header
    },
    mounted(){

    },
    methods:{

    }
  }
</script>
<style scoped lang='scss'>
  @import '../../../common/public.scss';
  .wrapIll{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:100;
    .ill{
      position: fixed;
      top: 50px;
      bottom:0;
      left:0;
      right:0;
      background-color: #FFFFFF;
    }
  }
</style>
