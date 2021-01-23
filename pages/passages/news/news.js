const app =  getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    var list = wx.getStorageSync('urlList')
    this.setData({
        url:list[app.globalData.p_index]
    })
  },

  onShow: function () {

  },

})