<template>
  <div class="not-found">
    <WsTable :propColumn="propColumn" :tableData="tableData">
      <template #age="{data,index}">
        <h2>{{ data.age }}{{ index }}</h2>
      </template>
    </WsTable>
  </div>
</template>

<script>
import WsTable from '@/base_ui/WsTable.vue'
import { times } from 'lodash'
import { reactive } from 'vue'
export default {
  components: {
    WsTable
},
  setup() {
    const tableData = [

      {
        name:'wss',
        time:'2020-22-22',
        age:'88'
      },
      {
        name:'wss',
        time:'2020-22-22',
        age:'88'
      },
      {
        name:'wss',
        time:'2020-22-22',
        age:'88'
      },
      {
        name:'wss',
        time:'2020-22-22',
        age:'88'
      },
    ]
    const propColumn = [
      {
        type:'index'
      },
      {
        prop:'name',
        label:'Name',
      },
      {
        prop:'time',
        label:'time'
      },
      {
        prop:'age',
        label:'age',
        soltName:'age',
        width:400
      }
    ]
    return {
      propColumn,
      tableData
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
