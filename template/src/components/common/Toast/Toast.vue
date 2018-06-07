<style lang="scss">
@import "../../../css/animate.scss";

.Toast {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  height: 100%;
}

.Toast--main {
  padding: 10px;
  border-radius: 5px;
  font-size: 26dpx;
  line-height: 1.5;
  color: #fff;
  background-color: rgba(0, 0, 0, .7);
  &.bottom {
    position: absolute;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%)
  }
  &.center {
    align-self: center;
  }
  &.top {
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%)
  }
}
</style>

<template>
<transition
  name="zy-anim--fade"
  @after-leave="afterLeave"
>
  <div class="Toast" v-show="visible" :style="{zIndex: zIndex}">
    <div
      class="Toast--main"
      :class="{
        top: position === 'top',
        center: position === 'center',
        bottom: position === 'bottom',
      }"
    >
      {{content}}
    </div>
  </div>
</transition>
</template>

<script>
/* eslint-disable no-param-reassign */
export default {
  data() {
    return {
      visible: false,
      content: '',
      position: 'center',
      zIndex: 7,
    };
  },

  methods: {
    show(content, position = 'center', time = 2000, callback) {
      if (typeof position === 'function') {
        callback = position;
        position = 'center';
      }

      if (typeof time === 'function') {
        callback = time;
        time = 2000;
      }

      this.content = content;
      this.position = position;
      this.visible = true;

      setTimeout(() => {
        this.hide();
        if (typeof callback === 'function') {
          callback();
        }
      }, time);
    },

    hide() {
      this.visible = false;
    },

    afterLeave() {
      this.content = '';
      this.position = 'center';
      this.zIndex = 4;
    },
  },
};
</script>

