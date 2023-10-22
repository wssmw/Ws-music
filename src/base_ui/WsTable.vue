<template>
  <div class="content">
    <el-table
      stripe
      :data="tableData"
      :height="height"
      style="width: 100%"
      @cell-click="cellClick"
    >
      <el-table-column
        v-for="({ prop, label, width, soltName, type }, index) in propColumn"
        :show-overflow-tooltip="true"
        :prop="prop"
        :label="label"
        :key="index"
        :width="width"
        :type="type"
      >
        <template v-if="soltName" #default="{ row, $index }">
          <slot :name="soltName" :data="row" :index="$index"></slot>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    propColumn: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    },
    cellClick: {
      type: Function,
      default: () => {}
    },
    height:{
      type:Number,
      default:0
    }
  },
  setup(props) {
    const height=computed(()=>props.height==0?null:props.height)
    console.log(height);
    return {
      height
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      .list {
        font-size: 30px;
      }
      .num {
        margin-left: 40px;
      }
    }
  }
  .sub {
    width: 100%;
    height: 100%;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-top: 2px solid red;
    .cell {
      text-align: center;
    }
  }
}
</style>
