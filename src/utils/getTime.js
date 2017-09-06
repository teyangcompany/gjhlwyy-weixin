/**
 * Created by Administrator on 2017/8/21.
 */

function getCurrentTime(){
  var myDate = new Date()
  var year = myDate.getFullYear()
  var month = myDate.getMonth() + 1
  var date = myDate.getDate()
  var time = year + '-' + (month < 10 ? "0" + month : month) + "-"
    +(date < 10 ? "0" + date : date)
  return time
}
function getShortTime(){
  var myDate = new Date()
  var month = myDate.getMonth() + 1
  var date = myDate.getDate()
  var time = (month < 10 ? "0" + month : month) + "-"
    +(date < 10 ? "0" + date : date)
  return time
}
export {
  getCurrentTime,getShortTime
}


