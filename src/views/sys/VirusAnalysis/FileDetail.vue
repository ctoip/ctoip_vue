<template>
  <div style="width: 100%; text-align: center; display: contents">
    <table style="margin: 0 auto; width: 100%; margin-bottom: 20px">
      <tr>
        <td style="width: 70%">
          <el-input
            v-model="input"
            placeholder="请输入样本文件的SHA265值,或者在右方上传文件"
            style="width: 100%"
          ></el-input>
        </td>
        <td style="width: 5%">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getFileSummary"
            >SHA值分析</el-button
          >
        </td>
        <td style="width: 5%">
          <el-button type="primary" @click="showUploadDailog"
            >上传文件</el-button
          >
        </td>
      </tr>
    </table>

    <el-descriptions class="margin-top" title="文件总览" :column="3" border>
      <!-- <template slot="extra">
        <el-button type="text" size="small">导出CSV</el-button>
      </template> -->
      <el-descriptions-item>
        <template slot="label">文件名</template>
        {{ fileSummary.file_name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">文件大小</template>
        {{ fileSummary.file_size }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">是否白名单</template>
        {{ fileSummary.is_whitelist }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">威胁评分</template>
        {{ fileSummary.threat_score }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">病毒引擎检出</template>
        {{ fileSummary.multi_engines }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">病毒家族</template>
        {{ fileSummary.file_family }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">运行沙箱类型</template>
        {{ fileSummary.sandbox_type_list }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">SHA256</template>
        {{ fileSummary.sha256 }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">SHA1</template>
        {{ fileSummary.sha1 }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">MD5</template>
        {{ fileSummary.md5 }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">首次提交</template>
        {{ fileSummary.submit_time }}
      </el-descriptions-item>
    </el-descriptions>
    <el-dialog title="文件上传" :visible.sync="UploadDailog" width="40%">
      <el-upload
        drag
        :show-upload-list="false"
        :on-success="handleSuccess"
        methods="post"
        action="/threatbook/file/upload?apikey=5ea5eb7c777e432997a42a7dda717c2a1402def6763540f6b6a39a35f010b02a"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import _Axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      input: "",
      UploadDailog: false,
      fileSummary: {},
      threatbookApi: this.$store.state.threatbookApi,
    };
  },
  mounted() {
    this.getFileSummary();
  },
  methods: {
    getFileSummary(data) {
      var sha = "";
      if (this.UploadDailog === true) {
        sha = data;
        this.getFromApi(sha);
      } else if (this.input !== "") {
        sha = this.input;
        this.getFromApi(sha);
      } else if (sessionStorage.getItem("fileSummary")) {
        this.fileSummary = JSON.parse(sessionStorage.getItem("fileSummary"));
      }
    },
    getFromApi(sha) {
      _Axios
        .post(
          "/threatbook/file/report",
          qs.stringify({
            apikey: this.threatbookApi,
            sha256: sha,
            query_fields: "summary",
          })
        )
        .then((res) => {
          this.fileSummary = {
            file_name: res.data.data.summary.file_name,
            is_whitelist: res.data.data.summary.is_whitelist,
            threat_score: res.data.data.summary.threat_score,
            multi_engines: res.data.data.summary.multi_engines,
            file_tag: res.data.data.summary.tag.s,
            file_family: res.data.data.summary.tag.x,
            file_size: res.data.data.summary.file_size,
            sandbox_type_list: res.data.data.summary.sandbox_type_list,
            submit_time: res.data.data.summary.submit_time,
            sha1: res.data.data.summary.sha1,
            md5: res.data.data.summary.md5,
            sha256: res.data.data.summary.sample_sha256,
          };
          sessionStorage.setItem(
            "fileSummary",
            JSON.stringify(this.fileSummary)
          );
        });
    },
    handleSuccess(response, file) {
      const file_sha = response.data.sha256;
      this.getFileSummary(file_sha);
      this.UploadDailog = false;
      this.$message.success("文件上传成功");
    },
    showUploadDailog() {
      this.input = "";
      this.UploadDailog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
