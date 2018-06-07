import Vue from 'vue';
import Dialog from './Dialog';

const instance = new Vue({
  ...Dialog,
})

;(function () {
  const id = 'smart-ui-dialog-mount-point';
  const mountPoint = document.createElement('div');
  mountPoint.id = id;
  document.body.appendChild(mountPoint);
  instance.$mount(`#${id}`);
}());

export default {
  alert() {
    instance.alert(...arguments);
  },

  confirm() {
    instance.confirm(...arguments);
  },

  prompt() {
    instance.prompt(...arguments);
  },

  zIndex(zIndex) {
    instance.zIndex = zIndex;
    return instance;
  },
};
