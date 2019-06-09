<template>
  <div class="role">
    <!-- 路径导航--面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
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
      <el-button type="success" plain @click="addWin = true">添加角色</el-button>
    </div>
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row :gutter="20" v-for="tag in props.row.children" :key="tag.id" style='margin-top:15px;border-bottom:1px dashed #ccc'>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-tag closable type="info">{{tag.authName}}</el-tag>
              </div>
            </el-col>
            <el-col :span="20">
              <el-row :gutter="20"  v-for="tag2 in tag.children" :key="tag2.id">
                <el-col :span="6">
                  <div class="grid-content bg-purple">
                      <el-tag closable type="success">{{tag2.authName}}</el-tag>
                  </div>
                </el-col>
                <el-col :span="18">
                  <div class="grid-content bg-purple" style="display:inline-block"  v-for="tag3 in tag2.children" :key="tag3.id">
                      <el-tag closable type="danger">{{tag3.authName}}</el-tag>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getRoles } from '@/api/roles_index.js'
export default {
  data () {
    return {
      query: '',
      addWin: false,
      roleList: []
    }
  },
  methods: {
    searchUser () {}
  },
  mounted () {
    getRoles().then(response => {
      console.log(response)
      this.roleList = response.data
    })
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
