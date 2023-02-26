<template>
  <div>
    <el-dialog
      title="用户个人信息"
      :visible.sync="usercenterdialogVisible"
      width="40%"
    >
      <el-form label-width="80px" :model="userinfo">
        <el-form-item label="用户名">
          <el-input v-model="userinfo.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-button
            type="primary"
            @click="showChangePass('123')"
            style="width: 100%; margin-bottom: 15px"
            >修改密码</el-button
          >
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input v-model="userinfo.created" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="上次登录">
          <el-input v-model="userinfo.lastLogin" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户状态">
          <el-input v-model="userinfo.statu" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="usercenterdialogVisible = false">取 消</el-button>
        <el-tooltip
          class="item"
          effect="dark"
          content="需要重新登入"
          placement="top"
        >
          <el-button type="primary" @click="submitInfo()">确 定</el-button>
        </el-tooltip>
      </span>
    </el-dialog>
    <changepass v-if="Visiable" ref="changepassdialog"></changepass>
  </div>
</template>

<script>
import changepass from "@/components/ChangePass.vue";
export default {
  components: { changepass },
  data() {
    return {
      Visiable: false,
      //如果提交该表单, 需要使用dto承接该对象, ?或者使用qs转JSON?
      userinfo: {
        username: "",
        created: "",
        lastLogin: "",
        statu: "",
      },
      usercenterdialogVisible: false,
    };
  },
  methods: {
    submitInfo() {
      this.usercenterdialogVisible = false;
      const _this = this;

      this.$axios.post("/sys-user/updateInfo", this.userinfo).then((res) => {
        _this.$alert(res.data.msg + ",请重新登录", "提示", {
          confirmButtonText: "确定",
          callback: (action) => {
            localStorage.clear();
            sessionStorage.clear();
            this.$store.commit("resetState");
            this.$axios.get("/logout").then((res) => {});
            this.$router.push("/login");
          },
        });
      });
    },
    init(data) {
      this.usercenterdialogVisible = true;
      this.userinfo = data;
    },
    showChangePass(data) {
      this.Visiable = true;
      this.$nextTick(() => {
        this.$refs.changepassdialog.init(data);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
