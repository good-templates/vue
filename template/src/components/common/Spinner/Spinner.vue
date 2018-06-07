<style lang="scss">
.Spinner {
  display: inline-block;
  box-sizing: border-box;
  background: url(../../../img/loading/jiazai22@2x.png) center no-repeat;
  background-size: 100%;
  .inner{
    width: 100%;
    height: 100%;
    animation: spinner 2s linear infinite;
    background: url(../../../img/loading/jiazai2@2x.png) center no-repeat;
    background-size: 100%;
  }

  &.Spinner--page{
    background-image: url(../../../img/loading/jiazai11@2x.png);
    .inner{
      background-image: url(../../../img/loading/jiazai1@2x.png);
    }
  };

}
@keyframes spinner {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="Spinner"
    :style="style"
    :class="{'Spinner--page': mode=='page'}"
  >
    <div class="inner"></div>
  </div>
</template>

<script>
export default {
  props: {
    // 组件大小
    size: {
      type: [Number, String],
      default: 22,
    },
    // 模式
    mode: {
      type: String,
      default: 'loading',
    },
  },

  computed: {
    style() {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      };
    },
  },
};
</script>
