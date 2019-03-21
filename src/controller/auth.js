import uri from 'utils/uri'
import utils from 'utils/tools'
import { ADMIN_TYPE,ADMIN_STATU } from 'utils/enum'
/*
 @desc 获取用户列表
 * */
function getUser(type) {
  return new Promise((resolve,reject)=>{
    this.$get(uri.getUser,{params:{type:type}}).then(res=>{
      resolve(makeData(res))
    })
    .catch(err=>{
      reject(err)
    })
  })
}
function makeData(res) {
  let newArr = []
  if(res.users.length>0) {
    res.users.forEach((item,index)=>{
      newArr.push({
        username:item.username,
        name:item.nickname,
        address:item.house&&item.house.address || '-',
        date:utils.dateFormat(item.meta.createAt),
        type:{
          name:ADMIN_TYPE[item.type],
          value:item.type
        },
        statu:{
          name:ADMIN_STATU[item.statu],
          value:item.statu
        },
      })
    })
  }
  return newArr
}

/*
 @desc 审核用户
 * */
function checkUser(username) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.checkUser,{username:username}).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

/*
 @desc 修改用户权限
 * */
function changeAuth(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.changeAuth,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
/*
 @desc 更改用户信息
 * */
function update(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.update,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

/*
 @desc 修改密码
 * */
function resetPassword(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.resetPassword,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}

export {
  getUser,
  checkUser,
  changeAuth,
  update,
  resetPassword
}
