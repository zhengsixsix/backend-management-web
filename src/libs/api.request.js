import HttpRequest from '@/libs/axios'
// 此处vue还没实例化，不能使用vue相关变量来获取数据
const baseUrl = process.env.VUE_APP_BASEURL
const axios = new HttpRequest(baseUrl)
export default axios
