export default {
  install(Vue) {
    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$message = (html) => {
      // eslint-disable-next-line no-undef
      M.toast({ html });
    };

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$error = (html) => {
      // eslint-disable-next-line no-undef
      M.toast({ html: `[Ошибка]: ${html}` });
    };
  },
};
