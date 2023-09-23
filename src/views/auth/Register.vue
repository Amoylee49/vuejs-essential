<template>
  <div class="row">
    <div class="col-md-4 col-md-offset-4 floating-box">
<!-- //消息组件 -->
       <!-- 消息组件 -->
  <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">请注册</h3>
        </div>

        <div class="panel-body">
          <div class="form-group">
            <label class="control-label">用户名</label>
            <input type="text" class="form-control" placeholder="请填写用户名">
          </div>
          <div class="form-group">
            <label class="control-label">密码</label>
            <input type="password" class="form-control" placeholder="请填写密码">
          </div>
          <div class="form-group">
            <label class="control-label">确认密码</label>
            <input type="password" class="form-control" placeholder="请填写确认密码">
          </div>
          <div class="form-group">
            <label class="control-label">图片验证码</label>
            <input type="text" class="form-control" placeholder="请填写验证码">
          </div>
          <!-- 为 -->
          <div class="thumbnail" title="点击图片重新获取验证码" @click="getCaptcha">
            <div class="captcha vcenter" v-html="captchaTpl"></div>
          </div>
          <span @click="register">
            <button type="submit" class="btn btn-lg btn-success btn-block">
              <i class="fa fa-btn fa-sign-in"></i> 注册
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'

export default {
  name: 'Register',
  data() {
    return {
      captchaTpl: '', // 验证码模板
      username: '', // 用户名
      password: '', // 密码
      cpassword: '', // 确认密码
      captcha: '',// 验证码
//消息组件
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false ,// 是否显示消息，默认不显示
      //消息组件
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    this.getCaptcha()
  },
  methods: {
    getCaptcha() {
      const { tpl, captcha } = createCaptcha(6)

      this.captchaTpl = tpl
      this.localCaptcha = captcha
    },
    register(e) {
      setTimeout(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (true || target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
      if (false && this.captcha.toUpperCase() !== this.localCaptcha) {
        alert('验证码不正确')
        this.getCaptcha()
      } else {
        const user = {
          name: this.username,
          password: this.password,
          // avatar: `https://api.adorable.io/avatars/200/${this.username}.png`
          avatar: 'https://dgss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/qiusuo_icon/10597f220b047cee3e8ea50e91886d71.ico'
        }
        // 为 => 从仓库获取用户信息
        const localUser = this.$store.state.user

        if (localUser) {
          if (false && localUser.name === user.name) {
            // // alert('用户名已存在')
this.showMsg('用户名已存在','false')
            this.showMsg('用户名已存在','false')
          } else {
            this.login(user)
          }
        } else {
          this.login(user)
        }
      }
    },
    login(user) {
      // 为 => 分发 login 事件，以保存用户信息和登录
      this.$store.dispatch('login', user)


      // // alert('注册成功')
      this.$message.show('注册成功','succ')
      // this.showMsg('注册成功','success')
    },

    //消息方法
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
      this.showMsg('注册成功','success')
    },

  }
}
</script>
<style scoped>
.thumbnail {
  width: 170px;
  margin-top: 10px;
  cursor: pointer;
}

.thumbnail .captcha {
  height: 46px;
  background: #E1E6E8;
}

.captcha {
  font-size: 24px;
  font-weight: bold;
  user-select: none;
}
</style>
