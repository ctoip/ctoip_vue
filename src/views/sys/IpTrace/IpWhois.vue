<template>
  <div>
    <div style="text-align: center">
      <el-input
        v-model="input"
        placeholder="请输入IP地址"
        style="width: 50%; margin-bottom: 15px"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="button"
        @click="getIpInfo"
        >搜索</el-button
      >
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width=""> </el-table-column>
      <el-table-column fixed prop="ip" label="IP" width="130"></el-table-column>
      <el-table-column prop="area" label="归属地" width="180"></el-table-column>
      <el-table-column
        prop="judgments"
        label="IP信誉"
        width="160"
      ></el-table-column>
      <el-table-column
        prop="is_malicious"
        label="是否为恶意IP"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="asn.orgName"
        label="ASN名称"
        width="300"
      ></el-table-column>
      <el-table-column prop="asn.orgId" label="ASNID" width="100">
      </el-table-column>
      <el-table-column prop="asn.address" label="ASN地址" width="200">
      </el-table-column>
      <el-table-column
        fixed="right"
        prop="update_time"
        label="最后更新时间"
        width="160"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button @click="checkIpInfo(scope.row.ip)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="delIpInfo(scope.row.ip)"
            >删除</el-button
          >
          <el-button type="text" size="small" @click="toCSV">导出CSV</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="JSON数据" :visible.sync="dialogVisible">
      <pre
        style="
          white-space: pre-wrap;
          background-color: #f8f8f8;
          padding: 10px;
          border-radius: 5px;
        "
        >{{ jsonMoreIpData }}</pre
      >
    </el-dialog>
  </div>
</template>
<script>
import _Axios from "axios";
import json2csv from "json2csv";
import FileSaver from "file-saver";
export default {
  methods: {
    getIpInfo() {
      if (this.input === "") {
        this.$message({
          message: "请输入IP地址",
          type: "warning",
        });
        return;
      }
      this.$axios
        .get("/IpTrace/getIpInfo?ipaddress=" + this.input)
        .then((res) => {
          this.$message({
            message: "查询成功",
            type: "success",
          });
          this.getIpInfoList();
        });
    },
    getIpInfoList() {
      this.$axios.get("/IpTrace/getIpInfoList").then((res) => {
        const JsonData = JSON.parse(res.data.data);
        this.tableData = [];
        JsonData.forEach((item) => {
          const newData = {
            ip: item.ip,
            area: item.area,
            asn: {
              orgName: item.asn.orgName,
              orgId: item.asn.orgId,
              address: item.asn.address,
            },
            judgments: item.judgments.join(" "),
            is_malicious: item.is_malicious,
            update_time: item.update_time,
          };
          this.tableData = [newData, ...this.tableData];
        });
      });
    },
    delIpInfo(ip) {
      const iplist = [];
      this.multipleSelection.forEach((value) => {
        iplist.push(value.ip);
      });
      if (iplist.length === 0) {
        this.$message({
          message: "正在删除1条数据",
          type: "warning",
        });
        this.$axios.get("/IpTrace/delIpInfo?ipaddress=" + ip).then((res) => {
          this.getIpInfoList();
        });
      } else {
        this.$message({
          message: "正在删除" + iplist.length + "条数据",
          type: "warning",
        });
        this.$axios
          .post("/IpTrace/delIpInfoList", JSON.stringify(iplist))
          .then((res) => {
            this.getIpInfoList();
          });
      }
    },
    checkIpInfo(ip) {
      _Axios.get("https://ipapi.co/" + ip + "/json/").then((res) => {
        const data = JSON.parse(JSON.stringify(res.data));
        (this.dialogVisible = true), (this.jsonMoreIpData = data);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    toCSV() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: "请选择至少2项数据",
          type: "warning",
        });
      } else {
        //转化为JSON对象数组,而不是字符串
        const selectedData = JSON.parse(JSON.stringify(this.multipleSelection));
        // 定义要导出的字段
        const fields = ["ip", "is_malicious", "update_time"];
        // 将数据转换为CSV格式
        const csv = json2csv.parse(selectedData, { fields });
        // 创建Blob对象
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        // 保存CSV文件
        FileSaver.saveAs(blob, "selectedData.csv");
        this.$message({
          message: "导出成功",
          type: "success",
        });
      }
    },
  },
  mounted() {
    this.getIpInfoList();
  },
  data() {
    return {
      jsonMoreIpData: "",
      dialogVisible: false,
      input: "",
      tableData: [],
      multipleSelection: [],
    };
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin-left: 5px;
  margin-right: 5px;
}
/deep/.el-table .warning-row {
  background: red;
}
/deep/.el-table .success-row {
  background: green;
}
</style>
