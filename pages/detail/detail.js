// pages/detail/detail.js
let listData = require('../../datas/list-data.js')
let Appdata = getApp();
console.log(Appdata)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listArr: {},
    iscllocted:false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.index;
    this.setData({
      listArr: listData.list_data[index],
      index
    });

    //在页面刚加载的时候，获取stroage中的数据
   let stroage =  wx.getStorageSync('isCllocted')
   if(stroage[index]){
     //如果stroage中有对应的index值为true的话，则说明收藏成功
     //此时应该更新状态
     this.setData({
       iscllocted: true
     })
   }  

    //判断当前页面是否在播放
    if (Appdata.data.isMusic && Appdata.data.isCurrentIndex === index){
      this.setData({
        isMusicPlay: true
      })
    }

   //监听音乐播放和暂停
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放')
      this.setData({
        isMusicPlay: true
      });

      Appdata.data.isMusic = true;
      Appdata.data.isCurrentIndex = index;
    })

    wx.onBackgroundAudioPause(() => {
      console.log('音乐暂停')
      this.setData({
        isMusicPlay: false
      });
      Appdata.data.isMusic = false;
    })
  },

  //处理收藏的回调寒函数
  handleClloection () {
    let iscllocted = !this.data.iscllocted;
    //更新data中的状态
    this.setData({
      iscllocted
    });

    //显示提示框
    let title = iscllocted ? '收藏成功' : '取消收藏'
    wx.showToast({
      title
    });

    //将数据存储到storage
    let index = this.data.index;
    let obj = wx.getStorageSync('isCllocted');
    //当stroage中无缓存时，obj是一个空 不是空数组，所以需要判断一下 
    //当我的obj没有值时 让他的值为一个空对象
    obj = obj ? obj : {};
    //在obj中添加以index的属性  值为true/false
    obj[index] = iscllocted;
    //设置本地缓存 
    wx.setStorage({
      key: 'isCllocted',
      data: obj
    })

  },
  // 处理音乐的回调函数
  handleMusicPlay () {
    let isMusicPlay = !this.data.isMusicPlay;
    this.setData({
      isMusicPlay
    });

    let {dataUrl, title} = this.data.listArr.music
    if (isMusicPlay){
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    }else{
      wx.pauseBackgroundAudio()
    }
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

  }
})