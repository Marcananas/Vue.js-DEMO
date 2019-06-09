<template>
  <div class="right">
    <!-- 路径导航--面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table
    :data="rightList"
    border
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      prop="level"
      label="层级">
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import { getRights } from '@/api/rights_index.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    this.getRights()
  },
  methods: {
    async getRights () {
      let response = await getRights('list')
      this.rightList = response.data.data
      // console.log(this.rightList)
    }
  }
}
</script>
