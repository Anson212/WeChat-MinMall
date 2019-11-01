// pages/home/home.js
import { //引入相关请求方法
  getMultiData,
  getHomeGoodsPop,
  getHomeGoodsNew,
  getHomeGoodsSell
} from '../../service/home.js'
import {
  POP,
  SELL,
  NEW,
  BACK_TOP_POSITION
} from '../../common/const.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    recommends: [],
    titles: ["品牌上新", "遮肉显瘦", "梨型身材"],
    goods: {
      [POP]: { page: 1, list: [] },
      [NEW]: { page: 1, list: [] },
      [SELL]: { page: 1, list: [] },
    },
    currentType:'pop',
    topPosition: 0,
    tabControlTop:0,
    showBackTop:false,
    showTabControl: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //发送网络请求
    this._getData()
  },

  //监听滚动
  scrollPosition(e){
   //1.获取滚动的顶部
   const position = e.detail.scrollTop;
   //2.设置是否显示
   this.setData({
     showBackTop: position > BACK_TOP_POSITION,
   })
   wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
     const show = rect.top > 0
     this.setData({
       showTabControl: !show
     })
   }).exec()
  },
  onImageLoad(){
    wx.createSelectorQuery().select('.tab-control').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
  },
  //返回顶部
  onBackTop(){
    this.setData({
      showBackTop:false,
      topPosition: 0,
      tabControlTop:0

    })
  },
  loadMore(){ //下拉刷新
    this._getProductData(this.data.currentType);
  },



  //选项卡点击
  tabClick(e) {
    //1.根据当前的点击赋值最新的currentType
    let currentType = ''
    switch(e.detail.index){
      case 0:
      currentType = POP
      break
      case 1:
      currentType = NEW 
      break
      case 2:
      currentType = SELL
      break
    }
    this.setData({
      currentType: currentType
    })
    this.selectComponent('.tab-control').setCurrentIndex(e.detail.index)
    this.selectComponent('.tab-control-temp').setCurrentIndex(e.detail.index)
    //console.log(e)
    ///console.log(this.selectComponent('.tab-control').setCurrentIndex(e.detail.index));
    //console.log(this.selectComponent('.tab-control'));
  },



  //网络请求相关方法
  _getData() {
    this._getMultiData(); //获取轮播图相关的数据
    this._getHomeGoodsPop(POP)
    this._getHomeGoodsNew(NEW)
    this._getHomeGoodsSell(SELL)
  },

  _getMultiData() {
    getMultiData().then(res => {
      // 1.取出轮播所有的数据
      const banners = res.data.banner.list.map(item => {
        return item.image
      })

      // 2.设置数据
      this.setData({
        banners: banners,
        recommends: res.data.recommend.list
      })
    })
  },
  _getHomeGoodsPop(type) {
    //1.获取数据对应的页码
    const page = this.data.goods[type].page;
    //2.请求数据
    getHomeGoodsPop(type, page).then(res => {
      //1.取出数据
      const list = res.data.list;
      //2.将数据临时获取
      const goods = this.data.goods;
     
      goods[type].list.push(...list)
      goods[type].page += 1;
      //3.将最新的goods设置到goods中
      this.setData({
        goods: goods
      })

    })
  },

  _getHomeGoodsNew(type) {
    //1.获取数据对应的页码
    const page = this.data.goods[type].page;
    //2.请求数据
    getHomeGoodsNew(type, page).then(res => {
      //1.取出数据
      const list = res.data.list;
      //2.将数据临时获取
      const goods = this.data.goods;

      goods[type].list.push(...list)
      goods[type].page += 1;
      //3.将最新的goods设置到goods中
      this.setData({
        goods: goods
      })

    })
  },

  _getHomeGoodsSell(type) {
    //1.获取数据对应的页码
    const page = this.data.goods[type].page;
    //2.请求数据
    getHomeGoodsSell(type, page).then(res => {
      //1.取出数据
      const list = res.data.list;
      //2.将数据临时获取
      const goods = this.data.goods;

      goods[type].list.push(...list)
      goods[type].page += 1;
      //3.将最新的goods设置到goods中
      this.setData({
        goods: goods
      })

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