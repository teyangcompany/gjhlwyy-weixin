export const CACHE_PREFIX = "gjhlwyy_" + window.version + "_";
export const API_URL = {
  "localhost": {
    web: 'nethosweb.diandianys.com',
    api: "//nethos.diandianys.com/api/app",
    jssdk: "test-zheer-wx.hztywl.cn",
    socket: "//nethoswebsocket.diandianys.com",
    appid: "wxa49f90b4ff678ef2",
    plat: "dev",
    team:'5ade811584ae5b958bba6451'
  },
  "nethosweb.diandianys.com": {
    web: 'nethosweb.diandianys.com',
    api: "//nethos.diandianys.com/api/app",
    jssdk: "test-zheer-wx.hztywl.cn",
    socekt: "//nethoswebsocket.diandianys.com",
    appid: "wxa49f90b4ff678ef2",
    team:'5ade811584ae5b958bba6451',
    plat: "dev"
  },
  "test-zheer-wx.hztywl.cn": {
    web: 'nethosweb.diandianys.com',
    api: "//nethos.diandianys.com/api/app",
    jssdk: "test-zheer-wx.hztywl.cn",
    socekt: "//nethoswebsocket.diandianys.com",
    appid: "wxa49f90b4ff678ef2",
    plat: "dev",
    team:'5ade811584ae5b958bba6451'
  },
  "pat-test.gjwlyy.com": {
    web: 'pat-test.gjwlyy.com',
    api: "//api-test.gjwlyy.com/api/app",
    jssdk: "test-zheer-wx.hztywl.cn",
    socket: "doc-test.gjwlyy.com",
    appid: "wx3d274480f31f6de2",
    plat: "pro",
    team:'5ade811584ae5b958bba6451'
  },
  "www.gjwlyy.com": {
    web: 'www.gjwlyy.com',
    api: "//api.gjwlyy.com/api/app",
    jssdk: "www.gjwlyy.com",
    socket: "socket.gjwlyy.com",
    appid: "wx3d274480f31f6de2",
    plat: "pro",
    team:'5ade811584ae5b958bba6451'
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


export const docNav = [
  {name: "book", value: "预约挂号", open: false, show: false},
  {name: "pic", value: "图文问诊", open: true, price: ''},
  {name: "video", value: "视频问诊", open: true, price: ''},
  {name: "famous", value: "名医咨询", open: true, price: ''},
  {name: "team", value: "团队咨询", open: true}
]

export const baseParams = {
  channel: "3",
  format: "JSON",
  oper: "127.0.0.1",
  spid: "1001",
  version: '2.5.0'
}

export const password = "aAr9MVS9j1";

export const couponType = {
  DISCOUNT_COUPON: '折扣券',
  FULL_REDUCTION_COUPON: '满减券',
  DIRECT_REDUCTION_COUPON: '直减券'
}

export const couponStatus = {
  UNUSED: {text: '可用', value: 0},
  USED: {text: '已使用', value: 2},
  PAST_DUE: {text: '已过期', value: 1},
  NOT_AVAILABLE: {text: '不可用', value: 1}
}

export const CONSULT_TYPE = {
  PIC: '全科咨询', DOCPIC: '图文咨询', VIDEO: '名医视频', DOCVIDEO: '视频咨询', TEAMPIC: '团队咨询'
}

export const DOWNLOAD = 'http://api.gjwlyy.com/api/download/pat/index.html';

export const MY_DOC_NAV = [
  {name: 'msg', value: '最近会话'},
  {name: 'follow', value: '关注医生'},
  {name: 'team', value: '关注团队'}
]

export const DOWNLOAD_CONTENT = '微信暂不支持该功能，请前往应用商店下载app来'

export const ORDER_STATUS = ['待支付', '已挂号', '已就诊', '停诊', '未就诊', '已取消'];

export const OPEN_TEAMPIC = true;

export const OPEN_NEW_MYBOOK_VERSION = true;

export const OPEN_NEW_MYDOC_VERSION = false;

export const OPEN_MYPAY_VERSION = true;

export const OPEN_ARTICLE_DETAIL_VERSION = true;

export const NEW_PIC_CONSULT_SUBMIT = true;

export const OPEN_MYCONSULT_VERSION = true;

/**
 * 订单状态
 * @type {*[]}
 */
export const CONSULT_STATUS = [
  {value: -1, name: 'CANCEL', title: '已取消'},
  {value: 0, name: 'NEEDPAY', title: '待付款'},
  {value: 2, name: 'GOING', title: '进行中'},
  {value: 4, name: 'NEEDCOMMENT', title: '待评价'},
  {value: 6, name: 'FINSH', title: '已评价'}
]

/**
 * 号源状态
 * @type {string[]}
 */
export const SCHEME_STATUS = ["无", "停诊", "已满", "即将(未放号或号子被锁定)", "预约"]

/**
 * 报告类型
 * @type {*[]}
 */
export const REPORT_TYPE = [
  {service: 'nethos.book.inspect.examination', name: '检查报告'},
  {service: 'nethos.book.inspect.list', name: '检验报告'},
  {service: 'zheer.yygh.ApiJyjcService.ExamList', name: '体检报告'},
]

