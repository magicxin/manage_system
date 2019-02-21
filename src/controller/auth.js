import uri from 'utils/uri'
import utils from 'utils/tools'
/*
 @desc 获取用户列表
 * */
function getUser() {
  return new Promise((resolve,reject)=>{
    this.$get(uri.getUser).then(res=>{
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
        name:item.nickname,
        address:item.house&&item.house.address || '-',
        date:utils.dateFormat(item.meta.createAt),
        type:item.type.name,
        statu:item.statu.name
      })
    })
  }
  return newArr
}
export {
  getUser
}
