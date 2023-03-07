<template>
  <div class="not-found">
    <button @click="click">点击</button>
    <test :itemData="itemData"></test>
  </div>
</template>

<script>
import { reactive } from 'vue'
import test from './text.vue'
export default {
  components: {
    test
  },
  setup() {
    const obj = reactive({ count: 0 })
    let itemData = reactive([
      {
        name: 'wss',
        age: 12
      },
      {
        name: 'wss',
        age: 12
      },
      {
        name: 'wss',
        age: 12
      }
    ])
    const click = () => {
      itemData[0].age += 1
    }
    return {
      itemData,
      click
    }
  }
}
</script>

<style lang="less" scoped>
.not-found {
  display: flex;

  .left {
    flex: 1;
  }

  .center {
    flex: 1;
    .item {
      width: 100%;
      background-color: red;
    }
  }

  .right {
    flex: 1;
  }
}
</style>
