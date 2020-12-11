const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    change_index(e)
    {
      app.globalData.p_index = ~~e.currentTarget.dataset.index;
      console.log(app.globalData.p_index)
      wx.navigateTo({
        url: '/pages/passages/passages',
      })
    }
  }
})
