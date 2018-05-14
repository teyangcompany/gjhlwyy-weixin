import {openidCache} from "./cache"
import {getENV} from "./util"

// const APPID = "wxa49f90b4ff678ef2";

export default (cb) => {
  // .replace()
  let href = location.href;
  let redirect_uri = encodeURIComponent(href);
  // let jumpTo = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=${COMPONENT_APPID}#wechat_redirect`;

  let query = url("?") || {}, hash = url("#") || {};
  let UA = window.navigator.userAgent.toLocaleLowerCase();

  /*微信打开*/
  if (/micromessenger/.test(UA)) {
    /*本地有openid*/
    let openidFromCache = openidCache.get();
    if (openidFromCache) {
      cb();
    }
    /*本地无openid*/
    else {
      let callback = location.href;
      callback = encodeURIComponent(callback);
      // location.replace(`http://test-zheer-wx.hztywl.cn/oauth2/?appid=${APPID}&callback=${callback}&plat=${env.plat}`);
      location.replace('login.html?callback=' + callback);
    }
  }
  /*非微信打开*/
  else {
    let env = getENV();
    console.log('process.env', process.env);
    process.env.NODE_ENV === "development" ? openidCache.set('omrmBv98kC28OfJf1dbEo33qTKBU') : '';
    // omrmBv61sj9FDFuma9qdi2pOrJPw
    // omrmBvwVz1JncKnh0ee2kGVdNSR8
    // omrmBv1p9porIc2z0IZkPm4q7dS4
    // omrmBv4ql8LgJGC_8TVFn_-syk00杜祥芬
    // oyPlf025WmkQzr8e7y5LnFoW4IeM吴大伟
    // oyPlf04E_PUwHqBBa5mbIBYoV2O4
    // omrmBv98kC28OfJf1dbEo33qTKBU李明卫
    // omrmBv4jxPNW6njcUg-0A4L-PRHc
    // omrmBv78TNZhMhUwl3TEWxFU4ZBQ
    // omrmBv4_Tsfwc_r6dJfTIN39rXDE
    // omrmBvx_8_iWHCNcrjwuVVA6Nc_A
    // omrmBv32MoLEuBm983nj-tkYRZh8
    // omrmBv9u0MDSuPEaQ0r-XCYcI9I8
    cb();
  }
}
