import axios from '@/libs/api.request'

export const langsPage = (info) => {
    return axios.request({
      url: 'class/add',
      data: info,
      method: 'post',
    })
  }