<style lang="scss">
@import "../../../css/animate.scss";

.Loading {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.Loading--main {
  padding: .2rem;
  border-radius: 5px;
  line-height: 0;
  text-align: center;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, .3);
}

.Loading--message {
  margin: 0;
  padding-top: .2rem;
  font-size: 24dpx;
  line-height: 1;
  color: #fff;
}

</style>

<template>
<transition name="zy-anim--fade">
  <div class="Loading" v-show="visible" :style="{zIndex: zIndex,backgroundColor: loadingConfig.bgcolor}">
    <div class="Loading--main" :style="{backgroundColor: loadingConfig.innercolor}">
      <Spinner :size="size" :mode="loadingConfig.mode" />
      <p class="Loading--message" v-show="message">{{message}}</p>
    </div>
  </div>
</transition>
</template>

<script>
import { Spinner } from '../Spinner';

const defaultConfig = {
  bgcolor: 'rgba(0, 0, 0, 0)',
  innercolor: 'rgba(0, 0, 0, .3)',
  mode: 'loading',
};
export default {
  data() {
    return {
      message: '',
      visible: false,
      zIndex: 7,
      size: lib.flexible.dpr * 46,
      loadingConfig: defaultConfig,
    };
  },

  components: {
    Spinner,
  },

  methods: {
    show(message, config) {
      this.message = message;
      this.visible = true;
      if (config) {
        this.loadingConfig = config;
      } else {
        this.loadingConfig = defaultConfig;
      }
    },
    hide() {
      this.message = '';
      this.visible = false;
      this.zIndex = 4;
    },
  },
};
</script>
