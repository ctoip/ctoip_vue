<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Nmap</span>
        <el-button
          style="float: right"
          type="primary"
          @click="nmap"
          :loading="nmapStatus"
          >执行</el-button
        >
      </div>
      <el-input
        v-model="nmapInput"
        placeholder="请输入nmap的参数(例如:-Ss 192.168.50.100)"
      ></el-input>
      <pre
        style="
          white-space: pre-wrap;
          background-color: #f8f8f8;
          padding: 10px;
          border-radius: 5px;
        "
        >{{ this.nmapResult }}</pre
      >
    </el-card>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      nmapStatus: false,
      nmapInput: "-sP 121.4.173.142",
      nmapResult: { 0: "返回结果" },
    };
  },
  methods: {
    nmap() {
      this.nmapStatus = true;
      this.$axios
        .get("/netTools/nmap", {
          params: {
            command: this.nmapInput,
          },
        })
        .then((res) => {
          this.nmapResult = JSON.parse(res.data.data);
          this.nmapStatus = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
