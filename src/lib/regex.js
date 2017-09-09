/**
 * Created by Administrator on 2017/6/6 0006.
 */
import {withParams,ref,req,regex} from  "vuelidate/lib/validators/common";
/*简单验证*/
// export default (value)=>{
//   console.log(value)
//   return true
// }
/*复杂验证*/

// export default (regex)=>withParams({type:"regex",regex:regex},value=>{
//   console.log(value,regex);
//   return true;
// });
export default (regex,num)=>withParams({type:"regx"},value=>{
  console.log(regex,num,value);
  if(regex=='1'){
    console.log('shouji');
    return /^1[3|4|5|7|8][0-9]{9}$/.test(value);
  }else if(regex=='15') {
    console.log('regex,num');
    return (value.length==regex) ||  (value.length==num)
  }

});
