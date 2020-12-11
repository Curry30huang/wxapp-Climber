// pages/setting2/setting2.js
const app =getApp()
let audio = wx.getBackgroundAudioManager();
Page({
    data: {
      boolnum:false,
      check:false, //这个是控制背景音乐的开关
      name_list:["永远同在","风的歌","Wind Dreams","ɪsᴏʟᴀᴛɪᴏɴ","Diving Deep"], //这个是音乐名称的列表
      index:0,
      workTime:1,
      music_list:["http://music.163.com/song/media/outer/url?id=480353.mp3",
      "http://music.163.com/song/media/outer/url?id=577879.mp3",
      "http://music.163.com/song/media/outer/url?id=2085726.mp3",
      "http://music.163.com/song/media/outer/url?id=1442191755.mp3",
      "http://music.163.com/song/media/outer/url?id=5268347.mp3"] //存放的是每个音乐的对应的外链
    },
    hidden_tap(e) {
      this.setData({
        boolnum: e.detail.value
      })
      wx.setStorage({
        key: 'boolnum',
        data: e.detail.value
      })
    },
    onShow: function () {

      wx.setNavigationBarTitle({
        title: '设置'
      })
      if(wx.getStorageSync('workTime')) this.setData({workTime: wx.getStorageSync('workTime')})
      if(wx.getStorageSync('boolnum')) this.setData({boolnum:wx.getStorageSync('boolnum')})
      if(wx.getStorageSync('check')) this.setData({check:wx.getStorageSync('check')})
      this.setData({
        index:app.globalData.index,
      })
      if(this.data.check)
      {
        this.playMusic()
      }
    },
    changeWorkTime: function (e) {
      wx.setStorage({
        key: 'workTime',
        data: e.detail.value
      })
    },
    // 播放音乐的函数 实现循环播放
    playMusic(){
      // 注意作用域不同导致的this不同的问题
      var that = this
      // 需要学习一下，再没有加载好音乐的时候显示加载（可以随便下个小程序试试，尤其是有云开发，自己加载不出来的）
      audio.title=that.data.name_list[that.data.index]
      audio.src=that.data.music_list[that.data.index]
      audio.onEnded(() =>{
        that.playMusic();
      })
    },
    musicChange(e){
      this.setData({
        check:e.detail.value
      })
      wx.setStorageSync('check', this.data.check)
      if(this.data.check)
      {
        this.playMusic()
      }
      else 
      {
        audio.stop()
      }
    },
    chooseMusic(e){
      app.globalData.index=e.detail.value
      this.setData({
        index:e.detail.value
      })
      if(this.data.check)
      {
        this.playMusic()
      }
    },
    onShareAppMessage() {
      return {
        title: '攀登者',
        path: '/pages/index/index'
      }
    },
  })