import uri from 'utils/uri'
import utils from 'utils/tools'
//import { ADMIN_TYPE,ADMIN_STATU } from 'utils/enum'
/*
 @desc 创建房屋信息
 * */
function saveHouse(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.saveHouse,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
/*
 @desc 查看房屋信息列表
 * */
function getList(params) {
  return new Promise((resolve,reject)=>{
    this.$get(uri.getList,{params:params}).then(res=>{
      resolve(makeTableData(res))
    })
    .catch(err=>{
      reject(err)
    })
  })
}
/*
 @desc 查看房屋信息列表
 * */
function getUserList(params) {
  return new Promise((resolve,reject)=>{
    this.$get(uri.getUser,{params:params}).then(res=>{
      resolve(makeUserTableData(res))
    })
    .catch(err=>{
      reject(err)
    })
  })
}
/*
 @desc 删除
 * */
function deleteHouse(params) {
  return new Promise((resolve,reject)=>{
    this.$post(uri.deleteHouse,params).then(res=>{
      resolve(res)
    })
    .catch(err=>{
      reject(err)
    })
  })
}
function makeTableData(res) {
	let newObj = {
		house: [],
		length: 0
	}
  if(res.house.length>0) {
  	newObj.length = res.length
    res.house.forEach((item,index)=>{
      newObj.house.push({
        community: item.community,
        building:  item.building,
        unit:  item.unit,
        room: item.room,
        numbered:item.numbered,
        user:item.user,
        _id:item._id
      })
    })
  }
  return newObj
}
function makeUserTableData(res) {
  let newArr = []
  if(res.users.length>0) {
    res.users.forEach((item,index)=>{
      newArr.push({
        time:utils.dateFormat(item.meta.createAt),
        nickname: item.nickname,
        phoneNumber:item.phoneNumber,
        _id:item._id
      })
    })
  }
  return newArr
}
export {
  saveHouse,getList,getUserList,deleteHouse
}
