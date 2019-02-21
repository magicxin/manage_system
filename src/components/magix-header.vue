<template>
  <div class="magix-header">
    <el-menu
      :default-active="onRoute"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409EFF"
      text-color="#fff"
      active-text-color="#ff0">
      <el-menu-item index="home">小区资讯</el-menu-item>
      <el-menu-item index="2">资讯管理</el-menu-item>
      <el-menu-item index="3">信息查询</el-menu-item>
      <el-menu-item index="4">用户反馈</el-menu-item>
      <el-menu-item index="5">用户报修</el-menu-item>
      <el-menu-item index="6">物业缴费</el-menu-item>
      <el-menu-item index="7">费用查询</el-menu-item>
      <el-menu-item index="user_info">个人信息</el-menu-item>
      <el-menu-item index="auth">用户管理</el-menu-item>
    </el-menu>
    <div class="options">
      <div class="option-item" @click="signout">退出</div>
    </div>
  </div>
</template>

<script>
  import uri from 'utils/uri'   
  export default {
    name: 'magix_header',
    data() {
      return {
        active: 'home',
      }
    },
    created() {
      
    },
    computed: {
      onRoute() {
        return this.$route.name
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push({name:key})
      },
      signout() {
        this.$post(uri.signout).then(res=>{
          this.$store.commit('admin/signout')
//        window.localStorage.removeItem('token')
          this.$router.push('login')
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .magix-header {
    display:flex;
    .options {
      display:flex;
      flex-grow: 1;
      justify-content: flex-end;
      align-items:center;
      color: rgb(255, 255, 255);
      background-color: rgb(64, 158, 255);
    }
    .option-item {
      cursor: pointer;
      padding:0 1.4rem;
    }
    .el-menu {
      padding-left:3rem;
    }
    .el-menu.el-menu--horizontal {
      border-bottom:none;
    }
  }
</style>