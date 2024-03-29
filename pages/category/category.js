// pages/category/category.js
import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from '../../service/category.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [],
    categoryData: {},
    currentIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getData()
  },
  _getData() {
    // 请求分类数据
    this._getCategory()
  },
  _getCategory(){
    getCategory().then(res =>{
      //获取categories
      const categories = res.data.category.list;
      //console.log(categories)
      //初始化每个类别的子数据
      const categoryData = {}
      for(let i=0;i<categories.length;i++){
        categoryData[i] = {
          subcategories: [],
          categoryDetail: []
          // categoryDetail: {
          //   'pop': [],
          //   'new': [],
          //   'sell': []
          // }
        }
      }
      //修改data中的数据
      this.setData({
        categories:res.data.category.list,
        categoryData:categoryData
      })

      //请求第一个类别的数据
      this._getSubcategory(0)
      
      //请求第一个类别的详情数据
      //this._getCategoryDetail(0)
    })
  },
  
  _getSubcategory(currentIndex) {
    //获取对应的maitkey 
    const maitkey = this.data.categories[currentIndex].maitKey;
    //请求数据
    getSubcategory(maitkey).then(res => {
      console.log(res)
      const tempCategoryData = this.data.categoryData;
      let str = res[0].data
      for (let i = 0; i < str.length; i++){
        if (maitkey === str[i].key) {
          tempCategoryData[currentIndex].subcategories = str[i].liu.list;
        }
      }
      
      
      this.setData({
        categoryData: tempCategoryData
      })
    })
  },

 // _getCategoryDetail(currentIndex) {
    // 1.获取对应的miniWallKey
    //const miniWallKey = this.data.categories[currentIndex].miniWallkey;

    // 2.请求数据类别的数据
    //this._getRealCategoryDetail(currentIndex, miniWallKey, 'pop');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'new');
    // this._getRealCategoryDetail(currentIndex, miniWallKey, 'sell');

  //},
  // _getRealCategoryDetail(index, miniWallKey, type) {
  //   getCategoryDetail(miniWallKey, type).then(res => {
  //     // 1.获取categoryData
  //     const categoryData = this.data.categoryData;

  //     // 2.修改数据
  //     categoryData[index].categoryDetail = res;

  //     // 3.修改data中的数据
  //     this.setData({
  //       categoryData: categoryData
  //     })
  //   })
  // },

  menuClick(e) {
    // 1.改变当前的currentIndex
    const currentIndex = e.detail.currentIndex;
    this.setData({
      currentIndex
    })

    // 2.请求对应currentIndex的数据
    this._getSubcategory(currentIndex);

    // 3.请求对应的currentIndex的详情数据
    //this._getCategoryDetail(currentIndex)
  },
})