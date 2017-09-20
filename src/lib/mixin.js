import {openidCache} from "./cache"

export const isLoginMixin = {
  created() {
    let openid = openidCache.get();
    if (!openid) {
      this.$router.push("/profile")
    }
  }
}
