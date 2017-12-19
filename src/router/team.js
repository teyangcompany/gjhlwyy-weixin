import Index from "../page/team/index.vue"
import Consult from '../page/team/consult'
import Detail from '../page/team/detail'

export default [
  {
    path: "/team/:id",
    component: Index
  },
  {
    path: "/team/:id/consult",
    component: Consult
  },
  {
    path: "/team/:id/detail",
    component: Detail
  }
]
