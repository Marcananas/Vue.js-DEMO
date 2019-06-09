<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <img src="../assets/6592e92861e6248205af17702d06ea3f97d81de6.png" alt="logo" class="logo">
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="item.order+''" v-for="item in menusList" :key="item.id">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/home/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
              <i class="el-icon-menu"></i>
              <span>{{subitem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span class="myicon myicon-menu toggle-btn"></span>
          <span class="system-title">电商后台管理系统</span>
          <div class="welcome">
            <span>你好：admin</span>
            <a href="javascript:;">退出</a>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getMenus } from '@/api/rights_index.js'
export default {
  data () {
    return {
      menusList: []
    }
  },
  mounted () {
    getMenus().then(response => {
      // console.log(response)
      this.menusList = response
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;

  //   .el-menu-admin:not(.el-menu--collapse) {
  //     width: 200px;
  //     min-height: 400px;
  //   }

  .logo {
    display: block;
    height: 60px;
    margin: 0 auto;
  }

  .el-container {
    height: 100%;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #d3dce6;
  }

  .el-aside {
    background-color: rgb(84, 92, 100);
    color: #333;
    //   line-height: 200px;
  }

  .system-title {
    font-size: 28px;
    color: rgb(84, 92, 100);
  }

  .welcome {
    color: rgb(84, 92, 100);
  }

  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: rgb(84, 92, 100);
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
}
</style>
