import uri from 'utils/uri'
import utils from 'utils/tools'
//import { ADMIN_TYPE,ADMIN_STATU } from 'utils/enum'
/*
 @desc 查看房屋信息列表
 * */
let status = ['已创建','进行中','已完成']
function getList(params) {
  return new Promise((resolve,reject)=>{
    this.$get(uri.fixList,{params:params}).then(res=>{
      resolve(makeTableData(res))
    })
    .catch(err=>{
      reject(err)
    })
  })
}

function makeTableData(res) {
  let newObj = {
    fix: [],
    length: 0
  }
  if(res.fix.length>0) {
    newObj.length = res.length
    res.fix.forEach((item,index)=>{
      console.log(item)
      newObj.fix.push({
        address: item.address,
        phoneNumber:  item.phoneNumber,
        truble:  item.truble,
        createAt: item.meta.createAt,
        updateAt:item.meta.updateAt,
        statu: {
          value:item.statu,
          title:status[item.statu]
        },
        user:item.user,
        _id:item._id
      })
    })
  }
  return newObj
}

function deleteFix(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.deleteFix,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

/*
 @desc 审核 ，将状态改为 1 处理中
 * */
function save(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.saveFix,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
export {
  getList,deleteFix,save
}
