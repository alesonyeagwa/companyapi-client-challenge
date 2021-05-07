import { UserService } from '../services/user.service'
import { router } from '../router'

import * as $ from "jquery";

const user = JSON.parse(localStorage.getItem('user'))
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: {}, user: null };
export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ dispatch, commit }, { username, password }) {
      commit('loginRequest', { username });

      UserService.login(username, password)
            .then(
                data => {
                    let user = data.data
                    if (user.token) {
                        localStorage.setItem('user', JSON.stringify(user));
                        commit('loginSuccess', user);
                        router.push('/dashboard');
                    }else{
                        dispatch('alert/error', 'Login failed', { root: true })
                    }
                }
            ).catch(function(error){
                let message = error
                if(error.response){
                    if (error.response.status == 400 && error.response.data?.errors) {
                        //validation errors
                        message = ''
                        $.each(error.response.data.errors, function(fieldName, errors){
                            message = `${message}${errors[0] }`
                        });
                    }
                }
                commit('loginFailure', error);
                dispatch('alert/error', message, { root: true })
            });
    },
    logout({ dispatch, commit }) {
      UserService.logout()
      commit('logout')
      dispatch('alert/success', 'Signed out successfully', { root: true })
    }
  },
  mutations: {
    loginRequest(state, user) {
      state.status = { loggingIn: true };
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status = { loggedIn: true };
      state.user = user;
    },
    loginFailure(state) {
      state.status = {};
      state.user = null;
    },
    logout(state) {
      state.status = {};
      state.user = null;
    }
  }
}
