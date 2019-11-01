import request from './network.js'

export function getMultiData() {
  return request({
    url: '/v1/multidata'
  })
}

export function getHomeGoodsPop(type, page) {
  return request({
    url: "/v1/data",
    params: {
      type,
      page
    }
  })
}


export function getHomeGoodsNew(type, page) {
  return request({
    url: "/v1/new",
    params: {
      type,
      page
    }
  })
}





export function getHomeGoodsSell(type, page) {
  return request({
    url: "/v1/sell",
    params: {
      type,
      page
    }
  })
}