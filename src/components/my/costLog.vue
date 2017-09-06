<template>
    <div>
        <v-header :title="title" :rightTitle="rightTitle"></v-header>
    </div>
</template>
<script>
  import header from '../../base/header'
  export default{
      data(){
          return{
              title:"消费记录",
              rightTitle:""
          }
      },
      components:{
          "VHeader":header
      }
  }
</script>
<style>

</style>
