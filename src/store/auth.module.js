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
                commit('loginFailure', error);
                dispatch('alert/error', error, { root: true })
            });
    },
    logout({ dispatch, commit }) {
      UserService.logout()
      localStorage.setItem('loggingOut', "1")
      router.push('/login');
      commit('logout')
        dispatch('alert/success', 'Signed out successfully', { root: true })
      
    },
    register({ dispatch, commit }, { username, password }) {
        commit('setSigningUp', true);
        UserService.register(username, password)
                .then(
                    data => {
                        dispatch('alert/success', "Registered successfully", { root: true })
                        setTimeout(() => {
                            router.push('/login');
                        }, 3000);
                    }
                ).catch(function(error){
                    dispatch('alert/error', error, { root: true })
                }).finally(() => {
                    commit('setSigningUp', false);
                });
    },
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
    },
    setSigningUp(state, signingUp){
        state.status = { signingUp };
    }
  }
}
