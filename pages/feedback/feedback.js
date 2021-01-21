// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      text:"",
      updatelog:[
        {
          id:0,
          version:"1.0.4",
          date:"2020-12-15",
          content:"程序页面设计进行较大调整；微习惯功能分为两个小板块；补充用户反馈和查看更新功能；用户使用说明图片同步更新。"
        },
        {
          id:1,
          version:"1.0.3",
          date:"2020-12-8",
          content:"敏感词识别过滤机制；能一次删除多条记录；解决反思记录bug；添加图片形式使用说明；更新用户文案排版；自动开始播放背景音乐；正念默认时间调整。"
        },
        {
          id:2,
          version:"1.0.2",
          date:"2020-11-30",
          content:"三项选择器自动滚动；轮播图死循环；数据可视化bug修改；微习惯打卡功能；时间获取；页面布局适应绝大部分机型。"
        },
        {
          id:3,
          version:"1.0.1",
          date:"2020-11-26",
          content:"第一次上线,感谢各位大哥捧场"
        },
      ],
      detail:[0,0,0,0]
  },

  detail:function(e){
    var list=[0,0,0,0];
    var index= ~~e.currentTarget.dataset.index
    list[index]=1
    this.setData({
      detail:list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submit:function(e){
    const db = wx.cloud.database()
    db.collection('feedback').add({
      data: {
        feedback: e.detail.value.textarea
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          feedback: e.detail.value.feedback
        })
        wx.showToast({
          title: '万分感谢！🙇‍',
          icon:'success',
          duration:2000
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '请重新提交👊',
          duration:2000
        })
      }
    })
  }
})