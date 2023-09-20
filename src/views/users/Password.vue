<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2><i class="fa fa-picture-o"></i> 修改密码地址</h2>
        <hr>
        <div data-validator-form>
          <div class="form-group">
            <label class="col-sm-2 control-label">密 码</label>
            <div class="col-sm-6">
              <input type="password" v-model.trim="password" id="password">
            </div>
          </div>
          <div class="form-group row">
            <div class="col-md-8">
              <label class="col-sm-3 control-label">确认密 码</label>
            <div class="col-sm-6">
              <input type="text" v-model.trim="cpassword" id="cpassword">
            </div>
            </div>
          </div>

          <div class="form-group">
            <div class="col-sm-offset-2 col-sm-6">
              <button type="submit" @click="updatePassword"> 修改密码地址</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'password',
  data() {
    return {
      password: 'sdfsdf',
      cpassword: ''
    }
  },
  // 在实例创建完成后，初始化密码的值
  created(){
    const user = this.$store.state.user
    this.password = user.password
  },
  methods:{
    //更新密码
    updatePassword(e){
      this.$nextTick(()=>{
        //表单通过时候
        // if(e.target.canSubmit) {
          this.$store.dispatch('updateUser',{ password: this.cpassword})
          this.$message.show('修改成功')
        // }
      })
    }
  }
}

</script>
<style lang="">
</style>


