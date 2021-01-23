const app=getApp()
Page({
  data: {
    circles:[
      {
        index:1,
        src:"https://s1.imagehub.cc/images/2020/11/24/d5455160cd1f77ad53419a53d3493e75.png",
        text:"正念（基础）",
        nav:"/pages/function1/function",
      },
      {
        index:2,
        src:"https://s1.imagehub.cc/images/2020/11/24/d5455160cd1f77ad53419a53d3493e75.png",
        text:"正念（进阶）",
        nav:"/pages/function2/function2",
      },
      {
        index:3,
        src:"https://s1.imagehub.cc/images/2020/11/24/13cb1cc01940e296477942b753481e08.png",
        text:"反思",
        nav:"/pages/reflection/reflection"
      },
      {
        index:4,
        src:"https://s1.imagehub.cc/images/2020/11/24/082e4b939b9dc0fe09a71e67b1cce9db.png",
        text:"微习惯",
        nav:"/pages/habit/habit"
      }
    ],
  },
  onLoad()
  {
    var that = this
    if(!app.globalData.got)
    {
      wx.showLoading({
        title: '加载中',
        mask:true
      })
      app.getNews().then(res=>
        {
          if(res!="error")
          {
            that.getData(res)
          }
        }
      )
    }
  },
  onShow()
  {
    if(this.data.image_srcs)
    {
      this.setData({
        image_srcs:this.data.image_srcs
      })
    }
  },
  getData(e)
  {
    this.setData({
      image_srcs:e
    })
    wx.hideLoading()
    this.onShow()
    wx.showToast({
      title: '初次使用前，请看轮播图里“开发者有话说”吧😊它能帮你更快上手这款小程序哦！',
      icon:"none",
      duration:3500,
    })
  },
  // (代办解决跳转新闻 )
  navNews(e)
  {
    app.globalData.p_index =  ~~e.currentTarget.dataset.index
    wx.navigateTo({
        url: '/pages/passages/news/news'
    })
  },
  onShareAppMessage() {
    return {
      title: '攀登者',
      path: '/pages/index/index'
    }
  },
})
