<template>
    <div>
        <top>
            <div class="middle big">攻略</div>
        </top>
      <div class="wrap">
        <div class="contain">
          <div class="weui-cells" v-if="state==1">
            <a class="weui-cell weui-cell_access" href="javascript:;" @click="goTriage(1)">
              <div class="weui-cell__bd">
                <p>全科分诊</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>小病，用药咨询一下？不知道看哪个科室,医生？</p>
              <p>你只需要在首页点击全科分诊，提出你得问题，全科医生会为你在线解答(
                工作时间周一至周五9:00-17:30)
                <a href="javascript:;">立即咨询</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==2">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>名医视频</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>您可以向最好的主任专家、国际名医申请视频问诊.</p>
              <p>点击首页-名医视频，根据科室选择您想要申请的专家
                (如果您不知道选什么专家，也可以点击)
                <a href="javascript:;">帮我找专家</a>
              </p>
              <p>在填写您的就诊资料并支付费用之后，我们会为您和专家联系并安排合适的时间。届时您可以通过手机、电脑和专家面对面视频问诊。
                <a href="javascript:;">看看有哪些专家</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==3">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>在线医生</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                这里有来自广济医疗集团的好医生为您提供图文咨询、视频问诊服务。
              </p>
              <p>
                您可以点击首页-在线医生，选择合适的医生，申请服务：
              </p>
              <p>1.图文咨询。填写您的就诊资料，支付费用。然后请耐心等待医生的回复（若医生在48小时内仍未回复，我们将会为您退款）。
                2.视频问诊。填写您的就诊资料，支付费用。等待医生安排合适的视频时间。您可以通过手机或者电脑来和医生面对面视频
                （若问诊没有成功进行，我们将根据规则向您退费）。
                <a href="javascript:;">看看有哪些医生</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==4">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>预约挂号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                您可以在手机上方便的挂到浙二等医院的专家号、门诊号。
                <a href="javascript:;">去挂号</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==5">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>查报告单</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                您可以在手机上查看检查、检验的报告单
                <a href="javascript:;">去查报告单</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==6">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>排队叫号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                您可以在手机上方便的看到你挂的号前面还有多少人在排队。
                <a href="javascript:;">去查询</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==7">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>我的医生</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                扫描医生的二维码、关注医生或者使用过医生的服务都会把这个医生加入到“我的医生”。
              </p>
              <p>
                点击“服务-我的医生"来查看你关注的医生，您可以查看医生的名片，接收医生发来的消息、文章。
              </p>
              <p>
                如果医生把您设为vip，您还可以向医生发送消息。。
                <a href="javascript:;">查看我的医生</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==8">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>常用就诊人</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                您可以把自己的家人、朋友的信息添加到您的常用就诊人中。
              </p>
              <p>
                点击“我的-常用就诊人-右上角添加按钮”来添加就诊人，您多可以添加5个常用就诊人
                （包括自己）；
              </p>
              <p>
                添加就诊人之后您还可以在这里编辑、删除就诊人。
              </p>
              <p>
                成功添加后您就可以帮助他们来进行在线问诊、预约挂号、查报告单等业务啦。
                <a href="javascript:;">查看我的常用就诊人</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==9">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>健康档案</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                您可以把自己的健康状况、就诊信息记录在健康档案里，医生和您都可以方便的跟踪。              </p>
              <p>
                点击“我的-健康档案”进入，您可以填写“所患疾病”、“既往史”、“家族史”、“过敏史”来描述您的健康背景；
              </p>
              <p>
                也可以点击右下角按钮来添加丰富的图文档案。
              </p>
              <p>
                医生也可以查看并为您添加健康档案
                <a href="javascript:;">查看我的健康档案</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==10">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>消费明细</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                您在广济app中所支付或者退回到费用明细都可以在这里查询到。              <p>
                点击“我的-健康档案”进入，您可以填写“所患疾病”、“既往史”、“家族史”、“过敏史”来描述您的健康背景；
              </p>
              <p>
                点击“我的-消费明细”来查看，如果有异议您可以联系客服来问您处理。
                <a href="javascript:;">查看消费明细</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else-if="state==11">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>修改绑定手机号</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                如果您更换了手机号码，可以通过修改绑定手机号来使用新的手机号码来作为您的账号
              </p>
              <p>
              点击“我的-账户相关-修改绑定手机号”。
              </p>
              <p>
                1.我们会向您的旧手机号发送一个验证码
                2.您输入正确的验证码，和需要更换的新手机号
                3.我们再向您的新手机号发送验证码
                4.输入新的验证码，完成修改绑定手机号
              </p>
              <p>
                之后您就可以使用新的手机号来登录了（旧手机号将会失效）
                <a href="javascript:;">查看账户相关</a>
              </p>
            </div>
            </div>
          <div class="weui-cells" v-else="state==12">
            <a class="weui-cell weui-cell_access" href="javascript:;" >
              <div class="weui-cell__bd">
                <p>修改密码</p>
              </div>
              <div class="weui-cell__ft">
              </div>
            </a>
            <div class="detail">
              <p>
                如果您想要更换密码，您可以点击“我的-账户相关-修改密码”。
             </p>
              <p>
                我们会向您的登录手机号发送一个验证码，验证通过后您就可以设置新的密码了。
                <a href="javascript:;">查看账户相关</a>
              </p>
            </div>
            </div>
        </div>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import top from '../../../base/app-header.vue'
    import Api from '../../../lib/api'
    export default{
        components: {
            top
        },
        data(){
            return {
              state:Number
            }
        },
        mounted(){
          console.log(this.$route.params.state)
            this.$set(this.$data,'state',this.$route.params.state)
        }
    }
</script>
<style scoped>
  p{
    font-size: 16px;
  }
.detail{
  box-sizing: border-box;
  padding: 12px;
  border-top: 1px solid gainsboro;
  color: gray;
}
  .middle{
    font-size: 16px;
  }
</style>
