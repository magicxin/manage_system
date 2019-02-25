import uri from 'utils/uri'
import utils from 'utils/tools'
//import { ADMIN_TYPE,ADMIN_STATU } from 'utils/enum'
/*
 @desc 创建资讯
 * */
function createNews(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.createNews,params).then(res=>{
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
//function makeData(res) {
//let newArr = []
//
//return newArr
//}

export {
  createNews,
  searchNews
}
