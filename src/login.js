import {getENV} from "./lib/util";
import {callbackCache, openidCache} from "./lib/cache";

let env = getENV();
console.log('env', env);

let query = url('?'),
  openidFromUrl = query.openid || null;
if (openidFromUrl) {
  openidCache.set(openidFromUrl);
  let back = callbackCache.get();
  back && location.replace(back);
} else {
  let {appid: APPID} = env,
    back = query.callback;
  callbackCache.set(back);
  location.replace(`http://test-zheer-wx.hztywl.cn/oauth2/?appid=${APPID}&callback=${encodeURIComponent(location.origin + location.pathname)}&plat=${env.plat}`);
}
