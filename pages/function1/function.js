const util = require('../../utils/util.js')
const app = getApp()
const defaultLogName = {
    work: '专注',
}
const actionName = {
    stop: '停止',
    start: '开始'
}

const initDeg = {
    left: 45,
    right: -45,
}
Page({
    data: {
        hunum: 0,
        xinum: 0,
        boolnum: true, //用于显示呼吸次数
        remainTimeText: '',
        timerType: 'work',
        log: {},
        completed: false,
        isRuning: false,
        leftDeg: initDeg.left,
        rightDeg: initDeg.right,
        date:"", //这个是当前的日期
    },
    // 提前加载昵称和设置的内容
    onShow: function () {
        // 获得设置页面的值，还剩隐藏按钮处理
        if (this.data.isRuning) return
        let workTime = util.formatTime(wx.getStorageSync('workTime'), 'HH')
        this.setData({
            workTime: workTime,
            remainTimeText: workTime + ':00',
            boolnum: !wx.getStorageSync("boolnum"),
        })
        // 获取今天的日期
        this.setData({
            date:util.formatDate(new Date())
        })
    },
    //开始计时
    startTimer: function (e) {
        let startTime = Date.now()
        let isRuning = this.data.isRuning
        let timerType = e.target.dataset.type
        let showTime = this.data[timerType + 'Time']
        let keepTime = showTime * 60 * 1000
        let logName = this.logName || defaultLogName[timerType]

        if (!isRuning) {
            this.timer = setInterval((function () {
                this.updateTimer()

            }).bind(this), 1000)
        } else {
            this.stopTimer()
            wx.vibrateShort()
        }

        this.setData({
            isRuning: !isRuning,
            completed: false,
            timerType: timerType,
            remainTimeText: showTime + ':00',
            taskName: logName
        })
        this.data.log = {
            name: logName,
            startTime: Date.now(),
            keepTime: keepTime,
            endTime: keepTime + startTime,
            action: actionName[isRuning ? 'stop' : 'start'],
            type: timerType
        }
        this.saveLog(this.data.log)
    },



    //停止计时，并重置一切（未完成）
    stopTimer: function () {
        // 重新设置圆形的progress和次数，还要
        this.setData({
            leftDeg: initDeg.left,
            rightDeg: initDeg.right,
            hunum: 0,
            xinum: 0,
            isRuning: false,
        })

        // 清理timer
        this.timer && clearInterval(this.timer)
    },

    // 更新timer
    updateTimer: function () {
        let log = this.data.log
        let now = Date.now()
        let remainingTime = Math.round((log.endTime - now) / 1000)
        let H = util.formatTime(Math.floor(remainingTime / (60 * 60)) % 24, 'HH')
        let M = util.formatTime(Math.floor(remainingTime / (60)) % 60, 'MM')
        let S = util.formatTime(Math.floor(remainingTime) % 60, 'SS')
        let halfTime

        // 更新时间文字
        if (remainingTime > 0) {
            let remainTimeText = (H === "00" ? "" : (H + ":")) + M + ":" + S
            this.setData({
                remainTimeText: remainTimeText
            })
        } else if (remainingTime == 0) {
            this.setData({
                completed: true
            })
            // 将时间存到内存里面，统计一共专注了多长时间，还要传入现在的日期
            // 优先将专注时间放到数据库当中
            var obj =[]
            if(wx.getStorageSync('FocusDates')){
                obj=JSON.parse(wx.getStorageSync('FocusDates'))
            }
            if(obj.length>0 && obj[obj.length-1].date==this.data.date)
            {
                obj[obj.length-1].time += wx.getStorageSync('workTime')
            }
            else{
                obj.push({
                    date:this.data.date,
                    time:wx.getStorageSync('workTime')
                })
            }
            wx.setStorageSync('FocusDates', JSON.stringify(obj))
            wx.vibrateShort()
            this.stopTimer()
            return
        }
        // 更新圆形progress
        halfTime = log.keepTime / 2
        if ((remainingTime * 1000) > halfTime) {
            this.setData({
                leftDeg: initDeg.left - (180 * (now - log.startTime) / halfTime)
            })
        } else {
            this.setData({
                leftDeg: -135
            })
            this.setData({
                rightDeg: initDeg.right - (180 * (now - (log.startTime + halfTime)) / halfTime)
            })
        }
    },
    // 呼吸绑定的函数
    hu_tap() {
        this.setData({
            hunum: this.data.hunum + 1
        })
        this.auto_exam()
    },
    xi_tap() {
        this.setData({
            xinum: this.data.xinum + 1
        })
        this.auto_exam()
    },

    // 自动检测函数,并计算组数，呼和吸函数都要调用
    auto_exam() {
        // 震动和自动检测，并显示
        if (this.data.hunum - this.data.xinum > 1 || this.data.xinum - this.data.hunum > 1) {
            // 添加震动
            wx.vibrateLong()
            // 尝试API文字显示
            wx.showToast({
                title: '你的注意力在分散，重新开始！',
                icon: 'none',
                duration:2500,
            })
        }

    },

    // 保存数据
    saveLog: function (log) {
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(log)
        wx.setStorageSync('logs', logs)
    },
    onShareAppMessage() {
        return {
          title: '攀登者',
          path: '/pages/index/index'
        }
      },
})