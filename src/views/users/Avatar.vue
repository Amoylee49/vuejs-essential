<template>
  <div class="col-md-9 left-col">
    <div class="panel panel-default padding-md">
      <div class="panel-body">
        <h2><i class="fa fa-picture-o"></i> 请输入头像地址</h2>
        <!-- //消息组件 -->
<Message :show.sync ="msgShow" :msg="msg" :type="msgType"> </Message>
<!-- <Message :show.sync="msgShow" :type="msgType" :msg="msg"/> -->
        <hr>

        <div data-validator-form>
          <div class="form-group">
            <label>头像预览：</label>
            <div>
              <img :src="avatar" class="avatar-preview-img">
            </div>
            <input v-model.trim.lazy="avatar" v-validator.required="{ title: '头像地址' }" type="text" class="form-control avatar-input">

          </div>
          <div class="form-group row">

          </div>

          <div class="form-group">
            <div class="col-md-8">
              <button type="submit" class="btn btn-lg btn-primary" @click="updateAvatar">上传头像</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'EditAvatar',
  data() {
    return {
      avatar: '' ,//头像地址,
      alt: '',

      msg: '',
      msgType:'',
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  methods:{
    create(){
      // 获取仓库 的用户信息
      const user = this.$store.state.user
      console.log(user)
      console.log(user.avatar)

      // if (user && typeof user === 'object') {
        // 将仓库的用户头像赋值给当前头像地址
        this.avatar = user.avatar
      // }
      this.alt = user.sex

    },


    updateAvatar(){
      const avatar = this.avatar
      if (avatar) {
        let img = new Image()
        img.onload = () => {

          this.$store.dispatch('updateUser',{avatar})
          // this.$message.show('上传成功呢')
          this.$message.show('上传成功','success')
        }

        img.onerror = () => {
          this.$message.show('上传失败呢','error')
            // this.$message = show('上传失败', 'error')
        }


        img.src = avatar
      }

    },
    //消息方法
    show(msg,type = 'warning'){
        this.msg = msg
        this.msgType = type
        this.msgShow = false

        this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}

</script>


