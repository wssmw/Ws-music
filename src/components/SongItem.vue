<template>
  <div class="box">
    <div class="top">
      <img class="img" :src="imgurl" alt="" />
      <div class="cover">
        <div class="left">{{ formatCount(playCount) }}</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="bottom">{{ name }}</div>
  </div>
</template>

<script>
import { formatCount } from '../utils/format'
export default {
  props: {
    imgurl: {
      type: String,
      default: ''
    },
    playCount: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    }
  },
  setup() {

    return {
      formatCount,
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  display: flex;
  flex-direction: column;
  .top {
    flex: 3;
    position: relative;
    .img {
      width: 100%;
      border-radius: 20px;
    }
    .cover {
      width: 100%;
      position: absolute;
      bottom: 10px;
      color: #eee;
      .left {
        padding-left: 10px;
      }
    }
  }
  .bottom {
    flex: 3;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
