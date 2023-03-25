<template>
  <div>
    <div class="mydiv">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Base转码</span>
          <el-button type="primary" @click="BaseDecode">解密</el-button>
          <el-button type="primary" @click="BaseEncode">加密</el-button>
          <el-button
            type="primary"
            @click="
              BaseInput = '';
              BaseOutput = '';
            "
            >重置</el-button
          >
          <el-select
            v-model="BaseOptionsSelectedValue"
            placeholder="请选择Base编码位数"
          >
            <el-option
              v-for="item in BaseOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="编码前"
          v-model="BaseInput"
          style="width: 50%"
        >
        </el-input>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="编码后"
          v-model="BaseOutput"
          style="width: 50%"
        >
        </el-input>
      </el-card>
    </div>
    <div class="mydiv">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>URL转码</span>
          <el-button type="primary" @click="UrlDecode">解码</el-button>
          <el-button type="primary" @click="UrlEncode">编码</el-button>
          <el-button
            type="primary"
            @click="
              UrlInPut = '';
              UrlOutPut = '';
            "
            >重置</el-button
          >
        </div>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="编码前"
          v-model="UrlInPut"
          style="width: 50%"
        >
        </el-input>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 5 }"
          placeholder="编码后"
          v-model="UrlOutPut"
          style="width: 50%"
        >
        </el-input>
      </el-card>
    </div>
  </div>
</template>

<script>
import base32j from "js-base32j";
import { Buffer } from "buffer";
export default {
  data() {
    return {
      BaseInput: "",
      BaseOutput: "",
      BaseOptions: [
        {
          value: "16",
          label: "16位",
        },
        {
          value: "32",
          label: "32位",
        },
        {
          value: "64",
          label: "64位",
        },
      ],
      BaseOptionsSelectedValue: "",
      UrlInPut: "",
      UrlOutPut: "",
    };
  },
  methods: {
    BaseEncode() {
      if (this.BaseOptionsSelectedValue === "64") {
        const encoder = new TextEncoder();
        //unicode编码成UTF-8字节数组, utf-8能被ascii编码
        var data = encoder.encode(this.BaseInput);
        //binary to ascii
        this.BaseOutput = btoa(String.fromCharCode(...data));
      } else if (this.BaseOptionsSelectedValue === "32") {
        this.BaseOutput = base32j.encode(this.BaseInput);
      } else if (this.BaseOptionsSelectedValue === "16") {
        this.BaseOutput = Buffer.from(this.BaseInput, "utf8")
          .toString("hex")
          .toUpperCase();
      }
    },
    BaseDecode() {
      if (this.BaseOptionsSelectedValue === "64") {
        //反向操作
        const decoder = new TextDecoder();
        const data = atob(this.BaseOutput);
        const bytes = new Uint8Array(data.length);
        for (let i = 0; i < data.length; i++) {
          //转化为Utf-8的二进制数组
          bytes[i] = data.charCodeAt(i);
        }
        //解码Base64
        this.BaseInput = decoder.decode(bytes);
      } else if (this.BaseOptionsSelectedValue === "32") {
        this.BaseInput = base32j.decode(this.BaseOutput);
      } else if (this.BaseOptionsSelectedValue === "16") {
        this.BaseInput = Buffer.from(this.BaseOutput, "hex").toString("utf8");
      }
    },
    UrlEncode() {
      this.UrlOutPut = encodeURIComponent(this.UrlInPut);
    },
    UrlDecode() {
      this.UrlInPut = decodeURIComponent(this.UrlOutPut);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-button {
  float: right;
  margin-left: 10px;
}
.el-select {
  float: right;
  margin-left: 10px;
}
.mydiv {
  margin-bottom: 30px;
}
</style>
