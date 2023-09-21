<template>
  <div class="blog-container">
    <div class="blog-pages">
      <!-- 用于渲染『文章列表』和『文章内容』 -->
      <RouterView></RouterView>

      <div class="col-md-3 main-col pull-left">
        <div class="panel panel-default corner-radius">
          <div class="panel-body text-center topic-author-box blog-info">
            <h1>个人专栏展示</h1>

            <div>
              <router-link to="">
                <img :src="userAvatar" class="avatar-112 avatar img-thumbnail">

              </router-link>
            </div>

            <div class="blog-name">
              <router-link to=""> {{ userName }}的专栏</router-link>
            </div>
            <hr>
            <router-link :to="`/${userName}`">
              <li class="list-group-item"><i class="text-md fa fa-list-ul"></i> 专栏文章（{{ articleNum }}）</li>
            </router-link>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// 引入 mapState 辅助函数
import { mapState } from 'vuex'

export default{
  name: 'Column',


  computed: {
    //指定状态混入计算属性
    ...mapState([
      'user',
      'articles'
  ]),

    //基于user 返回用户名
    userName(){
      return this.user && this.user.name
    },
    userAvatar(){
      return this.user && this.user.avatar
    },
    articleNum(){
      return this.articles ? this.articles.length  : 999
    }

  },


  methods:{



  }

}



</script>

<style scoped>
.blog-container { margin-top: 20px;}
</style>
