import request from './network.js'

export function getCategory(){
  return request({
    url: '/v1/category'
  })
}

export function getSubcategory(maitKey) {
  return request({
    url: '/v1/subcategory',
    data: {
      maitKey
    }
  })
}

// export function getCategoryDetail(miniWallkey, type) {
//   return request({
//     url: '/v1/subcategory',
//     data: {
//       miniWallkey,
//       type
//     }
//   })
// }