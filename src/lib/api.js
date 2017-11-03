/**
 * Created by Administrator on 2017/8/26.
 */
import axios from 'axios';
import {openidCache} from "./cache"
import {getApiUrl, makeRandom} from "./util"

const password = "aAr9MVS9j1";
let base = {
  channel: "3",
  format: "JSON",
  oper: "127.0.0.1",
  spid: "1001",
};

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

  return axios.post(url, obj, config)
    .then((res) => {
      // bus.$emit("loading", {status: 'stop'});
      if (res.status == 200) {
        console.log(`<==${obj.service}`, res.data)
        return res.data;
      } else {
        return res;
      }
    });
}
