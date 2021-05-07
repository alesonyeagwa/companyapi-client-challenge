import vErrors from '../helpers/validationErrors'
export const alert = {
    namespaced: true,
    state: {
        type: null,
        message: null
    },
    actions: {
        success({ commit }, message) {
            commit('success', message);
        },
        error({ commit }, message) {
            commit('error', message);
        },
        clear({ commit }) {
            commit('clear');
        }
    },
    mutations: {
        success(state, message) {
            state.type = 'alert-success';
            state.message = message;
        },
        error(state, message) {
            let msg = vErrors.getErrors(message);
            state.type = 'alert-danger';
            state.message = msg;
        },
        clear(state) {
            state.type = null;
            state.message = null;
        }
    }
}
