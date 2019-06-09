import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  var token = localStorage.getItem('itcastpro_token')
  if (token) {
    // 2.在发送请求的时候传递token
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 实现登陆验证
export const login = (obj) => {
  // axios.post是一个promise对象
  //  .then返回的还是一个promise对象
  return axios.post('login', obj)
    .then((result) => {
      // then的回调函数中的返回值最终会返回到这个对象的then方法中
      return result.data
    })
}

// 获取用户数据列表
export const getUserList = (obj) => {
  return axios.get('users', { params: obj }).then(response => {
    return response.data
  })
}
// 添加用户数据
export const postNewUser = (obj) => {
  return axios.post('users', obj).then(response => {
    return response
  })
}
// 更改用户状态
export const putType = (uId, type) => {
  return axios.put(`users/${uId}/state/${type}`).then(response => {
    return response
  })
}
// 更改用户数据
export const putUser = (obj) => {
  return axios.put(`users/${obj.id}`, obj).then(response => {
    return response
  })
}

// 删除用户数据
export const deleteUser = (id) => {
  return axios.delete(`users/${id}`).then(response => {
    return response
  })
}

// 分配用户角色
export const putRole = obj => {
  return axios.put(`users/${obj.id}/role`, { rid: obj.rid }).then(response => {
    return response
  })
}
