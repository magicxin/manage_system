<template>
  <div class="tab-bar">
    <el-menu
      :default-active="onRoute"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
      background-color="#409EFF"
      text-color="#fff"
      active-text-color="#ff0">
      <el-menu-item index="home">资讯管理</el-menu-item>
      <el-menu-item index="house">房屋信息</el-menu-item>
      <el-menu-item index="tofix">用户报修</el-menu-item>
      <el-menu-item index="user_info">个人信息</el-menu-item>
      <el-menu-item v-if="user.type !== '2'" index="auth">用户管理</el-menu-item>
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
        user:this.$store.state.admin.user
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
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .tab-bar {
    
  }
</style>