export const CACHE_PREFIX = "gjhlwyy_" + window.version + "_";
export const API_URL = {
  "localhost": {
    api: "//nethos.diandianys.com/api/app",
    socket: "//nethoswebsocket.diandianys.com",
    appid: "wxa49f90b4ff678ef2",
    plat: "dev"
  },
  "nethosweb.diandianys.com": {
    api: "//nethos.diandianys.com/api/app",
    socekt: "//nethoswebsocket.diandianys.com",
    appid: "wxa49f90b4ff678ef2",
    plat: "dev"
  },
  "test-zheer-wx.hztywl.cn": {
    api: "//nethos.diandianys.com/api/app",
    socekt: "//nethoswebsocket.diandianys.com",
    appid: "wxa49f90b4ff678ef2",
    plat: "dev"
  },
  "pat-test.gjwlyy.com": {
    api: "//api-test.gjwlyy.com/api/app",
    socket: "doc-test.gjwlyy.com",
    appid: "wx3d274480f31f6de2",
    plat: "pro"
  },
  "www.gjwlyy.com": {
    api: "//api.gjwlyy.com/api/app",
    socket: "socket.gjwlyy.com",
    appid: "wx3d274480f31f6de2",
    plat: "pro"
  }
}
export const openRealNameOauth = false

export const relationship = ["本人", "父母", "配偶", '子女', '亲戚', '朋友', '其他']

export const editForm = {
  "nethos.pat.info.modify": {
    id: "patId",
    name: "patName",
    card: "patIdcard"
  },
  "nethos.pat.compat.modify.v2": {
    id: "compatId",
    name: "compatName",
    card: "compatIdcard"
  }
}
