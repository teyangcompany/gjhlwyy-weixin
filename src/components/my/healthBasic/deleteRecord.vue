<template>
  <div class="page">
    <top>
      <div class="middle big">病例详情</div>
      <span slot="right" class="step" @click="save">保存</span>
    </top>

    <div >
      <div class="weui-cells">
        <a @click="selectDate" class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p class="bf">日期</p>
          </div>
          <div class="weui-cell__ft bf">{{date | Getdate}}</div>
        </a>
      </div>
      <div class="weui-cells">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <p class="bf">请输入病例详情</p>
          </div>
        </div>
      </div>
      <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <textarea class="weui-textarea" v-model="caseText" placeholder="请输入文本" rows="3"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="addImg">
      <upload :imgList="imgList" v-on:getAttaIdsList="getAttaIdsList">
        <div slot="title"></div>
        <div slot="del"></div>
      </upload>
    </div>
    <div class="btn">
      <div class="text mfc">{{date |  Todate}} &nbsp;&nbsp;由{{creatorName}}添加</div>
      <a @click="deleteCase" style="background: #ff8588" href="javascript:;" class="weui-btn weui-btn_primary">删除</a>
    </div>


  </div>
</template>
<script type="text/ecmascript-6">
  import top from '../../../base/app-header.vue'
  import upload from '../../../base/upload.vue'
  import {Getdate,Todate} from '../../../lib/filter'
  import weui from 'weui.js'
  import api from '../../../lib/api'
  var token = localStorage.getItem('token');
  export default{
    components: {
      top,
      upload
    },
    filters:{
      Todate,
      Getdate

    },
    data(){
      return {
        token:localStorage.getItem('token'),
        caseObj:{},
        date:'',
        caseText:'',
        imgList:[],
        imgId:[],
        id:'',
        creatorName:'',
        medicalId:''
      }
    },
    mounted(){
      var caseObj = this.$route.params.obj;
      console.log(caseObj,121212)
      this.$set(this.$data,'caseObj',caseObj)
      this.$set(this.$data,'date',caseObj.createTime)
      this.$set(this.$data,'caseText',caseObj.medContent)
      this.$set(this.$data,'id',caseObj.patId)
      this.$set(this.$data,'medicalId',caseObj.medId)
      this.$set(this.$data,'imgList',caseObj.sysAttachmentList)
      this.$set(this.$data,'creatorName',caseObj.createName)
    },
    methods:{
      getAttaIdsList(value){
        console.log(value,88888)
        this.$set(this.$data,'imgId',value)
      },
      save(){
        api("nethos.pat.medicalhistroy.modify",{
          "medicalTime":Date.parse(new Date(this.date))/1000,
          "medicalContent":this.caseText,
          "userId":this.id,
          "attaIdList":this.imgId,
          "token":this.token,
          "medicalId":this.medicalId
        }).then(res=>{
          console.log(res,565656565656)
          if(res.succ){
            this.$router.push({
              name:'healthFile'
            })
          }else {
            this.$weui.alert(res.msg)
          }
        })
      },
      selectDate(){
        var $this = this;
        weui.datePicker({
          start: 2010,
          end: 2020,
          onConfirm: function(result){
            $this.$set($this.$data,'date','');
            console.log(result,6666);
            for(var i=0;i<result.length;i++){
              $this.date+=result[i].value+'-'
            }
            var s =  $this.date
            console.log( s.substring(0,s.length-1));
            $this.$set($this.$data,'date', s.substring(0,s.length-1))
          }
        });
      },
      deleteCase(){
        if(confirm('确定删除么？')){
          api("nethos.pat.medicalhistroy.delete",{
            medicalId:this.medicalId,
            token:this.token
          }).then(res=>{
            console.log(res,7877878)
            if(res.succ){
              alert('删除成功')
              this.$router.push({
                name:'healthFile'
              })
            }else {
              this.$weui.alert(res.msg)
            }
          })
        }

      }
    }
  }
</script>
<style scoped lang='scss'>
  @import '../../../common/public.scss';
  .addImg{
    box-sizing: border-box;
    background: white;
    padding: 30rem/$rem;
  }
  .page{
    display: flex;
    flex: 1;
    flex-direction: column;
  }
  .step {
    padding-right: 5px;
    color: #3CC51F;
    box-sizing: border-box;
  }
  .weui-cells{
    margin-top: 0;
  }
  .addImg{
    box-sizing: border-box;
    background: white;
    flex: 1;
    overflow: auto;
    /*padding:0 30rem/$rem;*/
  }
  .btn{
    /*position: fixed;*/
    margin-bottom: 20rem/$rem;
    box-sizing: border-box;
    padding: 20rem/$rem;
    width: 100%;
    background: white;
  }
  .text{
    text-align: center;
    box-sizing: border-box;
    padding-bottom: 20rem/$rem;
  }
  .addImg img{
    width: 140rem/$rem;
    height: 140rem/$rem;
    margin-right: 5px;
  }
  .weui-cells:after{
    border: none;
  }
  .bf{
    font-size: 32rem/$rem;
  }
  .mfc{
    font-size: 28rem/$rem;
    color: #999999;
  }
  .mf{
    font-size: 28rem/$rem;
  }
  .lf{
    font-size: 22rem/$rem;
  }

</style>
