import axios from '@/libs/api.request'

export const addOrder = (info) => {
  return axios.request({
    url: 'order/add',
    data: info,
    method: 'post',
  })
}

export const orderPage = (info) => {
    return axios.request({
      url: 'order/page',
      data: info,
      method: 'post',
    })
  }

// getAllFoods
export const getAllFoods = (info) => {
  return axios.request({
    url: 'order/getAllFoods',
    data: info,
    method: 'get',
  })
}
