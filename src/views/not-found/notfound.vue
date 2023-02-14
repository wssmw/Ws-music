<template>
  <div class="box">
    <el-popover
      placement="bottom"
      :width="200"
      trigger="click"
    >
    <h1>hahah</h1>
      <template #reference>
        <h2>click</h2>
      </template>
    </el-popover>
    <div>NOT FOUND 基于网易云api的后端,如有侵权立马删除</div>
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
.box {
  position: relative;
  width: 800px;
  height: 200px;
  .bg-img,
  .bgcover {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  .bgcover {
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(20px);
  }
}
</style>
