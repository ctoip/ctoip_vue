<template>
  <div>
    <div style="text-align: center">
      <el-input
        v-model="input"
        placeholder="请输入域名"
        style="width: 50%; margin-bottom: 15px"
      ></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        class="button"
        @click="getDomainInfo"
        >搜索</el-button
      >
    </div>
    <el-table
      :data="tableData"
      border
      style="width: 100%; margin: auto"
      @selection-change="handleSelectionChange"
    >
      <el-table-column fixed type="selection" width="50"> </el-table-column>
      <el-table-column
        fixed
        prop="domain"
        label="域名"
        width="200"
      ></el-table-column>
      <el-table-column
        prop="last_dns_records"
        label="解析(方式|主机名|TTL)"
        width="400"
      >
        <template slot-scope="{ row }">
          <div
            class="cell-wrapper"
            v-html="row.last_dns_records.replace(/-/g, '<br>')"
          ></div>
        </template>
      </el-table-column>
      <el-table-column
        prop="malicious"
        label="恶意检出数量"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="suspicious"
        label="可疑检出数量"
        width="100"
      ></el-table-column>
      <el-table-column prop="categories" label="检出标记" width="250">
        <template slot-scope="{ row }">
          <div
            class="cell-wrapper"
            v-html="row.categories.replace(/\|/g, '<br>')"
          ></div> </template
      ></el-table-column>
      <el-table-column
        prop="registrar"
        label="域名服务商"
        width="150"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            @click="checkDomainWhois(scope.row.whois)"
            type="text"
            size="small"
            >Whois</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="delDomainInfo(scope.row.domain)"
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
        >{{ DomainWhoisData }}</pre
      >
    </el-dialog>
  </div>
</template>

<script>
import json2csv from "json2csv";
import FileSaver from "file-saver";
export default {
  data() {
    return {
      DomainWhoisData: "",
      dialogVisible: false,
      input: "",
      tableData: [],
      multipleSelection: [],
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getDomainInfo() {
      if (this.input === "") {
        this.$message({
          message: "请输入域名",
          type: "warning",
        });
        return;
      }
      this.$axios
        .get("/DomainQuery/DomainInfo?domain=" + this.input)
        .then((res) => {
          this.$message({
            message: "查询成功",
            type: "success",
          });
          this.getDomainInfoList();
        });
    },
    getDomainInfoList() {
      this.$axios.get("/DomainQuery/getDomainInfoList").then((res) => {
        const JsonData = JSON.parse(res.data.data);
        this.tableData = [];
        JsonData.forEach((item) => {
          const newData = {
            domain: item.domain,
            last_dns_records: item.last_dns_records,
            malicious: item.malicious,
            suspicious: item.suspicious,
            registrar: item.registrar,
            categories: item.categories,
            whois: item.whois,
          };
          this.tableData = [newData, ...this.tableData];
        });
      });
    },
    delDomainInfo(domain) {
      const domainlist = [];
      this.multipleSelection.forEach((value) => {
        domainlist.push(value.domain);
      });
      if (domainlist.length === 0) {
        console.log(1);
        this.$message({
          message: "正在删除1条数据",
          type: "warning",
        });
        this.$axios
          .get("/DomainQuery/delDomainInfo?domain=" + domain)
          .then((res) => {
            this.getDomainInfoList();
          });
      } else {
        this.$message({
          message: "正在删除" + domainlist.length + "条数据",
          type: "warning",
        });
        this.$axios
          .post("/DomainQuery/delDomainInfoList", JSON.stringify(domainlist))
          .then((res) => {
            this.getDomainInfoList();
          });
      }
    },
    checkDomainWhois(data) {
      this.dialogVisible = true;
      this.DomainWhoisData = data;
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
        const fields = [
          "domain",
          "last_dns_records",
          "malicious",
          "suspicious",
          "registrar",
          "categories",
        ];
        // 将数据转换为CSV格式
        const csv = json2csv.parse(selectedData, { fields });
        // 创建Blob对象
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
        // 保存CSV文件
        FileSaver.saveAs(blob, "selectedDomainData.csv");
        this.$message({
          message: "导出成功",
          type: "success",
        });
      }
    },
  },
  mounted() {
    this.getDomainInfoList();
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
