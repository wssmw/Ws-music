<template>
  <div class="box">
    <el-icon class="left"><ArrowLeft /></el-icon>
    <el-icon class="right"><ArrowRight /></el-icon>
    <div class="box_inner">
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
  padding: 16px;
  position: relative;
  .left,
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    border: none;
    background-color: rgba(0, 0, 0, 0);
    font-size: 20px;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }
  .left {
    left: 10px;
  }
  .right {
    right: 10px;
    left: none;
  }
  .box_inner {
    margin: 20px;
    overflow: hidden;
    .big {
      width: 200%;
      display: flex;
    }
  }

}
</style>
