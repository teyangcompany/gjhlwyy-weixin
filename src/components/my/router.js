/**
 * Created by Administrator on 2017/8/21.
 */
import myProfile from './myProfile'
import healthIndex from "../health/healthIndex"
import beautify from '../health/beautify'
import gender from '../health/gender'
import healthContent from '../health/healthContent'
import season from '../health/season'
import index from "../index/index"
import serviceIndex from "../service/serviceIndex"
import personInfo from './personInfo'
import about from './about'
import account from './account'
import myWait from './myWait'
import healthFile from "./healthFile"
import ill from './healthBasic/ill'
import pastHistory from './healthBasic/pastHistory'
import familyHistory from './healthBasic/familyHistory'
import allergyHistory from './healthBasic/allergyHistory'
import addRecord from './healthBasic/addRecord'
import deleteRecord from './healthBasic/deleteRecord'
import detailPage from './healthBasic/detailPage'
import myConsult from './myConsult'
import canceled from './myConsult/canceled'
import commented from './myConsult/commented'
import doing from './myConsult/doing'
import waitComment from './myConsult/waitComment'
import waitPay from './myConsult/waitPay'
import consultDetail from './myConsult/consultDetail'
import arrangeInfo from './myConsult/arrangeInfo'
import waitArrange from './myConsult/waitArrange'
import myBookNumber from './myBookNumber'
import addUsualPatient from './addUsualPatient'
import detailUsual from './detailUsual'
import costLog from './costLog'
import oldPhone from './accountAbout/oldPhone'
import changeUsualPhone from './accountAbout/changeUsualPhone'
// import changePhoneSuccess from './accountAbout/changePhoneSuccess'
import oldPass from './accountAbout/oldPass'
import changePassWord from './accountAbout/changePassWord'
import bookNumberDetail from './bookNumberDetail'
import cancelApply from './myConsult/cancelApply'
import comment from './myConsult/comment'
import toggleAddUsual from './toggleAddUsual'
import bookToggleAddUsual from './bookToggleAddUsual'
import waitToggleAddUsual from './waitToggleAddUsual'
import checkToggleAddUsual from './checkToggleAddUsual'
import accountAbout from './account/accountAbout.vue'
import changePassword from './account/changePassword.vue'
import changePhone from './account/changePhone.vue'
import changePhoneSucc from './account/changePhoneSucc.vue'
import confrimPhone from './account/confrimPhone.vue'
import modificationPassword from './account/modificationPassword.vue'
import succeed from './account/succeed.vue'
import userHelp from './account/userHelp.vue'
import expenseHistory from './healthBasic/expenseHistory.vue'

import detailDescription from './account/detailDescription.vue'
import myDoc from "../../page/my/doc.vue"
import myDocFollow from '../../page/my/doc/follow'
import myDocMsg from '../../page/my/doc/msg'
import myData from "../../page/my/data.vue"

import myAuth from "../../page/my/auth.vue"
import myEdit from "../../page/my/edit.vue"

