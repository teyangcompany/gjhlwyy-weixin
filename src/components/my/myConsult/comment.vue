<template>
  <div class="comment">
    <v-header :title="title" :rightTitle="rightTitle"></v-header>
    <div class="commentArea">
      <div class="star">
        <p>评价<span>华立</span>医生</p>
        <div id="shoplist">
          <p class="all" >
            <input type="radio" name="b" value="0"  v-model="inputdata"/>
            <span>★</span>
            <input type="radio" name="b" value="1" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" value="2" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" value="3" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" value="4" v-model="inputdata" />
            <span>★</span>
            <input type="radio" name="b" value="5" v-model="inputdata" />
            <span>★</span>
          </p>
        </div>
      </div>
      <div class="text border-1px">
        <div>
          <textarea placeholder="请输入评论（可以不填）" onselectstart="return false;" @keyup="keypress()" id="myArea" v-model="commentContent"></textarea>
        </div>
        <p class="limitNumber">
             {{textLength}}/200
        </p>
      </div>
      <div class="submitComment">
        <div @click="throwComment">
          <button >提交评价</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import header from '../../../base/header'
  import api from '../../../lib/api'
  export default{
    data(){
      return{
        title:"评价",
        rightTitle:"",
        inputdata:'',
        commentContent:"",
        consultId:"",
        textLength:0
      }
    },
    created(){
        this.consultId = this.$route.query.consultId
    },
    methods:{
      keypress(){
        this.text = document.getElementById("myArea").value
        this.textLength = this.text.length
        if(this.textLength > 200){
          document.getElementById("myArea").value = this.text.substr(0,200)
          alert("字数不能超过200")
        }
      },
      throwComment(){
        api("nethos.consult.info.comment",{
          token:localStorage.getItem("token"),
          consultId:this.consultId,
          score:this.inputdata*2,
          content:this.commentContent
        }).then((data)=>{
           if(data.code == 0){
               this.$router.push({
                 path:'/waitArrange',
                 query:{consultId:this.consultId}
               })
           }
        })
      },
    },
    components:{
      "VHeader":header
    },
    watch: {
      inputdata(value) {
        console.log(value)
        console.log(this.inputdata)
      },
      commentContent(){
        this.text = document.getElementById("myArea").value
        this.textLength = this.text.length
        if(this.textLength > 200){
          document.getElementById("myArea").value = this.text.substr(0,200)
          alert("字数不能超过200")
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  @import '../../../common/public.scss';
  .comment{
    position: fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color: rgb(245,245,245);
    .commentArea{
      position: fixed;
      top: 50px;
      width:100%;
      .star{
        width:100%;
        height:260rem/$rem;
        background-color: rgb(245,245,245);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        >p{
          font-size: 32rem/$rem;
          color: #333333;
        }
        span{
          img{
            width: 30px;
            height: 30px;
            margin-top: 20px;
          }
        }
      }
      .text{
        width:100%;
        height: 180px;
        background-color: #FFFFFF;
        >div{
          width:690rem/$rem;
          margin:0 auto;
          top: 5px;
        }
        p.limitNumber{
          position: absolute;
          top:-24px;
          right:10px;
        }
        textarea{
          width:690rem/$rem;
          height: 180px;
          outline: medium;
          border: none;
          resize: none;
          font-size: 32rem/$rem;
          color:#999999;
          /*margin-top: 5px;*/
        }
      }
      .submitComment{
        width:100%;
        height: 80rem/$rem;
        margin-top: 20px;
        >div{
          width:690rem/$rem;
          height: 80rem/$rem;
          margin:0 auto;
          button{
            width:690rem/$rem;
            height: 80rem/$rem;
            border:none;
            outline: medium;
            background-color: #3CC51F;
            color: white;
            font-size: 32rem/$rem;
            border-radius: 7px;
          }
        }
      }
    }

  }
  .all>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}
  .all>input:nth-of-type(1),
  .all>span:nth-of-type(1){display:none;}
  .all>span{font-size:2em;color:gold;
    -webkit-transition:color .2s;
    transition:color .2s;
  }
  .all>input:checked~span{color:#666;}
  .all>input:checked+span{color:gold;}
</style>
