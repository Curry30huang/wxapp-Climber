const defaultTime = {
  defaultWorkTime: 1 //这个就是默认时间
}
let audio = wx.getBackgroundAudioManager();
var image_srcs=[
  {
    index:1,
    title:"",
    image_srcs:""
},
  {
    index:2,
    title:"",
    image_srcs:""
},
  {
    index:3,
    title:"",
    image_srcs:""
},
  {
    index:4,
    title:"",
    image_srcs:""
},
  {
    index:5,
    title:"",
    image_srcs:""
},
  {
    index:6,
    title:"暂无",
    image_srcs:"https://s1.imagehub.cc/images/2020/11/25/u19940963011677991235fm26gp0.jpg"
},
]
App({
  onLaunch: function () {

    let workTime = wx.getStorageSync('workTime')
    if (!workTime) {
      wx.setStorage({
        key: 'workTime',
        data: defaultTime.defaultWorkTime
      })
    }

    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 这个是如果已经授权，并且登录成功了执行的操作
        // 所以直接在这里后台获取openid即可
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.cloud.callFunction({
            name: 'login',
            data: {},
            success: res2 =>
            {
              this.globalData.openid = res2.result.openid
            }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // 再这里添加上如果已经授权，那么直接拿openid即可
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    audio.title="永远同在"
    audio.src="http://music.163.com/song/media/outer/url?id=480353.mp3"
    wx.setStorageSync('check', true)
    

    //云初始化
    wx.cloud.init({
      env:"demo1-0g10ikf5559a9d10"
    })

  },
  onShareAppMessage() {
    return {
      title: '攀登者',
      path: '/pages/index/index'
    }
  },
  globalData: {
    userInfo: null,
    index:0, //是用户选择的音乐下标
    p_index:0,//这个是选择的文章下标
    openid:"", //这个是识别用户的唯一标识，这样能够识别用户
    // (代办可以删除这个，因为数据不是用这个获取的)
    image_srcs:image_srcs, //这个是存放主页推荐文章的图片和标题的
    got:false, //这个是判断获取文章的异步处理是否完成了
  },
  getNews()
  {
    var that =this 
    return new Promise(function (resolve, reject){
      // 请求知乎日报的数据
      // (坑，request 中this作用域不是页面本身了，所有要用that)
      wx.request({
          url: 'http://news-at.zhihu.com/api/4/news/latest',
          header: {
              'Content-Type': 'application/json'
          },
          success: function(res) {
            // res就是整个最新消息的json，top_stories是最热的，stories就是普通
            var list=[]
            //（代办，测试修改列表的封面）
            // （巨坑解决异步处理，通过使用Promise进行解决）
            for(let i=0;i<5;i++)
            {
              image_srcs[i].image_srcs = res.data.top_stories[i].image
              image_srcs[i].title = res.data.top_stories[i].title
              list.push(res.data.top_stories[i].url)
            }
            // (代办解除封印)
            // console.log("执行getNews函数")
            // console.log(image_srcs)
            // console.log(list)
            that.globalData.got=true
            // (代办测 试)使用内存存放list
            wx.setStorageSync('urlList', list)
            //promise机制放回成功数据
            resolve(image_srcs);
          },
          fail: function(res) {
              console.log("请求失败")
              reject('error')
          }
      })
    })
  }
})