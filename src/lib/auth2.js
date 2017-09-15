import wx from "./wx";
import {openidCache} from "./cache"

const APPID = "wx6e3551dee5f7e716";
const COMPONENT_APPID = "wxe24cab30ebb1e366";

export default (cb) => {
    let href = location.href;
    let redirect_uri = encodeURIComponent(href);
    let jumpTo = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE&component_appid=${COMPONENT_APPID}#wechat_redirect`;

    let UA = window.navigator.userAgent.toLocaleLowerCase();

    /*微信打开*/
    if (/micromessenger/.test(UA)) {
        let openid = openidCache.get();
        /*本地有openid*/
        if (openid) {
            cb();
        }
        /*本地无openid*/
        else {
            let params = url("?");
            /*跳转回来后*/
            if (params && params.code && params.state) {
                alert("code:" + params.code ? params.code : "");
                wx("smarthos.wechat.user.get.bycode", {code: params.code})
                    .then((res) => {
                        alert(JSON.stringify(res));
                        cb();
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
        cb();
    }
}