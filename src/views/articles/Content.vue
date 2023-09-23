<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1 class="text-center">{{ title }}</h1>
          <!-- <h1>{{ articles[0].title }}</h1> -->
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body ">
              <div class="markdown-body" v-html="content"></div>
            </div>
          </div>

          <!-- 点赞 -->
          <div class="votes-container panel panel-default padding-md">
            <div class="panel-body vote-box text-center">
              <div class="btn-group">
                <a @click="like" href="javascript:;" class="vote btn btn-primary popover-with-html" :class="likeClass">
                  <i class="fa fa-thumbs-up animate__animated animate__shakeY"></i> {{ likeClass ? '已赞' : '点赞' }}
                </a>
                <div class="or"></div>
                <button @click="showQrcode = true" class="btn btn-success"><i class="fa fa-heart"></i> 打赏</button>


              </div>

              <div class="voted-users animate__animated animate__swing">
                <div class="user-lists ">
                  <span v-for="likeUser in likeUsers">
                    <!-- 点赞用户是当前用户时，加上类 animated 和 swing 以显示一个特别的动画  -->
                    <img :src="user && user.avatar" class="img-thumbnail avatar avatar-middle"
                      :class="{ 'animate__animated animate__shakeY': likeUser.uid === 1 }">
                  </span>
                </div>
                <div v-if="!likeUsers.length" class="vote-hint animate__animated animate__shakeY">成为了一个点赞的人</div>
              </div>
            </div>
          </div>


          <!-- 打赏弹窗 -->
          <!-- v-model:show="showQrcode"  Vue3写法，    :show.sync vue2写法-->
          <Modal v-model:show="showQrcode" class="text-center">
            <template v-slot:header>
              <div v-if="user">
                <img :src="user.avatar" class="img-thumbnail avatar" width="48">
              </div>
            </template>
            <div>
              <p class="text-md">如果你想学习更多前端的知识，Learnku Vue.js.com 是个不错的开始</p>
              <div class="payment-qrcode inline-block">
                <h5>扫一扫打开 Learnku Vue.js.com</h5>
                <!-- <p><img src="https://cdn.learnku.com/uploads/images/201803/25/2/g3CFVs0h7B.jpeg?imageView2/2/w/1024/h/0" width="160"></p> -->
                <qrcode-vue value="https://learnku.com/vuejs/" :size="160"></qrcode-vue>
              </div>
            </div>
            <template v-slot:footer>
              <div>
                <div class="text-center">祝你学习愉快 :)</div>
              </div>
            </template>
          </Modal>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

// import SimpleMDE from 'simplemde'
import hljs from 'highlight.js'
// import Modal from '../../components/Modal.vue';
// 引入 qrcode.vue 的默认值
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'content',

  components: {
    // Modal,
    QrcodeVue
  },
  data() {
    return {
      auth: true,
      user: '',
      title: '',
      content: '',
      date: '', // 文章创建时间
      uid: 1, // 用户 ID
      likeUsers: [], // 点赞用户列表
      likeClass: '', // 点赞样式
      showQrcode: false, // 是否显示打赏弹窗
    }

  },
  created() {
    //     $route.name：路由的名称，如 'Register'；
    // $route.path：路由的路径，如 '/auth/register'；
    // $route.params：路由参数对象，如 { id: "1" }；
    // $route.query：URL 查询参数对象，如 { page: "1" }；
    // $route.meta：元信息对象，如 { auth: true }；

    // 从当前路由对象获取参数 articleId
    const articleId = this.$route.params.articleId
    // 从 getArticleById 返回指定 ID 的文章
    const article = this.$store.getters.getArticleById(articleId)

    if (article) {
      this.user = this.$store.user
      // 获取当前文章的 likeUsers
      let { uid, title, content, date, likeUsers } = article

      this.title = title
      // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
      // this.content = SimpleMDE.prototype.markdown(content)
      this.content = content

      this.date = date
      // 更新实例的 likeUsers
      this.likeUsers = likeUsers || []
      // 更新 likeClass，点赞用户列表包含当前用户时，赋值为 active，表示已赞
      this.likeClass = this.likeUsers.some(likeUser => likeUser.uid === 1) ? 'active' : ''

      this.$nextTick(() => {
        this.$el.querySelectorAll('pre code').forEach((el) => {
          hljs.highlightBlock(el)
        })
      })
    }
  },
  methods: {
    // close() {
    //   // 触发事件以关闭弹窗
    //   this.$emit('update:show', false)
    // },

    like(e) {
      // 未登录时，提示登录
      if (false && !this.auth) {
        this.$swal({
          text: '需要登录以后才能执行此操作。',
          confirmButtonText: '前往登录'
        }).then((res) => {
          if (res.value) {
            this.$router.push('/auth/login')
          }
        })
      } else {
        const target = e.currentTarget
        // 点赞按钮是否含有 active 类，我们用它来判断是否已赞
        const active = target.classList.contains('active')
        const articleId = this.articleId

        if (active) {
          // 清除已赞样式
          this.likeClass = ''
          // 分发 like 事件取消赞，更新实例的 likeUsers 为返回的值
          this.$store.dispatch('like', { articleId }).then((likeUsers) => {
            this.likeUsers = likeUsers
          })
        } else {
          // 添加已赞样式
          this.likeClass = 'active animated rubberBand'
          // 分发 like 事件，传入 isAdd 参数点赞，更新实例的 likeUsers 为返回的值
          this.$store.dispatch('like', { articleId, isAdd: true }).then((likeUsers) => {
            this.likeUsers = likeUsers
          })
        }
      }
    },
  }

}


</script>

