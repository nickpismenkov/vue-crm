import firebase from 'firebase/app';

export default {
  actions: {
    async createCategory({ dispatch, commit }, { title, limit }) {
      try {
        const uid = await dispatch('getUId');
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({ title, limit });
        return { title, limit, id: category.key };
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
    async fetchCategories({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUId');
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};

        return Object.keys(categories).map((key) => ({ ...categories[key], id: key }));
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
    async updateCategory({ dispatch, commit }, { id, title, limit }) {
      try {
        const uid = await dispatch('getUId');
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({ title, limit });
      } catch (e) {
        commit('setError', e);
        throw new Error(e);
      }
    },
  },
};
