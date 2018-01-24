import Consult from '../page/team/consult'
import Detail from '../page/team/detail'
import ConsultDetail from '../page/team/consult-detail'
import Rate from '../page/team/rate'

export default [
  {
    path: "/team/:id/consult",
    component: Consult
  },
  {
    path: "/team/:id/detail",
    component: Detail
  },
  {
    path: "/team/:id/rate",
    component: Rate
  },
  {
    path: "/team/consult/:id",
    component: ConsultDetail
  },
  {
    path: "/team/list",
    component: () => import('../page/team/list')
  }
]
