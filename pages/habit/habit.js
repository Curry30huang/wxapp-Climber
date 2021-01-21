
const util = require('../../utils/util.js')
Page({

  data: {
    //模式选择
    modedata:true,
    //周期选择
    timeData:[7,14,21,30,60,90,],
    timeDataIndex:0,
    //习惯选择
    taskData:[
      ['看书','跑步','背单词','俯卧撑','仰卧起坐','听听力','做数学题'],
      ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"],
      ['页','公里','个','分钟','道']
    ],
    taskDataIndex:[0,0,0],
    //自定义模式
    person1:false,
    person2:false,
    list:[], //这个存放在内存中的haibitData
    index: 0,
    chexkStatus:false,
    url:"/images/check_false.png",
    date:"",
    list2:[] //这个是存放haibitData2[记录打卡次数相关]
  },

  navi1(){
    this.setData({
      modedata:true,
      chexkStatus:false
    })
  },

  navi2(){
    this.setData({
      modedata:false
    })
    console.log(this.data.modedata)
  },

  onLoad(){
    if (wx.getStorageSync('haibitData')){
        this.setData({
          list: JSON.parse(wx.getStorageSync('haibitData'))
        })
    }
    this.setData({
      date:util.formatDate(new Date())
    })
    if(wx.getStorageSync('haibitData2'))
    {
        var listTemp =JSON.parse(wx.getStorageSync('haibitData2'));
        // 这里要进行判断是否隔了一天要更新打卡
        for(var i=0;i<listTemp.length;i++)
        {
            if(listTemp[i].date!=this.data.date)
            {
                listTemp[i].check=false
                listTemp[i].date=this.data.date
            }
        }
        wx.setStorageSync('haibitData2', JSON.stringify(listTemp))
        this.setData({
            list2:listTemp
        })
    }
  },
  /*点击自定义周期*/
  timeTap:function(){
      this.setData({
        person1:!this.data.person1
      })
  },

  /*点击自定义习惯*/
  habitTap:function(){
    this.setData({
      person2:!this.data.person2
    })
  },

  /*周期选择器*/
  timeChange:function(e){
    this.setData({
      timeDataIndex: e.detail.value
    })
  },

  /**习惯选择器*/
  taskChange:function(e){
    this.setData({
      taskDataIndex: e.detail.value
    })
  },
  columnChange:function(e){
     let index=this.data.taskDataIndex;
      index[e.detail.column]=e.detail.value
      if(e.detail.column==0){
        switch(e.detail.value){
          case 0:index[2]=0;break;
          case 1:index[2]=1;break;
          case 2:
          case 3:
          case 4:index[2]=2;break;
          case 5:index[2]=3;break;
          case 6:index[2]=4;break;
        }
      }
      this.setData({
        taskDataIndex: index
      })
    console.log(e.detail.value)
    console.log(e.detail.column)
  },
  editor(){
    this.setData({
      chexkStatus: !this.data.chexkStatus,
    })
  },
  check(e){
    var newList = this.data.list;
    var num = ~~e.currentTarget.dataset.index;
    if (e.currentTarget.dataset.src ==="/images/check_false.png"){
      newList[num].check = true;
    }else{
      newList[num].check = false;
    }
    this.setData({
      list: newList
    })
  },
  delHandel(){
    var obj = this.data.list;
    var arr = [];  //存放选中要删除的下标
    var obj2 =this.data.list2; //存放选中要删除的list2
    for(var i=0 ; i<obj.length;i++){
      if(obj[i].check){
        arr.push(i)
      }
    }
    if(arr.length){
      for(var i=0;i<arr.length;i++)
      {
        obj.splice(arr[i]-i,1)
        obj2.splice(arr[i]-i,1)
      }
      this.setData({
        list: obj,
        list2:obj2
      })
      wx.setStorageSync('haibitData', JSON.stringify(obj));
      wx.setStorageSync('haibitData2', JSON.stringify(obj2));
    }
    if(arr.length==0)
    {
      wx.showToast({
        title: '选择后再删除',
        icon:'none',
      })
    }
  },
  save(){
    this.setData({
      chexkStatus: false
    })
  },

  /*记忆习惯*/
  submit:function(e){
    var habitdata = this.data.list;
    var habitdata2 = this.data.list2;

    if(habitdata.length<=2) //判断最多只能创建三条
    {
        var index=this.data.timeDataIndex
        var arr= this.data.taskDataIndex
        // 下面这个是用来将原来的数据也存到里面，保证之前的数据不会因为再次存储而丢失
        //都是选择模式
        if(this.data.person1==false && this.data.person2==false)
        {
            habitdata.push({
            circle:this.data.timeData[index],
            habit:this.data.taskData[0][arr[0]]+this.data.taskData[1][arr[1]]+this.data.taskData[2][arr[2]],
            check:false,
            time:this.data.date  //time 就是创建的天数，nowtime是现在的天数
            });
            habitdata2.push({
                date:this.data.date, //这个是最近一次的打卡日期
                name:this.data.taskData[0][arr[0]]+this.data.taskData[1][arr[1]]+this.data.taskData[2][arr[2]],
                check:false,
                num:0
            })
        }
        //周期自定义任务选择
        else if(this.data.person1!=false && this.data.person2==false)
        {
            habitdata.push({
            circle:e.detail.value.input1,
            habit:this.data.taskData[0][arr[0]]+this.data.taskData[1][arr[1]]+this.data.taskData[2][arr[2]],
            check:false,
            time:this.data.date
            });
            habitdata2.push({
                date:this.data.date,
                name:this.data.taskData[0][arr[0]]+this.data.taskData[1][arr[1]]+this.data.taskData[2][arr[2]],
                check:false,
                num:0
            })
        }
        //周期选择任务自定义
        else if(this.data.person1==false && this.data.person2!=false)
        {
            habitdata.push({
            circle:this.data.timeData[index],
            habit:e.detail.value.input2,
            check:false,
            time:this.data.date
            });
            habitdata2.push({
                date:this.data.date,
                name:e.detail.value.input2,
                check:false,
                num:0
            })
        }
        //都自定义
        else if(this.data.person1!=false && this.data.person2!=false)
        {
            habitdata.push({
            circle:e.detail.value.input1,
            habit:e.detail.value.input2,
            check:false,
            time:this.data.date
            });
            habitdata2.push({
                date:this.data.date,
                name:e.detail.value.input2,
                check:false,
                num:0
            })
        }
        wx.setStorageSync('haibitData', JSON.stringify(habitdata));
        wx.setStorageSync('haibitData2', JSON.stringify(habitdata2));
        if (wx.getStorageSync('haibitData')){
            this.setData({
            list: JSON.parse(wx.getStorageSync('haibitData'))
            })
        }
        if (wx.getStorageSync('haibitData2')){
            this.setData({
            list2: JSON.parse(wx.getStorageSync('haibitData2'))
            })
        }
        wx.showToast({
        title: '记录成功',
        icon:'success',
        })
    }
    else
    {
        wx.showToast({
            title:'最多创建三条',
            icon:'none'
        })
    }

  },
  clock_in (e){
    // 简易逻辑不必复杂：就是只要这一天，任何一个习惯打了一次卡就算你打卡成功，下一天再打卡
    // 限定习惯，最多不能超过三个，超过三个就会给警告并且不允许再创建submit函数里面，还要检测三个任务的名字都不可以重复，不然也不让创建。还没有完成
    // 打卡关联日期，关联名字，加上数字参数计算每个习惯的次数，通过length获得任务的长度【类似专注时间叠加那样叠加即可】
    var newList = this.data.list2;
    var num = ~~e.currentTarget.dataset.index;

    // list2要存放的数据  {date: 打卡那时的日期，name:任务名字,check:是否已经打卡了,num:打卡了多少次}
    if (!newList[num].check){
      newList[num].check = true;
      newList[num].num++;
      this.setData({
        list2: newList
      })
      wx.setStorageSync('haibitData2', JSON.stringify(newList));
      if(wx.getStorageSync('habittime'))
      {
          var sum = wx.getStorageSync('habittime')
          sum +=1;
          wx.setStorageSync('habittime',sum)
      }
      else
      {
          var sum =1;
          wx.setStorageSync('habittime',sum)
      }
    }
    else
    {
      wx.showToast({
        title: '您已经打过卡了'
      })
    }
  },

})