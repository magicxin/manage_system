<template>
  <div class="news">
    <magix-control @add="add"></magix-control>
    <el-dialog title="小区资讯" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="资讯标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资讯类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择资讯类型">
            <el-option label="租赁" value="1"></el-option>
            <el-option label="新鲜事" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="副标题" :label-width="formLabelWidth">
          <el-input v-model="form.sub" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="正文" :label-width="formLabelWidth">
          <quill-editor v-model="form.content"
                ref="myQuillEditor"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
          </quill-editor>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import magixControl from 'components/magix-control'
  import { createNews,searchNews } from 'controller/news'
  export default {
    name: 'news',
    components: { magixControl },
    data() {
      return {
        user:this.$store.state.admin.user,
        dialogFormVisible: false,
         formLabelWidth: '120px',
         form: {
          title: '',
          type: '', // 1 租赁 2 新鲜事
          sub: '',
          content:'',
          images:[]
        },
        content: '',
        editorOption: {
          // some quill options
        }
      }
    },
    mounted() {
      searchNews.bind(this)({type:'1'}).then(res=>{
        console.log(res)
      })
    },
    methods: {
      add() {
        this.dialogFormVisible = true
      },
      onEditorBlur(quill) {
      },
      onEditorFocus(quill) {
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        
      },
      submit() {
        this.dialogFormVisible = false
        createNews.bind(this)({
          title : this.form.title,
          sub : this.form.sub,
          images : this.form.images,
          content : this.form.content,
          type : this.form.type,
          userId: this.user._id
        }).then(res=>{
          console.log(res)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .news {
    
  }
</style>