/**
 * Created by Administrator on 2017/8/26.
 */
import axios from 'axios';
import {openidCache} from "./cache"
import {debug, getApiUrl, makeRandom} from "./util"
import {baseParams, password} from "./config";

let base = baseParams;

export default function (service, options) {
  base.random = makeRandom(4);
  let obj = {...base, service, ...options}
  let openid = openidCache.get();
  if (openid) {
    obj.token = "OPENID_" + openid;
  }
  if (obj.needToken === false) {
    delete obj.token;
  }
  let sign = hex_md5(hex_md5(password) + JSON.stringify(obj));
  let config = {
    headers: {
      "sign": sign,
      "Content-Type": "application/json",
    },
  }

  let url = getApiUrl();
  debug("==>" + service, obj);
  return axios.post(url, obj, config)
    .then((res) => {
      // bus.$emit("loading", {status: 'stop'});
      if (res.status == 200) {
        debug(`<==${obj.service}`, res.data)
        return res.data;
      } else {
        return res;
      }
    });
}
