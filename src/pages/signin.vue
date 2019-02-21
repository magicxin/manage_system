<template>
  <div class="signin">
    <el-card class="signin__signinbox" shadow="hover">
      <header slot="header">
              账号注册
      </header>
      <el-form class="signin__signinform" :model="signinForm" status-icon :rules="rules" ref="signinForm">
        <el-form-item prop="username">
          <el-input type="text" v-model="signinForm.username" autocomplete="off">
            <span slot="prepend">账号</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="signinForm.password" autocomplete="off">
            <span slot="prepend">密码</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="signinForm.pass" autocomplete="off">
            <span slot="prepend">确认</span>
          </el-input>
        </el-form-item>
        <el-button class="signin__signinbtn" type="primary" @click="submitForm('signinForm')">提交</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import uri from 'utils/uri' 
  export default {
    name: 'signin',
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
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if(this.signinForm.password === this.signinForm.pass) {
          console.log(this.pass)
          callback();
        }else {
          callback(new Error('两次输入密码不一致'));
        }
      };
      return {
        signinForm: {
          username: '',
          password: '',
          pass: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          pass:[
            { validator: validatePass, trigger: 'blur' }
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
            this.$post(uri.signin,{
              username:this.signinForm.username,
              password:this.signinForm.password,
              pass:this.signinForm.pass
            }).then(res=>{
              this.$message('注册成功');
              this.$router.replace('login');
            })
            .catch(err=>{
              this.$message(err.message);
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
  .signin {
    height:100vh;
    display:flex;
    justify-content: center;
    align-items: center;
    background:#409EFF;
    &__signinbtn {
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