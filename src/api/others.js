import axios from '@/libs/api.request'

export const getInventory = (info) => {
  return axios.request({
    url: 'orther/getInventory',
    data: info,
    method: 'get',
  })
}

// getClass
export const getClass = (info) => {
  return axios.request({
    url: 'orther/getClass',
    data: info,
    method: 'get',
  })
}
