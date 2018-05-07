/* eslint-disable*/
{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
{{#webp}}
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  filter: {
    webp(listener, options) {
      if (!options.supportWebp || listener.src.indexOf("data:image/") === 0) return;
      listener.src += '.webp'
    }
  }
})
{{/webp}}
import App from './App'
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false


function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  const name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? `component <${name}>` : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ` at ${vm.$options && vm.$options.__file}` : '');
}

Vue.config.errorHandler = function (err, vm, info) {
  const componentName = formatComponentName(vm);
  const propsData = vm.$options && vm.$options.propsData;
  BJ_REPORT.report({
    msg:err,
    target:componentName,
    propsData:propsData,
    info:info,
  });
};

new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
