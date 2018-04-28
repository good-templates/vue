<template>
  <div id="app">
    <div class="logo"></div>
    {{#webp}}
    <Images :src="img" webp/>
    {{/webp}}
    {{#router}}
    <router-view/>
    {{else}}
    <HelloWorld/>
    {{/router}}
  </div>
</template>

<script>
{{#unless router}}
import HelloWorld from './components/HelloWorld'

{{/unless}}
{{#webp}}
const img = require("./assets/logo.png");

{{/webp}}
export default {
  name: 'App'{{#router}}{{else}},
  components: {
    HelloWorld
  }{{/router}}{{#webp}},
  data() {
    return {
      img,
    };
  },{{/webp}}
}
</script>

<style lang="scss">
@import "./css/mixin.scss";

body {
  margin: 0 auto;
  min-width: 320px;
  max-width: 768px;
  width: 100%;
  height: 100%;
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
</style>
