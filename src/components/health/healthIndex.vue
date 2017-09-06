<template>
    <div class="healthIndex">
      <div class="menu" ref="menu">
        <ul ref="wrapWidth" class="border-1px">
          <li class=" arrangeTime" :class="{picked:selected == index}"  v-for="(item,index) in infoTitle" @click="selectTitle(index)">
            <p>{{item.typeName}}</p>
          </li>
        </ul>
      </div>
      <div class="wrapList">
        <div v-for="item in healthList"  class="healthList border-1px"  :key="item.id" @click="goDetail(item)">
          <div>
            <div>
              <img :src="item.imgUrl" alt="">
            </div>
            <div>
              <p>{{ item.title }}</p>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <!--<nav-bar :tagNames="onlineNames" ></nav-bar>-->
    </div>
</template>
<script>
  import header from '../../base/header'
  import navBar from '../../base/navBar'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  export default{
      data(){
          return{
            title:'健康资讯',
            rightTitle:'',
            tellPath:"",
            infoTitle:"",
            selected:1,
            healthList:""
//            onlineNames:[
//              {title1:"美容养颜",tabLink:'/myProfile/healthIndex/beautify'},
//              {title1:"健康内容",tabLink:'/myProfile/healthIndex/healthContent'},
//              {title1:"时令进补",tabLink:'/myProfile/healthIndex/season'},
//              {title1:"两性健康",tabLink:'/myProfile/healthIndex/gender'},
//            ],
          }
      },
      methods:{
          _initTitleScroll(){
              let itemWidth = 170
              let margin = 0
              let width = (itemWidth + margin)*4 - margin
              this.$refs.wrapWidth.style.width = width + 'px'
              this.$nextTick(()=>{
                this.titleScroll = new BScroll(this.$refs.menu,{
                  scrollX:true,
                  eventPassthrough: 'vertical'
                })
              })
          },
        goDetail(item){
            this.$router.push({
              path:"/healthInfoDetail",
              query:{newId:item.newId,title:item.title}
            })
           console.log(item)
        },
        selectTitle(index){
           this.selected = index
          this.titleScroll.scrollTo(-60*index,0,1000)
          console.log(this.titleScroll)
           api("nethos.system.information.list",{
             typeId:this.infoTitle[this.selected].id,
             typeName:this.infoTitle[this.selected].typeName
           }).then((data)=>{
               this.healthList = data.list
               console.log(data)
           })
        }
      },
      created(){
        api("nethos.system.information.type.list",{
        }).then((data)=>{
            if(data.code == 0){
              this.infoTitle = data.list
              console.log(this.infoTitle)
              api("nethos.system.information.list",{
                typeId:this.infoTitle[this.selected].id,
                typeName:this.infoTitle[this.selected].typeName
              }).then((data)=>{
                this.healthList = data.list
              })
            }
        })
      },
      mounted(){
        this.$nextTick(()=>{
          this.tellPath = this.$route.path
        })
      },
      components:{
        'VHeader':header,
        navBar
      },
      watch:{
        "$route":function(){
          this.tellPath = this.$route.path
        },
        infoTitle(){
            this.$nextTick(()=>{
              this._initTitleScroll()
            })
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
.healthIndex{
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background-color:white;
  .menu{
    position: fixed;
    left:0;
    right:0;
    top: 50px;
    z-index:100;
    ul{
      width:100%;
      display: flex;
      height: 40px;
      background-color: white;
      li{
        list-style-type: none;
        flex:1;
        font-size: 32rem/$rem;
        text-align: center;
        height: 40px;
        p{
          height: 40px;
          font-size: 32rem/$rem;
          color: #333333;
          line-height: 40px;
        }
      }
      li.picked{
        p{
          border-bottom: 2px solid $mainColor;
          background-color:$bgColor2;
        }
      }
    }
  }
  .wrapList{
    position: fixed;
    top: 90px;
    left:0;
    right:0;
    bottom:0;
    .healthList{
      width:100%;
      >div{
        width: 690rem/$rem;
        height: 180rem/$rem;
        margin: 0 auto;
        display: flex;
        align-items: center;
        >div{
          height:135rem/$rem;
          img{
            width:180rem/$rem;
            height:135rem/$rem;
            margin-right: 32rem/$rem;
          }
          p:nth-child(1){
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
            font-size: 32rem/$rem;
            font-family: PingFang-SC-Regular;
            color: #333333;
            line-height: 46rem/$rem;
          }
          p:nth-child(2){
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 28rem/$rem;
            color: #999999;
            line-height: 46rem/$rem;
          }
        }
      }
    }
  }
}
</style>
