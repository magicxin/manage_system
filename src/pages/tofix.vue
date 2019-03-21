<template>
  <div class="tofix">
    <magix-control></magix-control>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="user.nickname" label="房主"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column prop="phoneNumber" label="联系电话"></el-table-column>
      <el-table-column prop="truble" label="问题描述"></el-table-column>
      <el-table-column prop="statu.title" label="状态"></el-table-column>
      <el-table-column prop="createAt" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--<el-button type="text" size="small">查看</el-button>-->
          <el-button v-if="scope.row.statu.value === '0'" type="text" size="small" @click="updateFix(scope.row._id)">审核</el-button>
          <el-button type="text" size="small" @click="deleteFix(scope.row._id)">删除</el-button>
          <!--<el-button type="text" size="small">权限</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    
    <el-pagination class="pagination" background layout="prev, pager, next" :total="length" @current-change="currentChange"></el-pagination>
  </div>
</template>

<script>
  import magixControl from 'components/magix-control'
  import { getList,deleteFix,save } from 'controller/fix'
  export default {
    name: 'tofix',
    components: { magixControl },
    data() {
      return {
        tableData:[],
        length:0,
        count:10
      }
    },
    created() {
      this.init()
    },
    methods: {
      init(params) {
        getList.bind(this)(Object.assign({},{count:this.count,index:0},params)).then(res=>{
          this.tableData = res.fix
          console.log(this.tableData)
          this.length = res.length
        })
      },
      deleteFix(id) {
        console.log(id)
        this.deleteMsg('此操作将永久删除该文件, 是否继续?').then(()=>{
          deleteFix.bind(this)([id]).then(res=>{
            this.init()
            this.$message('删除成功！')
          })
          .catch(err=>{
            this.$message(err.message);
          })
        })
      },
      updateFix(id) {
        console.log(id)
        this.$confirm('请确保已指派相关人员上门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          save.bind(this)({fixId:id,statu:'1'})
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.init()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作取消！'
          });          
        });
      },
      currentChange(i) {
        console.log(i)
        this.init({count:this.count,index:i-1})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .tofix {
    .pagination {
      padding:1rem 1rem 3rem 1rem;
      text-align: center;
    }
  }
</style>