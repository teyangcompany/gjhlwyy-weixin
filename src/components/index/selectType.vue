<template>
    <div>
         <v-header :title="title" :rightTitle="rightTitle" @on-hosList="goHosList()" @on-myBookNumber="goMyBookNumber"></v-header>
         <div class="typeArea">
              <div class="leftMenu">
                <ul>
                  <li v-for="(item,index) in category" @click="selectCategoryName(index)" :class="{category_active:clickIndex == index}">
                     <span>{{ item.deptName }}</span>
                  </li>
                </ul>
              </div>
              <div class="rightType" ref="rightScroll">
                <ul>
                  <li v-for="(item,index) in categoryDetail" @click="seeDetail(index,item)" v-if="item.hasScheme == true">
                    <span >{{ item.deptName }}</span>
                  </li>
                  <li v-for="(item,index) in categoryDetail" v-else>
                    <span  class="gray">{{ item.deptName }}</span>
                  </li>
                </ul>
              </div>
         </div>
         <toast v-if="showToast"></toast>
    </div>
</template>
<script>
  import header from '../../base/header'
  import Toast from '../../base/toast'
  import BScroll from 'better-scroll'
  import api from '../../lib/api'
  export default{
      data(){
          return{
              title:"网络诊间",
               rightTitle:"我的预约",
               bookHosId:"",
               category:[],
               clickIndex:0,
               categoryDetail:[],
               showToast:false,
               bookSort:""
          }
      },
      created(){
        this.showToast = true
          this.bookHosId = this.$route.query.bookHosId
          this.bookSort = this.$route.query.bookSort
          console.log(this.bookHosId)
          console.log(this.bookSort)
         api("nethos.book.dept.list.scheme.state",{
           bookHosId:this.bookHosId
         }).then((data)=>{
              if(data.code == 0){
                this.showToast = false
                this.category = data.list
                this.categoryDetail = this.category[this.clickIndex].deptList
                console.log(this.category)
              }
         })
      },
      methods:{
        _initRightScroll(){
            this.rightScroll = new BScroll(this.$refs.rightScroll,{
                click:true
            })
            console.log(this.rightScroll)
        },
        selectCategoryName(index){
            this.clickIndex = index
           this.categoryDetail = this.category[this.clickIndex].deptList
            console.log(index)
        },
        seeDetail(index,item){
            console.log(item.deptName)
            console.log(this.categoryDetail[index].bookDeptId)
            if(this.bookSort == '预约挂号'){
              this.$router.push({
                path:'/bookType/expert',
                query:{bookDeptId:this.categoryDetail[index].bookDeptId,bookHosId:this.bookHosId,bookSort:this.bookSort}
              })
            }else{
              this.$router.push({
                path:'/nowBook',
                query:{bookDeptId:this.categoryDetail[index].bookDeptId,bookHosId:this.bookHosId,bookSort:this.bookSort,deptName:item.deptName}
              })
            }
        },
        goHosList(){
            console.log("123")
           if(this.bookSort == '预约挂号'){
             this.$router.push('/book')
           }else{
               this.$router.push('/todayBook')
           }
//
        },
        goMyBookNumber(){
          this.$router.push('/myBookNumberSelect')
        }
      },
      components:{
          "VHeader":header,
           Toast
      },
      watch:{
        categoryDetail(){
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this._initRightScroll()
                },20)
            })
        }
      }
  }
</script>
<style scoped lang="scss">
  @import '../../common/public.scss';
.typeArea{
  position: fixed;
  top: 50px;
  right:0;
  left:0;
  bottom:0;
  display: flex;
  .leftMenu{
     flex-basis: 270rem/$rem;
     background-color: $bgColor;
    ul{
      margin:0;
      padding:0;
      li{
        font-size: 32rem/$rem;
        color: #333333;
        list-style-type: none;
        height:100rem/$rem;
        line-height: 100rem/$rem;
        span{
          padding-left: 10px;
        }
      }
      .category_active{
        background-color: white;
        border-left:2px solid $mainColor;
      }
    }
  }
  .rightType{
    flex: 1;
    /*background-color: #3CC51F;*/
    ul{
      margin:0;
      padding:0;
      li{
        font-size: 28rem/$rem;
        color: #333333;
        list-style-type: none;
        height:100rem/$rem;
        line-height: 100rem/$rem;
        span{
          padding-left: 20px;
        }
        span.gray{
          color: #999999;
        }
      }
    }
  }
}
</style>
