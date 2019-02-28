<template>
  <div class="house">
    <magix-control @add="add"></magix-control>
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="user.nickname" label="房主"></el-table-column>
      <el-table-column prop="community" label="小区" width="180"></el-table-column>
      <el-table-column prop="building" label="栋" width="180"></el-table-column>
      <el-table-column prop="numbered" label="加密编号" width="180"></el-table-column>
       <el-table-column prop="unit" label="单元" width="180"></el-table-column>
      <el-table-column prop="room" label="室" width="180"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small">审核</el-button>
          <el-button type="text" size="small">权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="房屋信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="小区" :label-width="formLabelWidth">
          <el-input v-model="form.community" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="栋" :label-width="formLabelWidth">
          <el-input v-model="form.building" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单元" :label-width="formLabelWidth">
          <el-input v-model="form.unit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="室" :label-width="formLabelWidth">
          <el-input v-model="form.room" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是" :label-width="formLabelWidth">
          <el-input v-model="form.numbered" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="房主" :label-width="formLabelWidth">
          <el-input v-model="form.numbered" autocomplete="off" @focus="showTable"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
    
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" highlight-current-row @current-change="getUser">
        <el-table-column property="date" label="日期" width="150"></el-table-column>
        <el-table-column property="name" label="姓名" width="200"></el-table-column>
        <el-table-column property="address" label="地址"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="checkUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import magixControl from 'components/magix-control'
  import { saveHouse,getList,getUserList } from 'controller/house'
  export default {
    name: 'house',
    components: { magixControl },
    data() {
      return {
        user:this.$store.state.admin.user,
        tableData:[],
        dialogFormVisible: false,
         formLabelWidth: '120px',
         form: {},
        editorOption: {
          // some quill options
        },
        gridData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        dialogTableVisible: false,
      }
    },
    created() {
      getList.bind(this)().then(res=>{
        console.log(res)
        this.tableData = res
      })
      getUserList.bind(this)({type:'2'}).then(res=>{
        console.log(res)
      })
    },
    methods: {
      initData(form) {
        if(form) {
            this.form = {
            community: form.community,
            building:  form.building,
            unit:  form.unit,
            room: form.room,
            numbered:form.numbered,
            userId:form.userId
          }
        }else {
          this.form = {
            community: '',
            building: '',
            unit: '',
            room: '',
            numbered:'',
            userId:'5c6f3dd08fe249093840de18'
          }
        }
      },
      add() {
        this.initData()
        this.dialogFormVisible = true
      },
      submit() {
        saveHouse.bind(this)(this.form).then(res=>{
          console.log(res)
        })
      },
      showTable() {
        this.dialogTableVisible = true
      },
      checkUser() {
        
      },
      getUser(newU,oldU) {
        console.log(newU)
      },
      onEditorBlur(quill) {
      },
      onEditorFocus(quill) {
      },
      onEditorReady(quill) {
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .house {
    
  }
</style>