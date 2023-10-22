<template>
  <div class="mvitem">
    <img class="img" v-lazy="itemData.coverUrl" alt="" />
    <div class="dec">{{ itemData.title }}</div>
    <div class="author">by<span>{{ itemData.creator[0].userName }}</span></div>
    <div class="time">{{ formatTime(itemData.durationms) }}</div>
    <div class="playcount">
      <el-icon><VideoCamera /></el-icon>{{ formatCount(itemData.playTime) }}
    </div>
  </div>
</template>

<script>
import { formatCount, formatTime } from '../utils/format'
export default {
  props: {
    itemData: {
      type: Object,
      default: ''
    },
  },
  setup() {
    return {
        formatCount,
        formatTime
    }
  }
}
</script>

<style lang="less" scoped>
.mvitem {
  position: relative;
  width: 23%;
  margin: 0 1%;

  .img {
    width: 100%;
    border-radius: 5px;
  }
  .dec {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .author {
    font-size: 10px;
    color: #666;
    span {
        margin-left: 5px;
    }
  }
  .time {
    color: white;
    font-size: 12px;
    font-weight: 600;
    position: absolute;
    bottom: 40px;
    left: 2px;
  }
  .playcount {
    position: absolute;
    top: 0;
    right: 0%;
    display: flex;
    align-items: center;
    color: white;
    padding-left: 10px;
    font-size: 12px;
    font-weight: 600;
    background-color: rgba(0, 0, 0, 0.2);
  }
}
</style>
