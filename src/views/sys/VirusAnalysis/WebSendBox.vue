<template>
  <div>
    <el-button type="primary" @click="getFileAnalysis" style="width: 100%"
      >刷新数据</el-button
    >
    <el-collapse accordion @change="getData" v-model="activeNames">
      <el-collapse-item name="signatrue">
        <template slot="title">
          <h3>文件行为 Signatrue</h3>
        </template>
        <!--  -->
        <el-collapse v-for="a in this.Signatrue">
          <el-collapse-item>
            <template slot="title">
              <h5>{{ a.label }}</h5>
            </template>
            <pre
              style="
                white-space: pre-wrap;
                background-color: #f8f8f8;
                padding: 10px;
                border-radius: 5px;
              "
            >
            {{ a.context }}</pre
            >
          </el-collapse-item>
        </el-collapse>
        <!--  -->
      </el-collapse-item>
      <el-collapse-item name="dropped">
        <template slot="title">
          <h3>释放文件 Dropped</h3>
        </template>
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
          "
          >{{ this.Dropped }}</pre
        >
      </el-collapse-item>
      <el-collapse-item name="network">
        <template slot="title">
          <h3>网络 Network</h3>
        </template>
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
          "
          >{{ this.Network }}</pre
        >
      </el-collapse-item>
      <el-collapse-item name="pstree">
        <template slot="title">
          <h3>进程信息 Pstree</h3>
        </template>
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
          "
          >{{ this.pstree }}</pre
        >
      </el-collapse-item>
      <el-collapse-item name="strings">
        <template slot="title">
          <h3>静态字符串 Strings</h3>
        </template>
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
          "
          >{{ this.strings }}</pre
        >
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import _Axios from "axios";
export default {
  data() {
    return {
      pstree: {},
      strings: {},
      activeNames: "",
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      Signatrue: [],
      Network: "",
      Dropped: "",
      threatbookApi: this.$store.state.threatbookApi,
    };
  },
  computed: {
    sha256: {
      get() {
        if (sessionStorage.getItem("fileSummary") === null) {
          return null;
        }
        return JSON.parse(sessionStorage.getItem("fileSummary")).sha256;
      },
    },
    FileAnalysis: {
      get() {
        return JSON.parse(sessionStorage.getItem("FileAnalysis"));
      },
    },
  },
  methods: {
    getData() {
      this.data = [];
      if (this.activeNames === "signatrue") {
        var arrays = [];
        this.Signatrue = [];
        arrays = this.FileAnalysis.signature;
        for (var i = 0; i < arrays.length; i++) {
          const newData = {
            label: JSON.parse(arrays[i].description).cn,
            context: JSON.stringify(arrays[i].marks),
          };
          this.Signatrue = [newData, ...this.Signatrue];
        }
      } else if (this.activeNames === "dropped") {
        this.Dropped = this.FileAnalysis.dropped;
      } else if (this.activeNames === "network") {
        this.Network = this.FileAnalysis.network;
      } else if (this.activeNames === "pstree") {
        this.pstree = this.FileAnalysis.pstree;
      } else if (this.activeNames === "strings") {
        this.strings = this.FileAnalysis.strings;
      }
    },
    getFileAnalysis() {
      if (this.sha256 !== null) {
        this.getFromApi();
        this.$message.success("取出数据");
        //只有sha265
      } else {
        //什么有没有
        this.$message.warning("请先在样本详情中输入sha256或上传文件");
      }
    },
    getFromApi() {
      _Axios
        .get("/threatbook/file/report", {
          params: {
            apikey: this.threatbookApi,
            sha256: this.sha256,
            query_fields: "signature,dropped,network,pstree,strings",
          },
        })
        .then((res) => {
          sessionStorage.setItem("FileAnalysis", JSON.stringify(res.data.data));
        });
    },
  },
  mounted() {
    this.getFileAnalysis();
  },
};
</script>

<style lang="scss" scoped>
.el-tree-node__content {
  width: 200px;
}

.el-tree-node__label {
  word-break: break-all;
}
</style>
