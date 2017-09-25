/**
 * Created by Administrator on 2017/8/26.
 */
import axios from 'axios';
import {openidCache} from "./cache"

let url = "https://nethos.diandianys.com/api/app";
let random = Math.round(Math.random() * 10000);
let sign = hex_md5(hex_md5("aAr9MVS9j1") + 1001 + random);
let base = {
  channel: "3",
  format: "JSON",
  oper: "127.0.0.1",
  random: random,
  sign: "test",
  spid: "1001",
  test: true,
};
export default function (service, options) {
  let obj = {...base, service, ...options}

  let openid=openidCache.get();

  if(openid){
    obj.token="OPENID_"+openid;
  }

  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  }
  return axios.post(url, obj, config)
    .then((res) => {
      // bus.$emit("loading", {status: 'stop'});
      if (res.status == 200) {
        return res.data;
      } else {
        return res;
      }
    });
}
