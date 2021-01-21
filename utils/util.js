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


//切割日期字符串并计算日期(传入一个只有两个格式日期的数组)
function toNumber(arr){
  let n=0,year=[],month=[],day=[];
  arr.forEach(element => {
    slice(element)
  });

  function slice(element){
    year[n]=Number(element.slice(0,4));
    month[n]=Number(element.slice(5,7));
    day[n]=Number(element.slice(-2));
    n++
  }

  let dayDis=0;
  let i=month[0]-1;
  let monthDay=[31,28,31,30,31,30,31,31,30,31,30,31,30];
  //计算天数
  for(;i<month[1]-1+12*(year[1]-year[0]);){
      dayDis+=monthDay[i%12];
      i++;
  }
  dayDis+=day[1]-day[0];
  //计算闰年
  for(let l=0;l<year.length;l++){
      if(year[l]/4==0){
        if(l==0&&month[0]<=2){dayDis++}
        if(l==year.length-1&&month[year.length-1]>2){dayDis++}
        if(l!=0&&l!=year.length-1){dayDis++}
      }
  }
  return dayDis+1
}
//形成格式日期数组，totaldata用
function focDayArr(){
  if (wx.getStorageSync('FocusDates')){
  let list1=JSON.parse(wx.getStorageSync('FocusDates'))
  let j=0,dataDate=[],timeLen=[];
  //将天数和时间存进数组
  while(j<list1.length){
    dataDate[j]=list1[j].date;
    timeLen[j]=list1[j].time;
    j++;
  }
  return [dataDate,timeLen]
}else return 0
}
//计算天数和未完成天数（已封装）（要判断返回的是不是0）
function focDayCount(){
  if(focDayArr()){
  let a=focDayArr()[0];
  let countDay=[a[0],formatDate(new Date())];
  let focdays=toNumber(countDay);
  let focfinDays=a.length;
  return [focfinDays,focdays-focfinDays]
}else return 0
}

function refDayCount(){
  if (wx.getStorageSync('searchLog')){
  let list=JSON.parse(wx.getStorageSync('searchLog')),redate=[];
  let i=0;
  //统计做的好与做的不好的事的数据
  while(i<list.length){
    redate[i]=list[i].time;
    i++
  }
  let k=0;
  let countDay1=[redate[0],formatDate(new Date())];
  let redays=toNumber(countDay1);
  //肯定能读到就说明已经做了一天
  let dodays=1;
  //根据不同计算天数
  while(k<redate.length-1){
    if(redate[k+1]!=redate[k]){
      dodays++;
    }
    k++;
  }
  return [dodays,redays-dodays]
}else return 0;
}

// 注意使用外部接口的时候，注意检查返回值，0就是什么数据都没有，只有不是0的时候我们才返回数组，采用才用返回的值对数据进行重新赋值，不然全部在初始化的时候就全都默认是0，返回值是0就不进行重新赋值。


module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  focDayCount:focDayCount,
  focDayArr:focDayArr,
  refDayCount:refDayCount
}