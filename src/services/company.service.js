var model = 'companies'
const axios = require('axios')
export const CompanyService = {
  getAll: (queryParams) => {
    let query = ''
    if (queryParams.page) {
      query = `?page=${queryParams.page}`
    }

    if (queryParams.limit) {
      query = `${query}&limit=${queryParams.limit}`
    }
    return axios.get(`/${model}${query}`)
  },
  get: (id) => {
    return axios.get(`/${model}/${id}`)
  },
  create: (data) => {
    return axios.post(`/${model}`, data)
  },
  update: (id, data) => {
    return axios.put(`/${model}/${id}`, data)
  },
  deleteOne: (id) => {
    return axios.delete(`/${model}/${id}`)
  },
  deleteAll: () => {
    return axios.delete(`/${model}`)
  },
  getByISIN: (isin) => {
    return axios.get(`/${model}/isin/${isin}`)
  }
}
