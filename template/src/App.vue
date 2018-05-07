<template>
  <div id="app">
    <div class="logo"></div>
    {{#webp}}
    <img v-for="(img, index) in imgs" :key="index" v-lazy="img"/>
    {{/webp}}
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
    <transition name="fade">
      <PageLoading v-if="pageLoaing"/>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import PageLoading from './components/PageLoading.vue';
{{#unless router}}
import HelloWorld from './components/HelloWorld.vue'
{{/unless}}

Vue.component('PageLoading', PageLoading);
const img = require('./img/logo.png');

export default {
  name: 'App'{{#router}}{{else}},
  components: {
    HelloWorld
  }{{/router}},
  data() {
    return {
      pageLoaing: true,{{#webp}}
      imgs: [
        img,
      ],{{/webp}}
    };
  },
  mounted() {
    setTimeout(() => {
      this.pageLoaing = false;
    }, 2000);
  },
}
</script>

<style lang="scss">
@import "./css/mixin.scss";

body {
  margin: 0 auto;
  min-width: 320px;
  max-width: 768px;
  width: 100%;
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

html {
  width: 100%;
  height: 100%;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.logo{
  @include bg-wh('./img/logo.png');
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
