<template>
  <div class="wel">
    <el-carousel indicator-position="inside" height="830px">
      <el-carousel-item v-for="item in imgUrls" :key="item.id">
        <img :src="item.view" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrls: [
        { id: 1, view: require('../assets/_DSC0987-.jpg') },
        { id: 2, view: require('../assets/_DSC1042-.jpg') },
        { id: 3, view: require('../assets/_DSC1079-.jpg') },
        { id: 4, view: require('../assets/_DSC1106-.jpg') }
      ]
    }
  }
}
</script>

<style lang="less" scoped>

  .el-carousel__item:nth-child(2n) {
  //   background-image: url('../assets/_DSC8755-.jpg');
  // background-position: top;
  // background-repeat:no-repeat;
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img{
    height:100% ;
  }
</style>
