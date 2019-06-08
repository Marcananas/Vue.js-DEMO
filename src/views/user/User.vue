<template>
  <div class="user">
    <!-- 路径导航--面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索区域 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="query"
        class="input-with-select"
        clearable
        prefix-icon="el-icon-search"
        @input="searchUser"
      >
        <!-- <el-button slot="append" icon="el-icon-search" @click="init"></el-button> -->
      </el-input>
      <el-button type="success" plain @click="addWin = true">添加用户</el-button>
    </div>
    <!-- 数据展示区域 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column prop="username" label="姓名" width="150"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="250"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="250"></el-table-column>
      <el-table-column prop label="状态" width="60">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip class="item" effect="light" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" @click="showEdit(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="删除" placement="top">
              <el-button type="warning" icon="el-icon-delete" @click="delUser(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="light" content="分配角色" placement="top">
              <el-button type="success" icon="el-icon-finished"></el-button>
            </el-tooltip>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[4, 6, 8, 12]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑用户" :visible.sync="editWin">
      <el-form :model="form" :label-width="'120px'">
        <el-form-item label="用户名">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="off" prop="email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile" autocomplete="off" prop="mobile"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editUser">确 定</el-button>
        <el-button @click="editWin = false">取 消</el-button>
      </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 添加用户弹窗 -->
    <el-dialog title="添加用户" :visible.sync="addWin">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">提 交</el-button>
        <el-button @click="addWin = false">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList, putUser, deleteUser, postNewUser } from '@/api/index.js'
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userSwitch: true,
      tableData: [],
      pagesize: 4,
      pagenum: 1,
      query: '',
      total: 5,
      editWin: false,
      addWin: false,
      // 编辑用表单
      form: {
        id: '',
        username: '',
        mobile: '',
        email: ''
      },
      // 添加用表单
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单验证
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 刷新列表
    init () {
      // 发起axios获取列表内容
      getUserList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(response => {
        // console.log(response)
        this.tableData = response.data.users
        this.total = response.data.total
        this.pagenum = response.data.pagenum
      })
    },
    // 清除搜索
    searchUser () {
      this.pagenum = 1
      this.init()
    },
    // 发起axios添加用户
    addUser () {
      postNewUser(this.ruleForm).then(response => {
        console.log(response)
        this.addWin = false
        this.init()
      })
    },
    // 显示编辑弹窗内容
    showEdit (data) {
      this.editWin = true
      this.form.id = data.id
      this.form.username = data.username
      this.form.mobile = data.mobile
      this.form.email = data.email
      // console.log(this.form)
    },
    // 发起axios更改用户数据
    editUser () {
      putUser(this.form).then(response => {
        console.log(response)
        this.editWin = false
        this.init()
      })
    },
    // 发起axios删除用户
    delUser (id) {
      // console.log(id)
      deleteUser(id).then(response => {
        // console.log(response)
        if ((this.total - 1) / this.pagesize === this.pagenum) {
          this.pagenum -= 1
        }
        this.init()
      })
    },
    // 更改每页条目数
    handleSizeChange (val) {
      //   console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    // 更改页数
    handleCurrentChange (val) {
      //   console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    }
  },
  mounted () {
    // 页面加载同时加载列表数据
    this.init()
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 300px;
  margin: 0 10px 15px 0;
}
.el-pagination {
  margin-top: 15px;
}
</style>
