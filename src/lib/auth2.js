import api from "./api";
import {openidCache, userCache} from "./cache"

const APPID = "wx6e3551dee5f7e716";
const COMPONENT_APPID = "wxe24cab30ebb1e366";

export default (cb) => {
  let href = location.href;
  let redirect_uri = encodeURIComponent(href);
  let jumpTo = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=${COMPONENT_APPID}#wechat_redirect`;

  let openid = openidCache.get(), query = url("?"), hash = url("#");
  let UA = window.navigator.userAgent.toLocaleLowerCase();

  /*微信打开*/
  if (/micromessenger/.test(UA)) {

    /*本地有openid*/
    if (openid || (query && query.openid) || (hash && hash.openid)) {
      openidCache.set(openid);
      cb();
    }
    /*本地无openid*/
    else {
      /*跳转回来后*/
      if (query && query.code && query.state) {
        console.log("code:" + query.code);
        api("smarthos.wechat.user.get.bycode", {code: query.code})
          .then((res) => {
            console.log("response:", res);
            if (res.code == 0 && res.obj) {
              return res.obj;
            } else {
              return api("nethos.pat.login", {
                patMobile: "17130049182",
                patPassword: sha512(hex_md5('a12345678') + 'a12345678')
              })
            }
          }).then((data) => {
          if (data.code == 0) {
            localStorage.setItem("token", data.token);
            cb();
          } else {
            userCache.set(data);
            openidCache.set(data.id);
            cb();
          }
        })
      }
      /*跳转至授权页*/
      else {
        location.href = jumpTo;
      }
    }
  }
  /*非微信打开*/
  else {
    console.log("openid:" + openid);
    cb();
  }
}
