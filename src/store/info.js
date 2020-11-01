import firebase from 'firebase/app';

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchUserData({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUId');
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
        commit('setInfo', info);
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
    async updateInfo({ dispatch, commit, getters }, info) {
      try {
        const uid = await dispatch('getUId');
        const updateInfo = { ...getters.info, ...info };
        await firebase.database().ref(`/users/${uid}/info`).update(updateInfo);
        commit('setInfo', updateInfo);
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
