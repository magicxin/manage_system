<template>
  <div class="magix-aside">
    <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>-->
    <el-menu :default-active="onRoute" class="el-menu-vertical" @open="handleOpen" @close="handleClose" @select="handleSelect"
      background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
      <el-menu-item index="user_info">
        <i class="el-icon-document"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="reset_password">
        <i class="el-icon-setting"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import uri from 'utils/uri'   
  export default {
    name: 'magix_aside',
    data() {
      return {
        isCollapse: false
      }
    },
    created() {
      console.log(this.$store.state.admin.user)
    },
    computed: {
      onRoute() {
        return this.$route.name
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$router.push(key)
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .magix-aside {
    .el-menu {
      padding:0;
    }
    .el-menu-vertical {
      height:100%;
    }
  }
</style>