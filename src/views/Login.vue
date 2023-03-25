<template>
  <div class="login-container">
    <el-row>
      <el-col :xl="6">
        <!-- ref注册该元素为对象, 以便操作dom元素 ,$ref[name]是他的对象名-->
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="loginForm"
        >
          <el-form-item>
            <h2>钓鱼邮件攻击样本IP溯源程序</h2>
          </el-form-item>
          <el-form-item label="用户名" prop="username" style="width: 380px">
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="width: 380px">
            <el-input v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code" style="width: 380px">
            <el-input
              v-model="loginForm.code"
              style="width: 172px; float: left"
              maxlength="5"
            ></el-input>
            <el-image
              :src="captchaImg"
              class="captchaImg"
              @click="getCaptchaImg"
            ></el-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "111111",
        //随机码
        code: "",
        //key
        token: "",
      },
      captchaImg: null,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 5, max: 5, message: "长度为 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //获取验证码
    getCaptchaImg() {
      this.$axios.get("/captcha").then((response) => {
        // console.log(response);
        this.loginForm.token = response.data.data.token;
        this.captchaImg = response.data.data.base64img;
        this.loginForm.code = "";
      });
    },
    // 提交登录
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            //axios将JavaScript对象序列化为JSON。 要以application / x-www-form-urlencoded格式发送数据
            .post("/login?" + qs.stringify(this.loginForm))
            .then((res) => {
              const jwt = res.headers["authorization"];
              this.$store.commit("SET_TOKEN", jwt);
              this.$store.commit("SET_USERNAME", res.data.data);
              this.$router.push("/index");
              this.$axios.post("/sys-user/updateInfoLoginTime", res.data.data);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  mounted() {
    this.getCaptchaImg();
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #fafafa;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>
