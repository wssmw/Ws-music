<template>
  <div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required:true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.title {
  margin: 10px 10px;
  font-size: 28px;
  font-weight: 700;
}
</style>
