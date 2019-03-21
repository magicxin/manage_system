<template>
  <div class="reset-password">
    <el-card class="box-card">
      <el-form class="userform" ref="form" :model="form" label-width="100px">
        <el-form-item label="旧密码：">
          <el-input v-model="form.old_pass"></el-input>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input v-model="form.new_pass"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：">
          <el-input v-model="form.new_repass"></el-input>
        </el-form-item>
        <div class="save-btn">
          <el-button type="primary" @click="save">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import magixAside from 'components/magix-aside'
  import { resetPassword } from 'controller/auth'
  export default {
    name: 'reset_password',
    components: { magixAside },
    data() {
      return {
        user:this.$store.state.admin.user,
        form: {
          old_pass:'',
          new_pass:'',
          new_repass:''
        }
      }
    },
    created() {
      
    },
    methods: {
      save() {
        resetPassword.bind(this)(Object.assign({},this.form,{username:this.user.username})).then(res=>{
          this.$message('修改成功,请重新登录！')
          this.$store.commit('admin/signout')
        })
        .catch(err=>{
          
        })
      },
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