<template>
    <div class="text">
        <h2>{{ itemData }}</h2>
</div>
</template>
<script>
import { computed } from 'vue'
export default {
    props:['itemData'],
   setup(props) {
    const itemData = computed(()=>{
        let itemData = props.itemData
        // Object.keys(props.itemData).forEach((key)=>{
        //     if(key==)
        // })
        return itemData
    })
      return {
        itemData
      }
   },
}
</script>
<style lang='less' scoped>
.test {
    width: 200px;
    height: 200px;
    background-color: red;
}
</style>
