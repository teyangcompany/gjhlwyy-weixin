/**
 * Created by 李康飞 on 2017/6/23.
 */
/**
 * Created by Administrator on 2017/6/1 0001.
 */
import {baseParams, password} from "./config";
import {getENV, makeRandom} from "./util";

export default function (file, progress) {
  let form = new FormData(),
    base = baseParams,
    url = getENV().api;
  base.random = makeRandom(4);
  base.service = 'nethos.system.atta.upload';
  let sign = hex_md5(hex_md5(password) + base.spid + base.random);
  for (var item in base) {
    form.append(item, base[item])
  }
  form.append('file', file);
  let promiseXHR = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open("POST", url)
    xhr.setRequestHeader("sign", sign)
    xhr.upload.onprogress = progress;
    xhr.onload = function () {
      if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(xhr.error)
      }
    }
    xhr.send(form)
  })
  return promiseXHR
}


