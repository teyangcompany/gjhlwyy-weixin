import axios from "axios";
import config from "./config"

const api_url = "//test-api-ywfy.hztywl.cn/app";
const base_params = {
  channel: "23",
  format: "JSON",
  oper: "127.0.0.1",
  random: "1234",
  sign: "3f52f63fad63c5dd209d28420977fb5d",
  spid: "1001",
};

export default function (service, options, conf) {
  let baseParams = base_params;
  let data = {
    service,
    ...baseParams,
    ...options
  };
  let axiosConfig = {
    url: api_url,
    method: "post",
    headers: {
      "sign": "test",
      "Content-Type": "application/json"
    },
    data: data
  }

  if (conf) {
    axiosConfig = Object.assign({}, axiosConfig, conf);
  }

  return axios(axiosConfig)
    .then((res) => {
      if (res.status == 200) {
        return res.data;
      }
    });
}
