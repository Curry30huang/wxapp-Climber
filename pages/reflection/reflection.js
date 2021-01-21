Page({
  data: {
    list:[],
    index: 0,
    dates: '2018-5-22',
    chexkStatus:false,
    url:"/images/check_false.png",
    inputVal:"", //这个是查找的关键字
    catList: [],// 推荐的关键字列表
    itemShowed:true, //用于显示全部的还是，显示关键词查找的，全部的是true，搜索得到的内容用wx:else即可
    viewShowed:false, //这个是搜索框关键字的推荐是否显示
    list1:[], //这个用于储存各个标题
    index2:0, //这个是储存查询后的元素在原来列表的什么位置

  },
  onLoad: function () {
    if (wx.getStorageSync('searchLog')){
      this.setData({
        list: JSON.parse(wx.getStorageSync('searchLog')),
      })
    }

    // 添加标题
    var arr=this.data.list
    var newArr=[]
    for(var i=0;i<arr.length;i++)
    {
      newArr.push(arr[i].title)
    }
    this.setData({
      list1:newArr
    })

    if(this.data.js)
    {
        this.setData({
            js:this.data.js
        })
    }
  },
  // 重复两遍是因为，刷新页面，不然返回页面之后，页面并不会刷新
  onShow: function () {
    this.onLoad()
  },
  add(){
    wx.removeStorageSync('msgDetail')
    wx.navigateTo({
      url: '../reflection_detail/reflection_detail'
    })
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
  // （代办）这个是搜索之后的删除内容
  check2(e){
    console.log(e)
    var newList = this.data.list;
    var num = this.data.index2;
    if (e.currentTarget.dataset.src ==="/images/check_false.png"){
      newList[num].check = true;
      this.data.js.check=true;
    }else{
      newList[num].check = false;
      this.data.js.check=false;
    }
    wx.setStorageSync('searchLog', JSON.stringify(newList));
    // 还是要刷新页面才行
    this.onShow()
  },
  delHandel(){
    var obj = this.data.list;
    var arr = [];
    for(var i in obj){
      if(obj[i].check){
        arr.push(i)
      }
    }
    if(arr.length){
      for(var i=0;i<arr.length;i++)
      {
        obj.splice(arr[i]-i,1)
      }
      this.setData({
        list: obj,
        js:{},
      })
      wx.setStorageSync('searchLog', JSON.stringify(obj));
      //也是要刷新页面
      this.onShow()
    }
  },
  save(){
    this.setData({
      chexkStatus: false
    })
  },
  // 这个是点击进入修改界面（可以学习，后期放到数据库里面）
  listDetail(e){
    var that = this;
    var _index = ~~e.currentTarget.dataset.index;
    var detailBoj = {
      title: that.data.list[_index].title,
      content: that.data.list[_index].text,
      time: that.data.list[_index].time,
      boolnum:that.data.list[_index].boolnum,
    }
    // 这个就是删除这个元素上的
    that.data.list.splice(_index,1)
    wx.setStorageSync('searchLog', JSON.stringify(that.data.list));
    wx.setStorageSync('msgDetail', JSON.stringify(detailBoj));
    wx.navigateTo({
      url: '../reflection_detail/reflection_detail'
    })
  },
  // (代办)等待完善
  listDetail2(){
    var that = this;
    var _index = this.data.index2;
    var detailBoj = {
      title: that.data.list[_index].title,
      content: that.data.list[_index].text,
      time: that.data.list[_index].time,
      boolnum:that.data.list[_index].boolnum,
    }
    // 这个就是删除这个元素上的
    that.data.list.splice(_index,1)
    wx.setStorageSync('searchLog', JSON.stringify(that.data.list));
    wx.setStorageSync('msgDetail', JSON.stringify(detailBoj));
    wx.navigateTo({
      url: '../reflection_detail/reflection_detail'
    })
  },
  // 取消搜索
  hideInput: function() {
    this.setData({
      inputVal: "",
      viewShowed: false,
      itemShowed:true,
      js:{}
    });
  },
  // 键盘搜索
  inputTyping: function(e) {
    var value = e.detail.value
    var that = this;
    var list1 = that.data.list1
    if (value == '') {
      that.setData({
        viewShowed: false,
        itemShowed:true,
        js:{}
      });
    } else {
    //“这里需要特别注意，不然在选中下拉框值的时候，下拉框又出现”
      if (e.detail.cursor) { //e.detail.cursor表示input值当前焦点所在的位置；如果不对它判断一下，就会出现下拉框闪动的现象
        var arr = [];
        for (var i = 0; i < list1.length; i++) {
          if (list1[i].indexOf(value) >= 0) {
            arr.push(list1[i]);
          }
        }
        that.setData({
          viewShowed: true,
          carList: arr
        });
      }
    }
  },
  // 获取选中推荐列表中的值
  name: function(res) {
    var index = res.currentTarget.dataset.index
    this.setData({
      inputVal: this.data.carList[index],
      viewShowed: false,
    })

  },
  search()
  {
    // 匹配字符串
    var arr=this.data.list1
    var index=arr.indexOf(this.data.inputVal)

    this.setData({
      itemShowed:false,
      js:this.data.list[index],
      index2:index,
    })
    console.log(this.data.js)

    // 天坑，想要刷新页面wxml渲染数据，要再次调用onShow函数
    this.onShow()
  },
})