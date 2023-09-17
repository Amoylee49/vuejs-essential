<template>
  <div class="navbar-right">
  </div>
  <div class="nav navbar-nav github-login">
    <router-link to="/users/1/edit">
      <i class="fa fa-cog text-md i-middle"></i>
      编辑资料
    </router-link>
    <a href="#" class="btn btn-default login-btn" @click="login">
      <i class="fa fa-user"></i> 登 录
    </a>
    <!-- 为 -->
    <router-link to="/auth/register" class="btn btn-default login-btn">
      <i class="fa fa-user-plus"></i> 注 册
    </router-link>

  </div>
</template>

<script>
export default {
  name: 'TheEntry',

  methods: {
    login() {
      this.$swal({
        text: '你确定要退出吗?',
        confirmButtonText: '退出'
      }).then((res) => {
        if (res.value) {
          this.$store.dispatch('logout')
        }
      })
    }
  }
}


</script>

<style scoped></style>
