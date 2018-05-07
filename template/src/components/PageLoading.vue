<template>
  <div id="good_loading" class="loading" @touchmove.prevent>
    <div class="inner">
      <i class="spin"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageLoading',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../css/loading.scss";
</style>
