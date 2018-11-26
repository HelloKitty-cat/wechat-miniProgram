// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: '小朋友',
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    // this.handleUsersInfo()
  },

  //专门用来获取用户信息的方法
  handleUsersInfo (){
    wx.getUserInfo({
      success: (msg) => {
        //更新data中的userInfo
        this.setData({
          userInfo: msg.userInfo
        })
      },
      fail() {
        console.log('获取失败')
      }
    })
  },

  getUserInfo (msg) {
   //点击btn触发的回调函数
    if (msg.detail.rawData){
      this.handleUsersInfo()
    }
  },
  //跳转到周刊界面
  handleGo () {
    wx.navigateTo({
      url: '/pages/list/list'
    })
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