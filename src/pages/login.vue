<template>
  <div class="login">
    <el-card class="login__loginbox" shadow="hover">
      <header slot="header">
        后台管理系统
      </header>
      <el-form class="login__loginform" :model="loginForm" status-icon :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off">
            <el-button slot="prepend" icon="el-icon-news"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off">
            <el-button slot="prepend" icon="el-icon-view"></el-button>
          </el-input>
        </el-form-item>
        <div class="login__signup">注册新用户</div>
        <el-button class="login__loginbtn" type="primary" @click="submitForm('loginForm')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import uri from 'utils/uri' 
  export default {
    name: 'login',
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          callback();
        }
      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$post(uri.login).then(res=>{
              console.log(this.$router)
              this.$router.push('/home')
            })
            .catch(err=>{
//            console.log(err)
            })
          } else {
            console.log('error submit!!')
            return false;
          }
        });
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .login {
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background:#409EFF;
    &__loginbtn {
      width:100%;
    }
    &__signup {
      font-size:.8rem;
      color:#999;
      margin-bottom:.4rem;
    }
  }
  .el-card__body {
    padding:1rem 2rem;
  }
</style>