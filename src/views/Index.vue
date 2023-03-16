<template>
  <div>
    <h1 style="text-align: center">欢迎使用钓鱼邮件你攻击样本IP溯源程序</h1>
    <h4 style="text-align: center">
      本程序力志于帮助溯源人员快速的获取样本的基本信息,提供IP和Domain的查询,以及一系列方便溯源人员的工具
    </h4>
    <div v-if="dynamicDisplay">
      <iframe
        width="100%"
        height="550px"
        src="https://cybermap.kaspersky.com/cn/widget/dynamic/dark"
        frameborder="5"
      ></iframe>
    </div>
    <div v-if="staticDisplay">
      <iframe
        width="100%"
        height="550px"
        src="https://cybermap.kaspersky.com/cn/widget/static/dark"
        frameborder="5"
      ></iframe>
    </div>
    <el-button type="text" @click="display">点击切换视图</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staticDisplay: true,
      dynamicDisplay: false,
    };
  },
  methods: {
    display() {
      if (this.staticDisplay == true) {
        this.staticDisplay = false;
        this.dynamicDisplay = true;
      } else {
        this.staticDisplay = true;
        this.dynamicDisplay = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
