<template>
  <div class="user-info">
    <el-card class="box-card">
      <el-form class="userform" ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名：">
          <span>{{ form.username }}</span>
        </el-form-item>
        <el-form-item label="昵称：">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <span>{{ form.password }}</span>
        </el-form-item>
        <el-form-item label="车牌号：">
          <el-input v-model="form.carNum"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <span>{{ form.address }}</span>
        </el-form-item>
        <el-form-item label="权限：">
          <span>{{ form.type.name }}</span>
        </el-form-item>
        <div class="save-btn">
          <el-button type="primary" @click="">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'user_info',
    data() {
      return {
        form: {}
      }
    },
    created() {
      let user = this.$store.state.admin.user
      console.log(user)
      this.form = {
        username:user.username,
        nickname:user.nickname,
        password: user.password,
        carNum:user.car&&user.car.carNum || '',
        address:user.house&&user.house.address || '',
        type:user.type
      }
    },
    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .user-info {
    .userform {
      
    }
    .save-btn {
      text-align: center;
    }
  }
  .box-card {
    width:50%;
    margin:5rem;
    padding:2rem;
  }
</style>