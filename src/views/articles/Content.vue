<template>
  <div class="blog-container" style="margin-top:20px">
    <div class="blog-pages">
      <div class="col-md-9 left-col pull-right">
        <div class="panel article-body content-body">
          <h1>{{ title }}</h1>
          <!-- <h1>{{ articles[0].title }}</h1> -->
          <div class="article-meta text-center">
            <i class="fa fa-clock-o"></i>
          </div>
          <div class="entry-content">
            <div class="content-body entry-content panel-body ">
              <div class="markdown-body" v-html="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// import SimpleMDE from 'simplemde'  
import hljs from 'highlight.js'


export default{
  name: 'content',

  data(){
    return{
      title:'',
      content: '',
      // articles: ''
    }

  },
  created(){
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
    let { title, content } = article

    this.title = title
    // 使用编辑器的 markdown 方法将 Markdown 内容转成 HTML
    // this.content = SimpleMDE.prototype.markdown(content)
    this.content = content

    this.$nextTick(() => {
      // 遍历当前实例下的 'pre code' 元素
      this.$el.querySelectorAll('pre code').forEach((el) => {
        // 使用 highlight.js 的 highlightBlock 方法进行高亮
        hljs.highlightBlock(el)
      })
    })
  }
  }

}


</script>
