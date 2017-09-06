/**
 * Created by Administrator on 2017/8/21.
 */
import serviceIndex from "./serviceIndex"
import myDoctor from './myDoctor'
import recentChat from './recentChat'
import followDoctor from './followDoctor'
import chat from './chat'
export default[
  {
     path:"serviceIndex",
     component:serviceIndex
  },
  {
    path:"/myDoctor",
    component:myDoctor,
    children:[
      {
        path:"recentChat",
        component:recentChat
      },
      {
        path:"followDoctor",
        component:followDoctor
      }
    ]
  },
  {
    path:"/chat",
    component:chat
  }
]
