import * as echarts from '../../ec-canvas/echarts.js';
const util = require('../../utils/util.js');
//反思数据
var good=0,bad=0,unredays=0,redodays=0;
//专注数据
var dataDate=[],timeLen=[],focfinDays=0,unfocdays=0;
//习惯数据
var habtime=0;
Page({
  //加载前开始调用数据
  onLoad: function () {
    let i=0,num1=0,num2=0;
    if (wx.getStorageSync('searchLog')){
      //从缓存中读取反思数据
      let list=JSON.parse(wx.getStorageSync('searchLog')),redate=[];
      //统计做的好与做的不好的事的数据
      while(i<list.length){
      redate[i]=list[i].time;
      if(list[i].boolnum){num1++}
      if(!list[i].boolnum){num2++};
      good=num1;bad=num2;
      i++
      }
      //调用util封装好的函数
      redodays=util.refDayCount()[0];
      unredays=util.refDayCount()[1];
    }
    if (util.focDayArr()){
      dataDate=util.focDayArr()[0];
      timeLen=util.focDayArr()[1];
      focfinDays=util.focDayCount()[0];
      unfocdays=util.focDayCount()[1]
    }
    //这个直接读就是，存的是数字
    if (wx.getStorageSync('habittime')){
      habtime=wx.getStorageSync('habittime');
    }
  },
//e-chart调用
  data: {
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(Bar());
        return barChart;
      }
    },

    ecPie: {
      onInit: function (canvas, width, height, dpr) {
        const pieChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(pieChart);
        pieChart.setOption(pie());

        return pieChart;
      }
    },

    ecLine: {
      onInit: function (canvas, width, height, dpr) {
        const lineChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(lineChart);
        lineChart.setOption(line());

        return lineChart;
      }
    },
  },
  onShareAppMessage() {
    return {
      title: '攀登者',
      path: '/pages/index/index'
    }
  },

})
//产生bar图表
function Bar(canvas, width, height, dpr) { 
  return{ 
    color: ['#3fd632','#67c25f'],
    legend: {
      //类别
      data: ['已完成', '未完成']
    },
    grid: {
      //坐标轴显示距离
      left: 10,
      right: 20,
      bottom: 0,
      top: 20,
      containLabel: true
    },
    xAxis: [
      {//数值轴
        type: 'value',
        axisLine: {
          //坐标轴颜色
          lineStyle: {
            color: '#999'
          }
        },
        //坐标轴名称颜色
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        //分区
        axisTick: { show: true },
        data: ['微习惯','专注','反思自我'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        //坐标轴线颜色
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
      {//已完成标签样式
        name: '已完成',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        //数据
        data:[habtime,focfinDays,redodays],
        itemStyle: {
           emphasis: {
             color: '#37a2da'
           }
        }
      },
      {//未完成标签样式
        name: '未完成',
        type: 'bar',
        stack: '总量',
        //标签样式
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },//数据
        data: [0,unfocdays,unredays],
        itemStyle: {
           emphasis: {
            color: '#67e0e3'
           }
        }
      }
    ]
  } 
}

//产生line图表
function line(canvas, width, height, dpr) {
  return{
    //颜色
    color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
    //坐标轴与右侧屏幕距离
    grid:{right:'15%'},
    //x轴
    xAxis: {
      name:'日期',
      //名字位置
      nameLocation:'end',
      //类型：类目轴
      type: 'category',
      //改分块是否有间隙
      boundaryGap: false,
      data: dataDate
      // show: false
    },
    yAxis: {
      name:'min',
      nameLocation:'end',
      //中心开始出现数值
      x: 'center',
      //数值轴
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
      // show: false
    },
    //滑条查看
    dataZoom:[{
      type:'slider',
    }
  ],
    //数据
    series: [{
      color:"#1f975b",
      name: '次数',
      markPoint: {
        data: [
            {
              //默认类型
                type: 'max', 
            },
            {
                type: 'min', 
            }
        ]
    },
    markLine: {
      //标线
      data: [
          {type: 'average', name: '平均值'},
      ]
  },
      type: 'line',
      //平滑曲线
      smooth: true,
      data: timeLen
    }]
  }
}
//产生pie图表
function pie(canvas, width, height, dpr) {
  return{
    //颜色
    color: ["#92c223", "#a6bd71"],
    series: [{
      label: {
        //标签字体大小
        normal: {
          fontSize: 14
        }
      },
      type: 'pie',
      center: ['50%', '50%'],
      //内外圈大小比例
      radius: ['30%', '70%'],
      data: [{
        //标签颜色
        label:{color:"#1f7904"},
        //值
        value: good,
        name: '做得好的事'
      }, {
        label:{color:"#1f7904"},
        value: bad,
        name: '做得不好的事'
      }]
    }]
  }
}