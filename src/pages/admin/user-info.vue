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
        <!--<el-form-item label="密码：">
          <span>{{ form.password }}</span>
        </el-form-item>-->
        <el-form-item label="车牌号：">
          <el-input v-model="form.carNum"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="权限：">
          <span>{{ ADMIN_TYPE[form.type] }}</span>
        </el-form-item>
        <div class="save-btn">
          <el-button type="primary" @click="update">保存</el-button>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { ADMIN_TYPE,ADMIN_STATU } from 'utils/enum'
  import { update } from 'controller/auth'
  export default {
    name: 'user_info',
    data() {
      return {
        form: {},
        ADMIN_TYPE,
        user: this.$store.state.admin.user,
      }
    },
    created() {
      this.form = {
        username:this.user.username,
        nickname:this.user.nickname,
        password: this.user.password,
        carNum:this.user.car&&this.user.car.carNumber || '',
        address:this.user.house&&this.user.house.address || '',
        type:this.user.type
      }
    },
    methods: {
      update() {
      	this.$confirm('所有修改将保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        	update.bind(this)({
	          username:this.user.username,
	          nickname:this.form.nickname,
	          car:{carNumber:this.form.carNum},
	          house:{address:this.form.address}
	        }).then(res=>{
	          this.$store.commit('admin/updateUser',res.user)
	          this.$message('保存成功')
	        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更改'
          });          
        });
      }
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
    .box-card {
      width:50%;
      margin:5rem;
      padding:2rem;
    }
  }
  
</style>