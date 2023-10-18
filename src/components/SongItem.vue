<template>
  <div class="box">
    <div class="top">
      <div>
        <img class="img" :src="imgurl" alt="" />
      </div>
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
      display: block;
      width: 100%;
      border-radius: 20px;
    }
    .cover {
      display: flex;
      align-items: center;
      width: 100%;
      height: 30px;
      position: absolute;
      bottom: 0px;
      color: #eee;
      background-color: rgba(0, 0, 0, .4);
      border-bottom-left-radius: 20px;
      border-bottom-right-radius: 20px;
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
