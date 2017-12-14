import Index from "../page/team/index.vue"
import Add from '../page/team/add'
import Detail from '../page/team/detail'

export default [
  {
    path: "/team/:id",
    component: Index
  },
  {
    path: "/team/:id/add",
    component: Add
  },
  {
    path: "/team/:id/detail",
    component: Detail
  }
]
