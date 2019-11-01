// pages/detail/detail.js
import { //引入请求数据
  getDetail,
  getRecommends,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo,
} from '../../service/detail.js'

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: "",
    topImages: [],
    baseInfo: {},
    shopInfo: {},
    detailInfo: {},
    paramInfo: {},
    commentInfo: {},
    recommends: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //获取传入的iid
    this.setData({
      iid: options.iid
    })

    //请求商品详情数据
    this._getDatailData()
    //请求推荐数据
    this._getRecommends()
  },

  //请求详情数据
  _getDatailData() {
    let _this = this;
    getDetail(_this.data.iid).then(res => {
    for (let i = 0, len = res.lists.length; i < len; i++) {
      if (res.lists[i].iid === _this.data.iid) {
        const data = res.lists[i].result
        console.log(data)
         //取出顶部的图片
        const topImages = data.itemInfo.topImages;
        console.log(topImages)
        //创建BaseInfo对象
        const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
        console.log(baseInfo)
        //创建ShopInfo对象
        const shopInfo = new ShopInfo(data.shopInfo);
        //获取detailInfo信息
        const detailInfo = data.detailInfo;
        //创建ParamInfo对象
        const paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
        //获取评论信息
        let commentInfo = {}
        if (data.rate && data.rate.cRate > 0) {
          commentInfo = data.rate.list[0]
         }

        this.setData({
          topImages: topImages,
          baseInfo: baseInfo,
          shopInfo: shopInfo,
          detailInfo: detailInfo,
          paramInfo: paramInfo,
          commentInfo: commentInfo
        })

      }
    }
      // //取出顶部的图片
      // const topImages = data.itemInfo.topImages;
      // //创建BaseInfo对象
      // const baseInfo = new GoodsBaseInfo(data.itemInfo, data.columns, data.shopInfo.services)
      // //创建ShopInfo对象
      // const shopInfo = new ShopInfo(data.shopInfo);
      // //获取detailInfo信息
      // const detailInfo = data.detailInfo;
      // //创建ParamInfo对象
      // const paramInfo = new ParamInfo(data.itemParams.info,data.itemParams.rule)
      // //获取评论信息
      // let commentInfo = {}
      // if(data.rate && data.rate.cRate > 0){
      //   commentInfo = data.rate.list[0]
      // }

      // this.setData({
      //   topImages: topImages,
      //   baseInfo:baseInfo,
      //   shopInfo:shopInfo,
      //   detailInfo:detailInfo,
      //   paramInfo:paramInfo,
      //   commentInfo:commentInfo
      // })

    })
  },
  //请求推荐数据
  _getRecommends(){
    getRecommends().then(res => {
      this.setData({
        recommends:res.data.list
      })
    })
  },
  //加入购物车
  onAddCart(){
   //获取商品对象
   const obj = {}
   obj.iid = this.data.iid
   obj.imageURL = this.data.topImages[0]
   obj.title = this.data.baseInfo.title
   obj.desc = this.data.baseInfo.desc
   obj.price = this.data.baseInfo.realPrice

   //加入购物车列表
   app.addToCart(obj)

   //加入成功提示
   wx.showToast({
     title: '加入购物车成功',
   })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})