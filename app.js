//app.js
App({
  onLaunch: function () {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
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

  },
   //加入购物车
   addToCart(obj){
     //判断是否已经添加进来
     const oldInfo = this.globalData.cartList.find((item) => item.iid === obj.iid)
     if(oldInfo){
       oldInfo.count += 1
     }else{
       obj.count = 1
       obj.checked = true
       this.globalData.cartList.push(obj)
       console.log(obj)
     }

     //购物车回调
     if (this.addCartCallback){
       this.addCartCallback()
     }
   },
   globalData:{
     cartList:[]
   }
})