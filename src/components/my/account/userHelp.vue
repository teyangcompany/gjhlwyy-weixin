<template>
    <div id="onlinepage">
        <top>
            <div class="middle big bf">使用说明</div>
        </top>

        <div class="wrap" ref="wrapper">
          <div >
            <div class="project">
              <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(1)">
                  <div class="weui-cell__bd">
                    <p class="bf">全科分诊</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(2)">
                  <div class="weui-cell__bd">
                    <p class="bf">名医视频</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(3)">
                  <div class="weui-cell__bd">
                    <p class="bf">在线医生</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(4)">
                  <div class="weui-cell__bd">
                    <p class="bf">预约挂号</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(5)">
                  <div class="weui-cell__bd">
                    <p class="bf">查报告单</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;"  @click="goDetail(6)">
                  <div class="weui-cell__bd">
                    <p class="bf">排队叫号</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(7)">
                  <div class="weui-cell__bd">
                    <p class="bf">我的医生</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
              </div>
            </div>
            <div class="patMessage">
              <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(8)">
                  <div class="weui-cell__bd">
                    <p class="bf">常用就诊人</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(9)">
                  <div class="weui-cell__bd">
                    <p class="bf">健康档案</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(10)">
                  <div class="weui-cell__bd">
                    <p class="bf">消费明细</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
              </div>
            </div>
            <div class="account">
              <div class="weui-cells">
                <a class="weui-cell weui-cell_access" href="javascript:;"  @click="goDetail(11)">
                  <div class="weui-cell__bd">
                    <p class="bf">修改绑定手机号</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
                <a class="weui-cell weui-cell_access" href="javascript:;" @click="goDetail(12)">
                  <div class="weui-cell__bd">
                    <p class="bf">修改密码</p>
                  </div>
                  <div class="weui-cell__ft">
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>


    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../base/app-header.vue'
    import Api from '../../../lib/api'
    import BScroll from 'better-scroll'
    export default{
        components: {
            top
        },
        data(){
            return {}
        },
        mounted(){
          this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.wrapper,{
              click:true
            })
          });

        },
        methods: {
          goDetail(state){
            this.$router.push({
              name: 'detailDescription',
              params: {
                state: state
              }
            })
          },

        }
    }
</script>
<style scoped lang="scss">
  @import "../../../common/public.scss";
  #onlinepage{
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .wrap{
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    /*margin-bottom: 10px;*/
    position: fixed;
    left: 0;
    top: 44px;
    right: 0;
    bottom: 0;
  }

</style>
