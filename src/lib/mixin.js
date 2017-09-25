import {openidCache} from "./cache"

export const isLoginMixin = {
  data(){
    return{
      path:""
    }
  },
  created() {
    this.path = this.$route.path
    console.log(this.path)
    let openid = openidCache.get();
    // if (!openid) {
    //
    //   this.$router.push({
    //     path:"/bindRelativePhone",
    //     query:{backPath:this.path}
    //   })
    // }
  },
  watch:{
    "$route":function(){
      this.path = this.$route.path

      // this.$router.push("/profile")

    }
  }
}
