<template>
  <el-dialog title="修改密码" :visible.sync="passdialog" width="40%">
    <el-form
      :model="passForm"
      status-icon
      :rules="rules"
      ref="passForm"
      label-width="100px"
    >
      <el-form-item label="旧密码" prop="currentPass">
        <el-input
          type="password"
          v-model="passForm.currentPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input
          type="password"
          v-model="passForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="passForm.checkPass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('passForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('passForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      passdialog: false,
      passForm: {
        password: "",
        checkPass: "",
        currentPass: "",
      },
      rules: {
        password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          {
            min: 6,
            max: 12,
            message: "长度在 6 到 12 个字符",
            trigger: "blur",
          },
        ],
        checkPass: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        currentPass: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const _this = this;
          this.$axios
            .post("/sys-user/updatePass", this.passForm)
            .then((res) => {
              _this.$alert(res.data.msg, "提示", {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$refs[formName].resetFields();
                  this.passdialog = false;
                },
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    init(data) {
      this.passdialog = true;
    },
  },
};
</script>

<style lang="scss" scoped></style>
