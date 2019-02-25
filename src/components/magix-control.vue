<template>
  <div class="magix-control">
    <el-button type="primary" size="small" @click="$emit('add',$event)">新增</el-button>
    <el-button type="primary" size="small" @click="refresh">刷新</el-button>
    <el-button type="danger" size="small"@click="$emit('delete',$event)">删除</el-button>
  </div>
</template>

<script> 
  export default {
    name: 'magix_control',
    data() {
      return {
        
      }
    },
    created() {
      
    },
    methods: {
     refresh() {
       location.reload()
     }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .magix-control {
    padding:.4rem;
  }
</style>