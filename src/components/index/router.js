/**
 * Created by Administrator on 2017/8/21.
 */
import quickConsult from './quickConsult'
import writeInfo from './writeInfo'
import writeSubmit from './writeSubmit'
import submitSuccess from './submitSuccess'
import book from './book'
import selectType from './selectType'
import bookType from './book/bookType'
import expert from './book/expert'
import date from './book/date'
import expertDetail from './book/expertDetail'
import infoConfirm from './book/infoConfirm'
import bookSuccess from './book/bookSuccess'
import videoIndex from './doctorVideo/videoIndex'
import doctorCard from './doctorVideo/doctorCard'
import apply from './doctorVideo/apply'
import videoSubmit from './doctorVideo/videoSubmit'
import videoWriteInfo from './doctorVideo/videoWriteInfo'
import videoPay from './doctorVideo/videoPay'
import internetRoom from './onlineDoctor/internetRoom'
import onlineDoctorCard from './onlineDoctor/onlineDoctorCard'
import pictureConsultApply from './onlineDoctor/pictureConsultApply'
import videoConsultApply from './onlineDoctor/videoConsultApply'
import pictureConsultNext from './onlineDoctor/pictureConsultNext'
import allConsultNext from './allConsultNext'
import allConsultSuccess from './allConsultSuccess'
import checkReport from './checkReport/checkReport'
import waitCallNumber from './waitCallNumber/waitCallNumber'
import checkSortList from './checkReport/checkSortList'
import testReportDetail from './checkReport/testReportDetail'
import checkReportDetail from './checkReport/checkReportDetail'
import testReportCard from './checkReport/testReportCard'
import checkReportCard from './checkReport/checkReportCard'
import myCallNumber from './waitCallNumber/myCallNumber'
import downloadPage from './onlineDoctor/downloadPage'
import allConsultDetail from '../my/myConsult/allConsultDetail/allConsultDetail'
import pictureConsultDetail from '../my/myConsult/pictureConsultDetail/pictureConsultDetail'
import famousConsultNext from './doctorVideo/famousConsultNext'
import videoConsultNext from './doctorVideo/videoConsultNext'
import togglePatient from './togglePatient/togglePatient'
import waitTogglePatient from './togglePatient/waitTogglePatient'
import checkTogglePatient from './togglePatient/checkTogglePatient'
import nowBook from './book/nowBook'
import articleDetail from './onlineDoctor/articleDetail'
import commentDetail from './onlineDoctor/commentDetail'
import articleList from './onlineDoctor/articleList'
import todayBook from './todayBook'
import bookTerms from './book/bookTerms'
import picScan from "../../plugins/picscan.vue"


export default [
  {
    path: "/quickConsult",
    component: quickConsult
  },
  {
    path: '/writeInfo',
    component: writeInfo
  },
  {
    path: "/writeSubmit",
    component: writeSubmit
  },
  {
    path: "/submitSuccess",
    component: submitSuccess
  },
  {
    path: '/book',
    component: book
  },
  {
    path: "/todayBook",
    component: todayBook
  },
  {
    path: "/selectType",
    component: selectType
  },
  {
    path: "/bookType",
    component: bookType,
    children: [
      {
        path: "expert",
        component: expert
      },
      {
        path: "date",
        component: date
      }
    ]
  },
  {
    path: "/expertDetail",
    component: expertDetail
  },
  {
    path: "/famousPage",
    component: () => import('./book/famousPage')
  },
  {
    path: "/infoConfirm",
    component: infoConfirm
  },
  {
    path: "/bookSuccess",
    component: bookSuccess
  },
  {
    path: "/videoIndex",
    component: videoIndex
  },
  {
    path: "/doctorCard",
    component: doctorCard
  },
  {
    path: "/apply",
    component: apply
  },
  {
    path: "/videoSubmit",
    component: videoSubmit
  },
  {
    path: "/videoWriteInfo",
    component: videoWriteInfo
  },
  {
    path: "/videoPay",
    component: videoPay
  },
  {
    path: "/internetRoom",
    component: internetRoom
  },
  {
    path: "/onlineDoctorCard",
    component: onlineDoctorCard
  },
  {
    path: "/pictureConsultApply",
    component: pictureConsultApply
  },
  {
    path: "/videoConsultApply",
    component: videoConsultApply
  },
  {
    path: "/pictureConsultNext",
    component: pictureConsultNext,
    children: [
      {
        path: "picscan",
        component: picScan
      }
    ]
  },
  {
    path: "/allConsultNext",
    component: allConsultNext
  },
  {
    path: "/allConsultSuccess",
    component: allConsultSuccess
  },
  {
    path: "/checkReport",
    component: checkReport
  },
  {
    path: "/waitCallNumber",
    component: waitCallNumber
  },
  {
    path: "/checkSortList",
    component: checkSortList
  },
  {
    path: "/testReportDetail",
    component: testReportDetail
  },
  {
    path: "/checkReportDetail",
    component: checkReportDetail
  },
  {
    path: "/testReportCard",
    component: testReportCard
  },
  {
    path: "/checkReportCard",
    component: checkReportCard
  },
  {
    path: "/myCallNumber",
    component: myCallNumber
  },
  {
    path: "/downloadPage",
    component: downloadPage
  },
  {
    path: "/allConsultDetail",
    component: allConsultDetail
  },
  {
    path: "/pictureConsultDetail",
    component: pictureConsultDetail
  },
  {
    path: "/famousConsultNext",
    component: famousConsultNext
  },
  {
    path: "/videoConsultNext",
    component: videoConsultNext
  },
  {
    path: "/togglePatient",
    component: togglePatient
  },
  {
    path: "/bookTogglePatient",
    component: () => import('./togglePatient/bookTogglePatient')
  },
  {
    path: "/waitTogglePatient",
    component: waitTogglePatient
  },
  {
    path: "/checkTogglePatient",
    component: checkTogglePatient
  },
  {
    path: "/nowBook",
    component: nowBook
  },
  {
    path: "/articleDetail",
    component: articleDetail
  },
  {
    path: "/commentDetail",
    component: commentDetail
  },
  {
    path: "/articleList",
    component: articleList
  },
  {
    path: "/bookTerms",
    component: bookTerms
  },
  {
    path: "/book/doc/:id",
    component: () => import('../../page/book/doc')
  }
]
