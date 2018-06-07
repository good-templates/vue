<template>
  <div id="app">
    <div class="logo"></div>
    {{#webp}}
    <img v-for="(img, index) in imgs" :key="index" v-lazy="img"/>
    {{/webp}}
    {{#router}}
    <router-view/>
    {{/router}}
    
  </div>
</template>

<script>
import Vue from 'vue';
import Loading from './components/common/Loading';

const img = require('./img/login/logo.png');

export default {
  name: 'App',
  data() {
    return {
      pageLoaing: true,{{#webp}}
      imgs: [
        img,
      ],{{/webp}}
    };
  },
  created() {
    Loading.show('', {
      bgcolor: 'rgba(255, 255, 255, 1)',
      innercolor: 'rgba(0, 0, 0, 0)',
      mode: 'page',
    });
  },
  mounted() {
    window.onload = () => {
      Loading.hide();
    };
  },
}
</script>

<style lang="scss">
@import "./css/mixin.scss";

body {
  margin: 0 auto;
  min-width: 320px;
  max-width: 768px;
  padding-top: constant(safe-area-inset-top);
  padding-left: constant(safe-area-inset-left);
  padding-right: constant(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-top: env(safe-area-inset-top);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-bottom: env(safe-area-inset-bottom);
  font-family: -apple-system, Helvetica, "Microsoft YaHei", Arial, sans-serif;
}

html,body {
  width: 100%;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.logo{
  @include bg-wh('./img/login/logo.png');
}

</style>
