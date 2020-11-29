const util = require('../../utils/util.js')
Page({
    data:
    {
        dates: '2020-12-12',//这个是创建的时间
        title1:"", //好事的标题
        text1:"", //好事的内容
        title2:"", //不好事的标题
        text2:"", //不好事的内容
        boolnum:false, //判断是好是坏，好就是true
         
    },
    onLoad: function (options)
    {
        //这个是点击进去，就可以修改内容的（等待完成）
        if (wx.getStorageSync('msgDetail')){
            if(JSON.parse(wx.getStorageSync('msgDetail')).boolnum)
            {
                this.setData({
                    dates: JSON.parse(wx.getStorageSync('msgDetail')).time,
                    title1: JSON.parse(wx.getStorageSync('msgDetail')).title,
                    text1: JSON.parse(wx.getStorageSync('msgDetail')).content,
                })
            }
            else{
                this.setData({
                    dates: JSON.parse(wx.getStorageSync('msgDetail')).time,
                    title2: JSON.parse(wx.getStorageSync('msgDetail')).title,
                    text2: JSON.parse(wx.getStorageSync('msgDetail')).content,
                })
            }
        }    
        this.setData({
            dates:util.formatDate(new Date())
        })   
    },
    // 提交表单，将相关的内容和标题，时间全部提交
    editorSubmit(e){
        var obj = [];
        // 下面这个是用来将原来的数据也存到里面，保证之前的数据不会因为再次存储而丢失
        if (wx.getStorageSync('searchLog')){
            obj = JSON.parse(wx.getStorageSync('searchLog'));
        }
        // 进行判断，保证不会将空数据传进去（如何只有一个层级的就不用了，因为有好坏事情，两者是独立的，所以需要判断有的是不是空的）
        var jud1= e.detail.value.title1=="" || e.detail.value.textarea1=="";
        var jud2= e.detail.value.title2=="" || e.detail.value.textarea2=="";
        if(jud1==false && jud2!=false)
        {
            obj.push({
                title: e.detail.value.title1,
                text: e.detail.value.textarea1,
                time: this.data.dates,
                boolnum:true,
                check:false, //check变量是用来后面进行删除管理，选中的效果的
            });
        }
        else if(jud2==false && jud1!=false)
        {
            obj.push({
                title: e.detail.value.title2,
                text: e.detail.value.textarea2,
                time: this.data.dates,
                boolnum:false,
                check:false, 
            });
        }
        else if(!jud2 && !jud1) 
        {
            obj.push({
                title: e.detail.value.title1,
                text: e.detail.value.textarea1,
                time: this.data.dates,
                boolnum:true,
                check:false, 
            });            
            obj.push({
                title: e.detail.value.title2,
                text: e.detail.value.textarea2,
                time: this.data.dates,
                boolnum:false,
                check:false, 
            });            
        }
        // 直接封装好数据了，直接searchLog就可以访问存到内存里的数据（后期应该放到数据库里，然后通过标题不同，识别不同的数据，然后将数据再下载回来，重新填入detail页面中，然后再次修改）
        // 使用json格式存储，调用内存中的相应数据时候：JSON.parse(wx.getStorageSync('字典名字')).相应属性名即可,
        wx.setStorageSync('searchLog', JSON.stringify(obj));
        wx.navigateBack({ changed: true}); //返回上一页
    },
    bindDateChange: function (e) {
        this.setData({
          dates: e.detail.value
        })
    },
    onShareAppMessage() {
        return {
          title: '攀登者',
          path: '/pages/index/index'
        }
      },
})