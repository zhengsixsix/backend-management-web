import axios from '@/libs/api.request'

export const classAdd = (info) => {
  return axios.request({
    url: 'class/add',
    data: info,
    method: 'post',
  })
}
export const classPage = (info) => {
  return axios.request({
    url: 'class/page',
    params: info,
    method: 'get',
  })
}

export const classUpdate = (info) => {
  return axios.request({
    url: 'class/Update',
    data: info,
    method: 'post',
  })
}

export const classRemove = (info) => {
  return axios.request({
    url: 'class/del',
    data: info,
    method: 'post',
  })
}


export const NoClassPage = (info) => {
  return axios.request({
    url: 'class/NoClassPage',
    data: info,
    method: 'post',
  })
}

export const bindClass = (info) => {
  return axios.request({
    url: 'food/addClass',
    data: info,
    method: 'post',
  })
}

export const queryClass = (info) => {
  return axios.request({
    url: 'class/queryClass',
    data: info,
    method: 'post',
  })
}