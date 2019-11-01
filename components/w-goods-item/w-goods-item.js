Component({
  properties: {
    goodsitem: {
      type: Object,
      value: {}
    }
  },
  data: {},
  methods: {
    itemClick(e) {
      //1.获取id
      const iid = this.data.goodsitem.iid;
      //2.跳转到对应的路径
      wx.navigateTo({
        url: '/pages/detail/detail?iid=' + iid,
      })
    }
  }

})