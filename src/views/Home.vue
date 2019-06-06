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
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/home/user">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-check"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
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
export default {
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
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
    margin:0 auto;

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
