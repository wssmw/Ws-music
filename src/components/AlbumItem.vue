<template>
  <div class="content">
    <img class="img" :src="picUrl" alt="" />
    <div class="name">{{ name }}</div>
    <div class="avatar">{{ artist }}</div>
  </div>
</template>

<script>
export default {
  props: {
    picUrl: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    artist: {
      type: String,
      default: ''
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .img {
    width: 90%;
    margin: 0 auto;
  }
  .name {
    margin-left: 10px;
    font-size: 15px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; /*显示几行*/
    overflow: hidden;
  }
  .avatar {
    margin-left: 10px;
    font-size: 10px;
  }
}
</style>
