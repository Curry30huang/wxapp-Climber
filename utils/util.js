// 专注时间钟 使用的具体时间段
function formatTime(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
}
// 专注时间钟 使用的当天的日期，如果其他要获取当前日期也可以使用这个
const formatDate = date =>{
  const  year=date.getFullYear()  
  const  month=date.getMonth() +1 
  const  day=date.getDate()
  return [year,month,day].map(formatNumber).join('-')
}
// 格式化时间的格式
const formatNumber=n =>{
  n=n.toString()
  return n[1]?n:'0'+n
}
module.exports = {
  formatTime: formatTime,
  formatDate:formatDate
}