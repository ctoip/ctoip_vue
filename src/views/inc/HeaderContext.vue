<template>
  <div>
    <strong>钓鱼邮件攻击样本IP溯源程序</strong>
    <div class="header-avatar">
      <el-avatar :src="circleUrl"></el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ currntUserName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <a @click="handleClick(userInfo)">用户中心</a>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-link href="https://github.com/Dew-OF-Aurora/ctoip" target="_blank"
        >网站</el-link
      >
    </div>
    <usercenter v-if="Visiable" ref="usercenterdialog"></usercenter>
  </div>
</template>

<script>
import usercenter from "@/components/UserCenter.vue";
export default {
  components: { usercenter },
  mounted() {
    this.getUserInfo();
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",

      Visiable: false,

      userInfo: {
        username: "",
        lastLogin: "",
        created: "",
        statu: "",
      },
    };
  },
  computed: {
    currntUserName: {
      get() {
        return this.$store.state.username;
      },
    },
  },
  methods: {
    handleClick(data) {
      this.Visiable = true;
      this.$nextTick(() => {
        this.$refs.usercenterdialog.init(data);
      });
    },
    getUserInfo() {
      this.$axios
        .get("/sys-user/userInfo")
        .then((res) => {
          this.userInfo = res.data.data;
          this.$store.commit("SET_USERNAME", res.data.data.username);
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
    logout() {
      this.$axios.get("/logout").then((res) => {
        localStorage.clear();
        sessionStorage.clear();
        this.$store.commit("resetState");
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-avatar {
  float: right;
  width: 210px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.el-dropdown-link {
  cursor: pointer;
}
a {
  text-decoration: none;
}
</style>