export default [
  {
    path: "/expenseHistory",
    name: 'expenseHistory',
    component: expenseHistory
  },
  {
    path: "/detailDescription",
    name: 'detailDescription',
    component: detailDescription
  },
  {
    path: "/userHelp",
    name: 'userHelp',
    component: userHelp
  },
  {
    path: "/accountAbout",
    name: 'accountAbout',
    component: accountAbout
  }, {
    path: "/changePassword",
    name: 'changePassword',
    component: changePassword
  }
  ,
  {
    path: "/changePhone",
    name: 'changePhone',
    component: changePhone
  },
  {
    path: "/changePhoneSucc",
    name: 'changePhoneSucc',
    component: changePhoneSucc
  },
  {
    path: "/confrimPhone",
    name: 'confrimPhone',
    component: confrimPhone
  }, {
    path: "/modificationPassword",
    name: 'modificationPassword',
    component: modificationPassword
  }, {
    path: "/succeed",
    name: 'succeed',
    component: succeed
  },
  {
    path: '/myProfile',
    component: myProfile,
    children: [
      {
        path: "healthIndex",
        component: healthIndex,
        children: [
          {
            path: "beautify",
            component: beautify
          },
          {
            path: "gender",
            component: gender
          },
          {
            path: "healthContent",
            component: healthContent
          },
          {
            path: "season",
            component: season
          },
        ]
      },
      {
        path: "index",
        component: index
      },
      {
        path: "serviceIndex",
        component: serviceIndex
      },
    ]
  },
  {
    path: "/personInfo",
    component: personInfo
  },
  {
    path: "/about",
    component: about
  },
  {
    path: "/account",
    component: account
  },
  {
    path: '/myWait',
    component: myWait
  },
  {
    path: "/healthFile",
    name: 'healthFile',
    component: healthFile
  },
  {
    path: "/ill",
    name: 'ill',
    component: ill
  },
  {
    path: "/pastHistory",
    name: 'pastHistory',
    component: pastHistory
  },
  {
    path: "/familyHistory",
    name: 'familyHistory',
    component: familyHistory
  },
  {
    path: "/allergyHistory",
    name: 'allergyHistory',
    component: allergyHistory
  },
  {
    path: "/addRecord",
    component: addRecord
  },
  {
    path: "/deleteRecord",
    name: 'deleteRecord',
    component: deleteRecord
  },
  {
    path: "/detailPage",
    component: detailPage
  },
  {
    path: "/myConsult",
    component: myConsult,
    children: [
      {
        path: "canceled",
        component: canceled
      },
      {
        path: "commented",
        component: commented
      },
      {
        path: "doing",
        component: doing
      },
      {
        path: "waitComment",
        component: waitComment
      },
      {
        path: "waitPay",
        component: waitPay
      },
    ]
  },
  {
    path: "/myConsult",
    component: myConsult,
    children: [
      {
        path: "online/canceled",
        component: canceled
      },
      {
        path: "online/commented",
        component: commented
      },
      {
        path: "online/doing",
        component: doing
      },
      {
        path: "online/waitComment",
        component: waitComment
      },
      {
        path: "online/waitPay",
        component: waitPay
      },
    ]
  },
  {
    path: "/consultDetail",
    component: consultDetail
  },
  {
    path: "/arrangeInfo",
    component: arrangeInfo
  },
  {
    path: '/waitArrange',
    component: waitArrange
  },
  {
    path: "/myBookNumber",
    component: myBookNumber
  },
  {
    path: "/my/book",
    component: () => import('../../page/my/book'),
    children: [
      {path: ':id', component: () => import('../../page/my/book/detail')}
    ]
  },
  {
    path: "/usualPatient",
    component: () => import('./usualPatient')
  },
  {
    path: "/addUsualPatient",
    component: addUsualPatient
  },
  {
    path: "/detailUsual",
    component: detailUsual
  },
  {
    path: "/costLog",
    component: costLog
  },
  {
    path: "/oldPhone",
    component: oldPhone
  },
  {
    path: "/changeUsualPhone",
    component: changeUsualPhone
  },
  // {
  //   path:"/changePhoneSuccess",
  //   component:changePhoneSuccess
  // },
  {
    path: "/oldPass",
    component: oldPass
  },
  {
    path: "/changePassWord",
    component: changePassWord
  },
  {
    path: "/bookNumberDetail",
    component: bookNumberDetail
  },
  {
    path: "/cancelApply",
    component: cancelApply
  },
  {
    path: "/comment",
    component: comment
  },
  {
    path: "/toggleAddUsual",
    component: toggleAddUsual
  },
  {
    path: "/myBookNumberSelect",
    component: () => import('./myBookNumberSelect')
  },
  {
    path: "/bookToggleAddUsual",
    component: bookToggleAddUsual
  },
  {
    path: "/waitToggleAddUsual",
    component: waitToggleAddUsual
  },
  {
    path: "/checkToggleAddUsual",
    component: checkToggleAddUsual
  },
  {
    path: "",
    redirect: "/myProfile",
    component: index
  },
  {
    path: "/my/doc",
    component: myDoc,
    children: [
      {path: 'msg', component: myDocMsg},
      {path: 'follow', component: myDocFollow},
      {path: 'team', component: () => import('../../page/my/doc/team')}
    ]
  },
  {path: '/chart/:id', component: () => import('../../page/my/doc/chart')},
  {path: '/my/pay', component: () => import('../../page/my/pay')},
  {path: '/my/patient', component: () => import('../../page/my/patient')},
  {
    path: "/my/data",
    component: myData
  },
  {
    path: "/my/auth",
    component: myAuth
  },
  {
    path: "/my/edit",
    component: myEdit
  },
  {
    path: "/my/consult",
    component: () => import('../../page/my/consult'),
    children: [
      {path: ':status', component: () => import('../../page/my/consult/list')}
    ]
  }
]
