<template>
  <div class="box">
    <button class="left">&lt</button>
    <button class="right">></button>
    <div class="big">
      <template v-for="item in itemData">
        <AlbumItem
          :artist="item.artist.name"
          :name="item.name"
          :picUrl="item.picUrl"
        />
      </template>
    </div>
  </div>
</template>

<script>
import AlbumItem from '../components/AlbumItem.vue'
export default {
  components: {
    AlbumItem
  },
  props: {
    itemData: {
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
.box {
  background-color: #f5f5f5;
  border: 1px solid #fff;
  overflow: hidden;
  position: relative;
  .left,
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-size: 20px;
  }
  .right {
    right: 0;
  }
  .big {
    width: 200%;
    display: flex;
  }
}
</style>
