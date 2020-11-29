const defaultTime = {
  defaultWorkTime: 1 //这个就是默认时间
}

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
  }
})