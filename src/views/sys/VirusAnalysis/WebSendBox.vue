<template>
  <div>
    <el-button type="text" @click="getFileAnalysis">刷新数据</el-button>
    <el-collapse accordion @change="getData" v-model="activeNames">
      <el-collapse-item title="文件行为 Signatrue" name="signatrue">
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
          "
        ><el-tree :data="data" :props="defaultProps" default-expand-all></el-tree></pre>
      </el-collapse-item>
      <el-collapse-item title="释放文件 Dropped" name="dropped">
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
          "
        ><el-tree :data="data" :props="defaultProps" default-expand-all></el-tree></pre>
      </el-collapse-item>
      <el-collapse-item title="网络 Network" name="network">
        <pre
          style="
            white-space: pre-wrap;
            background-color: #f8f8f8;
            padding: 10px;
            border-radius: 5px;
          "
        ><el-tree :data="data" :props="defaultProps" default-expand-all></el-tree></pre>
      </el-collapse-item>
      <el-collapse-item title="进程信息 Pstree" name="pstree">
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
      <el-collapse-item title="静态字符串 Strings" name="strings">
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
import qs from "qs";
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
        arrays = this.FileAnalysis.signature;
        for (var i = 0; i < arrays.length; i++) {
          this.data.push({
            label: i + 1 + " " + JSON.parse(arrays[i].description).cn,
          });
        }
      } else if (this.activeNames === "dropped") {
        var arrays = [];
        arrays = this.FileAnalysis.dropped;
        for (var i = 0; i < arrays.length; i++) {
          this.data.push({
            label: arrays[i].filepath,
            children: [
              {
                label: "威胁等级: " + arrays[i].threat_level,
              },
              {
                label: "sha256: " + arrays[i].sha256,
              },
              {
                label: "运行环境: " + arrays[i].type,
              },
            ],
          });
        }
      } else if (this.activeNames === "network") {
        var obj = this.FileAnalysis.network;
        for (let key in obj) {
          if (this.FileAnalysis.network[key].length !== 0) {
            let i = 1;
            for (let a in obj[key]) {
              this.data.push({
                label: key,
                children: [{ label: JSON.stringify(obj[key][a]) }],
              });
              i++;
            }
          }
        }
      } else if (this.activeNames === "pstree") {
        this.pstree = this.FileAnalysis.pstree;
      } else if (this.activeNames === "strings") {
        this.strings = this.FileAnalysis.strings;
      }
    },
    getFileAnalysis() {
      if (this.sha256 !== null) {
        this.getFromApi();
        this.$message.success("以从云端取出数据");
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
            apikey:
              "5ea5eb7c777e432997a42a7dda717c2a1402def6763540f6b6a39a35f010b02a",
            sha256: this.sha256,
            query_fields: "signature,dropped,network,pstree,strings",
          },
        })
        .then((res) => {
          sessionStorage.setItem("FileAnalysis", JSON.stringify(res.data.data));
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>
