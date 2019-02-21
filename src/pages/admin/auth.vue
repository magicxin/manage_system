<template>
  <div class="auth">
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="type" label="类别" width="180"></el-table-column>
      <el-table-column prop="statu" label="审核" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">审核</el-button>
        <el-button type="text" size="small">权限</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getUser } from 'controller/auth'
  export default {
    name: 'auth',
    data() {
      return {
        tableData: []
      }
    },
    created() {
      getUser.bind(this)().then(res=>{
        console.log(res)
        this.tableData = res
      })
    },
    methods: {
      handleClick(item) {
        
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .auth {
    
  }
</style>