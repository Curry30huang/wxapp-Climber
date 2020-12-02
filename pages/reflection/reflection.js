Page({
  data: {
    list:[],
    index: 0,
    dates: '2018-5-22',
    chexkStatus:false,
    url:"/images/check_false.png"
  },
  onLoad: function () {
    // wx.removeStorageSync('msgDetail')
    // wx.removeStorageSync('searchLog')
    if (wx.getStorageSync('searchLog')){
      this.setData({ 
        list: JSON.parse(wx.getStorageSync('searchLog'))
      })
    }
  },
  onShow(){
    if (wx.getStorageSync('searchLog')) {
      this.setData({
        list: JSON.parse(wx.getStorageSync('searchLog'))
      })
    }
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
        list: obj
      })
      wx.setStorageSync('searchLog', JSON.stringify(obj)); 
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
    that.data.list.splice(_index,1)
    wx.setStorageSync('searchLog', JSON.stringify(that.data.list));
    wx.setStorageSync('msgDetail', JSON.stringify(detailBoj));
    wx.navigateTo({
      url: '../reflection_detail/reflection_detail'
    })
  },
  onShareAppMessage() {
    return {
      title: '攀登者',
      path: '/pages/index/index'
    }
  },
})