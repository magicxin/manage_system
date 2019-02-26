<template>
  <div class="reset-password">
    <el-card class="box-card">
      <el-form class="userform" ref="form" :model="form" label-width="100px">
        <el-form-item label="新密码：">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="form.pass"></el-input>
        </el-form-item>
        <div class="save-btn">
          <el-button type="primary" @click="">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import magixAside from 'components/magix-aside'
  export default {
    name: 'reset_password',
    components: { magixAside },
    data() {
      return {
        form: {}
      }
    },
    created() {
      
    },
    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .reset-password {
    flex-grow: 1;
    display:flex;
    .save-btn {
      text-align: center;
    }
    .box-card {
      width:50%;
      margin:5rem;
      padding:2rem;
    }
  }
</style>