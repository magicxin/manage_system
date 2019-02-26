import uri from 'utils/uri'
import utils from 'utils/tools'
//import { ADMIN_TYPE,ADMIN_STATU } from 'utils/enum'
/*
 @desc 创建资讯
 * */
function saveNews(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.saveNews,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
/*
 @desc 查询资讯
 * */
function searchNews(params) {
  return new Promise((resolve,reject)=>{
    this.$get(uri.searchNews,{params:params}).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
/*
 @desc 删除资讯
 * */
function deleteNews(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.deleteNews,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
//function makeData(res) {
//let newArr = []
//
//return newArr
//}

export {
  saveNews,
  searchNews,
  deleteNews
}
