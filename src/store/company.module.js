import { CompanyService } from '../services/company.service'
import vErrors from '../helpers/validationErrors'

export const COMPANIES = 'data'
export const PAGINATION = 'pagination'
export const SET_PAGINATION = 'set_pagination'
export const SET_DATA = 'set_data'

export const COMPANIES_MODULE = 'companies'
export const FETCH_COMPANIES = 'load_companies'

export const companies = {
  namespaced: true,
  state: {
    [COMPANIES]: [],
    [PAGINATION]: {
      page: 1,
      limit: 5,
      totalPages: 0,
      totalItems: 0,
      links: {
        next: '',
        previous: '',
        all: []
      }
    },
    asyncTask: {},
    error: false
  },
  actions: {
    [FETCH_COMPANIES] ({ commit }, payload) {
      commit('setLoading', false)
      CompanyService.getAll({
        ...this.state.pagination,
        ...payload
      }).then(
        data => {
          commit(SET_DATA, data.data.items)
          commit(SET_PAGINATION, {
            page: data.data.currentPage,
            limit: data.data.limit,
            totalPages: data.data.totalPages,
            totalItems: data.data.totalItems,
            links: data.data.links ? data.data.links : {}
          })
        },
        error => {
          commit('setLoadError', error)
        }
      ).finally(() => {
        commit('setLoading', false)
      })
    },
    store ({ commit, dispatch }, payload) {
        commit('setCreating', true)
        var _this = this
        CompanyService.create(payload).then(function(data) {
            dispatch('alert/success', 'Company added successfully', { root: true })
            dispatch(FETCH_COMPANIES, {..._this.state.pagination})
        }).catch(function(error){
            let msg = vErrors.getErrors(error);
            dispatch('alert/error', msg, { root: true })
        }).finally(() => {
            commit('setCreating', false)
        })
    },
    delete ({ commit, dispatch }, payload) {
        commit('setDeleting', true)
        var _this = this
        CompanyService.deleteOne(payload).then(function(data) {
            dispatch('alert/success', 'Company deleted successfully', { root: true })
            dispatch(FETCH_COMPANIES, {limit: 5, page: 1})
        }).catch(function(error){
            let msg = vErrors.getErrors(error);
            dispatch('alert/error', msg, { root: true })
        }).finally(() => {
            commit('setDeleting', false)
        })
    },
    update ({ commit, dispatch }, company) {
        commit('setUpdating', true)
        var _this = this
        CompanyService.update(company.id, company).then(function(data) {
            dispatch('alert/success', 'Company updated successfully', { root: true })
            dispatch(FETCH_COMPANIES, {limit: 5, page: 1})
        }).catch(function(error){
            let msg = vErrors.getErrors(error);
            dispatch('alert/error', msg, { root: true })
        }).finally(() => {
            commit('setUpdating', false)
        })
    },
    async getbyId ({commit}, id){
        var company = this.state.data?.find(x => x.id == id);
        if(company){
            return company;
        }else{
            let response = await CompanyService.get(id);
            if(response.status == 200){
                return response.data
            }else{
                dispatch('alert/error', 'Failed to retrieve company details', { root: true })
            }
        }
    }
  },
  mutations: {
    [SET_PAGINATION] (state, pagination) {
      state.pagination = pagination
    },

    [SET_DATA] (state, data) {
      state.data = data
    },
    setLoading (state, loading) {
      state.asyncTask = {loading}
    },
    setCreating (state, creating) {
      state.asyncTask = {creating}
    },
    setUpdating (state, updating) {
      state.asyncTask = {updating}
    },
    setDeleting (state, deleting) {
      state.asyncTask = {deleting}
    },
    setLoadError (state, error) {
      state.error = error
    }
  }
}
