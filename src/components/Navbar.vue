<template>
  <div class="navbar">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in bannerList" :key="item">
        <img class="img" :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: {
    bannerList: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.navbar {
  .img {
    width: 100%;
  }
}
</style>
