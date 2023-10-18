<template>
  <div class="topaside">
    <template v-for="(item, index) in itemData">
      <div
        :class="[index === currentIndex ? 'active' : '', 'content']"
        @click="itemClick(index)"
      >
        <div class="left">
          <img class="img" :src="item.coverImgUrl" alt="" />
        </div>
        <div class="right">
          <div class="name">{{ item.name }}</div>
          <div class="update">{{ item.updateFrequency }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    itemData: {
      type: Array,
      default: () => []
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const currentIndex = ref(0)
    const itemClick = (index = 0) => {
      currentIndex.value = index
      emit('click', props.itemData[index]?.id)
    }
    // itemClick()
    return {
      currentIndex,
      itemClick
    }
  }
}
</script>

<style lang="less" scoped>
.active {
  background-color: #ccc!important;
}
.content {
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  // border: 1px solid black;
  &:hover {
    background-color: #e6e6e6;
  }
  .left {
    flex: 1;
    margin-left: 20px;
    display: flex;
    align-items: center;
    .img {
      width: 70%;
    }
  }
  .right {
    flex: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      font-size: 12px;
      margin: 5px 0;
    }
    .update {
      font-size: 8px;
      margin: 5px 0;
      color: #bbb;
    }
  }
}
</style>
