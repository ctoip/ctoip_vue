<template>
  <el-container>
    <el-aside width="200px">
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header>
        <header-context />
      </el-header>
      <el-main>
        <tabs-bur></tabs-bur>
        <div style="margin: 0 15px">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderContext from "./inc/HeaderContext.vue";
import SideMenu from "./inc/SideMenu.vue";
import TabsBur from "./inc/TabsBur.vue";
export default {
  components: {
    SideMenu,
    HeaderContext,
    TabsBur,
  },
};
</script>

<style lang="scss" scoped>
.el-header {
  background-color: #17b3a3;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}
.el-main {
  color: #333;
  padding: 0;
  align-items: center;
  justify-content: center;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}
</style>
