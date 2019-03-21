<template>
  <div class="news">
    <magix-control @add="add"></magix-control>
    <div class="container">
      <el-card class="box-card" v-for="(item,index) in news" :key="index" @click.native="openDetail(item)">
        <div slot="header">
          <span class="title">{{ item.title }}</span>
        </div>
        <div class="box-content">
          <p class="sub">{{ item.sub }}</p>
          <div class="foot">
            <span class="author">{{ item.user&&item.user.nickname }}</span>
            <time class="time">{{ item.meta.updateAt|dateFormat }}</time>
          </div>
        </div>
        <i class="el-icon-error delete" @click.stop="deleteNews(item)"></i>
      </el-card>
      <div class="empty" v-if="news.length === 0">暂无数据</div>
    </div>
    <el-pagination class="pagination" background layout="prev, pager, next" :total="length" @current-change="currentChange"></el-pagination>
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
          <quill-editor class="editor" v-model="form.content"
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
  import utils from 'utils/tools'
  import uri from 'utils/uri'
  import magixControl from 'components/magix-control'
  import { saveNews,searchNews,deleteNews } from 'controller/news'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'utils/quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
  
  export default {
    name: 'news',
    components: { magixControl,quillEditor },
    filters: {
      dateFormat(d) {
        return utils.dateFormat(d)
      }
    },
    data() {
      return {
        user:this.$store.state.admin.user,
        news:[],
        length:0,
        dialogFormVisible: false,
         formLabelWidth: '120px',
         form: {},
        editorOption: {
          // some quill options
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: uri.upload,
              response: (res) => {
                return res.data
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    // 初始化
    mounted() {
      searchNews.bind(this)({count:10,index:0}).then(res=>{
        console.log(this)
        this.news = res.news.slice(0,10)
        this.length = res.length
      },err=>{
        console.log(err)
      })
    },
    methods: {
    	// 初始化form表单
      initData(form) {
        if(form) {
            this.form = {
            title: form.title,
            type:  form.type,
            sub:  form.sub,
            content: form.content,
            images: form.images,
            _id:form._id
          }
        }else {
          this.form = {
            title: '',
            type: '',
            sub: '',
            content: '',
            images: '',
            _id:''
          }
        }
        
      },
      // 新增资讯
      add() {
        this.initData()
        this.dialogFormVisible = true
      },
      // 查看资讯详情
      openDetail(form) {
        this.initData(form)
        this.dialogFormVisible = true
      },
      onEditorBlur(quill) {
      },
      onEditorFocus(quill) {
        
      },
      onEditorReady(quill) {
        
      },
      // 保存按钮
      submit() {
        this.dialogFormVisible = false
        saveNews.bind(this)({
          title : this.form.title,
          sub : this.form.sub,
          images : this.form.images,
          content : this.form.content,
          type : this.form.type,
          userId: this.user._id,
          _id:this.form._id,
        }).then(res=>{
//        this.news = res
        })
      },
      deleteNews(item) {
        console.log(item)
        this.deleteMsg('此操作将永久删除该文件, 是否继续?').then(()=>{
          deleteNews.bind(this)({_id:item._id}).then(res=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        })
        
      },
      getList(i) {
        searchNews.bind(this)({count:10,index:i-1}).then(res=>{
        this.news = res.news.slice(0,10)
      })
      },
      currentChange(i) {
        console.log(i)
        this.getList(i)
      },
//    open2() {
//      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//        confirmButtonText: '确定',
//        cancelButtonText: '取消',
//        type: 'warning'
//      }).then(() => {
//        this.$message({
//          type: 'success',
//          message: '删除成功!'
//        });
//      }).catch(() => {
//        this.$message({
//          type: 'info',
//          message: '已取消删除'
//        });          
//      });
//    }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .news {
    display:flex;
    flex-flow:column;
    .container {
      display:flex;
      flex-wrap: wrap;
      flex-grow: 1;
      padding:2rem;
    }
    .box-card {
      position:relative;
      width:15%;
      height:16vw;
      margin-right:4rem;
      .title {
       font-weight: bold;
       font-size: 16px;
      }
      .sub {
        flex-grow: 1;
      }
      .foot {
        width:100%;
        position:absolute;
        bottom:0;
        left:0;
        display:flex;
        justify-content: space-between;
        padding:20px;
      }
      .delete {
        cursor: pointer;
        position:absolute;
        right:10px;
        top:10px;
        font-size: 25px;
        color: #666;
        z-index:10;
      }
    }
    .box-content {
      display:flex;
      flex-flow:column;
    }
    .pagination {
      padding:1rem 1rem 3rem 1rem;
      text-align: center;
    }
    .editor {
      height:280px;
      margin-bottom:4rem;
    }
    .ql-editor{
      height:100%;
      overflow-y: scroll;
    }
  }
</style>