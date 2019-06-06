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
      <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="init"></el-button>
      </el-input>
      <el-button type="success" plain @click="clear">清除搜索</el-button>
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
        <el-button-group>
          <el-tooltip class="item" effect="light" content="编辑" placement="top">
            <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="删除" placement="top">
            <el-button type="warning" icon="el-icon-delete"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="light" content="分配角色" placement="top">
            <el-button type="success" icon="el-icon-finished"></el-button>
          </el-tooltip>
        </el-button-group>
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
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/index.js'
export default {
  data () {
    return {
      userSwitch: true,
      tableData: [],
      pagesize: 5,
      pagenum: 1,
      query: '',
      total: 5,
      dialogFormVisible: false,
      form: {
        username: '',
        mobile: '',
        email: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    init () {
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
    clear () {
      this.query = ''
      this.pagenum = 1
      this.init()
    },
    handleSizeChange (val) {
      //   console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      //   console.log(`当前页: ${val}`)
      this.pagenum = val
      this.init()
    }
  },
  mounted () {
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
