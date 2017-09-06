<template>
    <div>

    </div>
</template>
<script>
  export default{
      data(){
          return{
              result:"",
              consultId:""
          }
      },
      mounted(){
          this.result = this.$route.query.result
          this.consultId = this.$route.params.id
          if(this.result == 'cancel'){
              this.$router.push({
                path:'/videoPay',
                query:{consultId:this.consultId}
              })
          }else if(this.result == 'fail'){
            this.$router.push({
              path:'/videoPay',
              query:{consultId:this.consultId}
            })
          }else if(this.result == 'success'){
              this.$router.push({
                path:'/waitArrange',
                query:{consultId:this.consultId}
              })
          }
      },

  }
</script>
<style>

</style>
