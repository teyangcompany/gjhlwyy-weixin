/**
 * Created by Administrator on 2017/8/25.
 */
import bindRelativePhone from './bindRelativePhone'
import register from './register'
import login from './login'
import repeatBind from './repeatBind'
export default[
  {
    path:"/bindRelativePhone",
    component:bindRelativePhone
  },
  {
    path:"/register",
    component:register
  },
  {
    path:"/login",
    component:login
  },
  {
    path:"/repeatBind",
    component:repeatBind
  }
]
