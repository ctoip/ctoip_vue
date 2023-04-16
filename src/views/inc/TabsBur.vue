<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="clickTab"
  >
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  name: "TabsBur",
  data() {
    return {};
  },
  computed: {
    editableTabs: {
      get() {
        return this.$store.state.menus.editableTabs;
      },
      set(val) {
        //添加动态bar
        this.$store.state.menus.editableTabs = val;
      },
    },
    editableTabsValue: {
      get() {
        return this.$store.state.menus.editableTabsValue;
      },
      set(val) {
        this.$store.state.menus.editableTabsValue = val;
      },
    },
  },
  methods: {
    //移除,官方文档
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;

      if (activeName === "Index") {
        return;
      }
      //
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      //同步vuex，过滤掉需要删除的bar项目
      this.editableTabs = tabs.filter((tab) => tab.name !== targetName);
      this.$router.push({ name: activeName });
    },
    //转到该页面
    clickTab(target) {
      this.$router.push({ name: target.name });
    },
  },
};
</script>

<style scoped></style>
