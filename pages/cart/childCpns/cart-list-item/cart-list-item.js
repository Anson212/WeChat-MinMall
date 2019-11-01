// pages/cart/childCpns/cart-list-item/cart-list-item.js
const app = getApp()

Component({
  properties: {
    goods: {
      type: Object,
      value: {}
    },
    index: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods:{
    onCheckClick(e){
      //在全局变量中查找到对应的商品
      const goods = app.globalData.cartList.find(item => item.iid == this.properties.goods.iid)
      goods.checked = !goods.checked

      //获取当前商品的index
      const index = e.currentTarget.dataset.index;

      //回调cart.js中声明的函数
      console.log(index)
      app.changeGoodsState(index,goods)

    }
  }

})
