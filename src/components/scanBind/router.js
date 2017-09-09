/**
 * Created by Administrator on 2017/9/8.
 */
import scanBind from './scanBind'
import scanLogin from './scanLogin'
import scanRegister from './scanRegister'
export default[
  {
    path:"/scanBind",
    component:scanBind
  },
  {
    path:"/scanLogin",
    component:scanLogin
  },
  {
    path:"/scanRegister",
    component:scanRegister
  }
]
