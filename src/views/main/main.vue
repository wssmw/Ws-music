<template>
  <div>
    <div class="select">
      <router-link active-class="active" class="recommend" to="/main/recommend"
        >推荐</router-link
      >
      <router-link active-class="active" class="musictop" to="/main/musictop"
        >排行榜</router-link
      >
      <router-link active-class="active" class="musiclist" to="/main/musiclist"
        >歌单</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.active {
  border-radius: 20px;
  background-color: #ffffff;
}
.select {
  background-color: #aaa;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  .recommend,
  .musictop,
  .musiclist {
    // color: white;
    padding: 10px;
    margin: 0 40px;
    &:hover {
      border-radius: 20px;
      background-color: #dfe4ea;
    }
  }
}
</style>
