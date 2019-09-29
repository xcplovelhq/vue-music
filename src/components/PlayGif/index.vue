<template>
  <div
    class="g-play-gif"
    @click="handleShowPlaying"
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
export default {
  methods: {
    handleShowPlaying() {
      this.$store.commit("playing/getShowPlaying");
    }
  }
};
</script>

<style lang="less" scoped>
.g-play-gif {
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: space-between;
  span {
    width: 2px;
    margin-right: 1px;
    background: #fff;
    animation: up-and-down 2s linear infinite calc(-1 * 0.4s * var(--n));
    animation-play-state: paused;
    &:nth-child(1) {
      --n: 1;
    }
    &:nth-child(2) {
      --n: 2;
    }
    &:nth-child(3) {
      --n: 3;
    }
    &:nth-child(4) {
      --n: 4;
    }
  }
  &.active {
    span {
      background: #333;
    }
  }
}

@keyframes up-and-down {
  0%,
  100% {
    clip-path: inset(27% 0 0 0);
  }

  10% {
    clip-path: inset(17% 0 0 0);
  }

  20% {
    clip-path: inset(55% 0 0 0);
  }

  30% {
    clip-path: inset(30% 0 0 0);
  }

  40% {
    clip-path: inset(13% 0 0 0);
  }

  50% {
    clip-path: inset(38% 0 0 0);
  }

  60% {
    clip-path: inset(80% 0 0 0);
  }

  70% {
    clip-path: inset(21% 0 0 0);
  }

  80% {
    clip-path: inset(0% 0 0 0);
  }

  90% {
    clip-path: inset(36% 0 0 0);
  }
}
</style>
