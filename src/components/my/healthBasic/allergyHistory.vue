<template>
  <div class="wrapIll">
    <top>
      <div class="middle big">过敏史</div>
      <span slot="right" class="step" @click="save">保存</span>
    </top>
    <div class="ill">
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea v-model="familyText" class="weui-textarea"  placeholder="请输入文本" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../../base/app-header.vue'
  import api from '../../../lib/api'
  export default{
    data(){
      return{
        familyText:'',
        patId:"",
        token:localStorage.getItem('token')
      }
    },
    components: {
      top
    },
    mounted(){
      this.familyText = this.$route.params.val;
      this.patId = this.$route.params.patId;
    },
    methods:{
      save(){
        api('nethos.pat.medicalinfo.modify',{
          token:this.token,
          patId:this.patId,
          allergyHistory:this.familyText
        }).then(res=>{
          console.log(res,66666);
          if(res.succ){
            alert('修改成功');
            this.$router.push({
              name:'healthFile'
            })
          }else {
            alert(res.msg)
          }
        })
      }
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../../common/public.scss';
  .step {
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
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
