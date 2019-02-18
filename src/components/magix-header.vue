<template>
  <div class="magix-header">
    <el-menu
      :default-active="active"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409EFF"
      text-color="#fff"
      active-text-color="#ff0">
      <el-menu-item index="1">小区资讯</el-menu-item>
      <el-menu-item index="2">资讯管理</el-menu-item>
      <el-menu-item index="3">信息查询</el-menu-item>
      <el-menu-item index="4">用户反馈</el-menu-item>
      <el-menu-item index="5">用户报修</el-menu-item>
      <el-menu-item index="6">物业缴费</el-menu-item>
      <el-menu-item index="7">费用查询</el-menu-item>
      <el-menu-item index="8">个人信息</el-menu-item>
      <el-button @click="signout">退出</el-button>
    </el-menu>
  </div>
</template>

<script>
  import uri from 'utils/uri'   
  export default {
    name: 'magix_header',
    data() {
      return {
        active: '1',
      }
    },
    created() {
      
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      signout() {
        this.$post(uri.signout).then(res=>{
          window.localStorage.removeItem('token')
          this.$router.push('login')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .magix-header {
    .el-menu {
      padding-left:3rem;
    }
  }
</style>