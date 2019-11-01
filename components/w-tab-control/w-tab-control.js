Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },

  data: {
    currentIndex: 0
  },

  methods: {
    itemClick(e) {
      
      //设置最新的index
      this.setData({
        currentIndex: e.currentTarget.dataset.index
      })
      //发出时间
      const data = { index:  e.currentTarget.dataset.index}
      this.triggerEvent("tabclick", data, {})  //将索引值传给父组件
    },
    setCurrentIndex(index){
     
      this.setData({
        currentIndex: index
      })
    }

  }

})