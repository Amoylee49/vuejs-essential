<template>
  <div class="col-md-9 left-col pull-right">
    <div class="panel article-body article-index">
      <div class="panel-body">
        <h1 class="all-articles">
          专栏文章
          <router-link v-if="auth" to="/articles/create" class="btn btn-primary pull-right">
            <i class="fa fa-paint-brush"></i>
            创作文章
          </router-link>
        </h1>

        <ul class="list-group">
<h1>lllllllllllllllllllllllllllllllllllll</h1>


            <span class="meta pull-right">

            </span>



        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 mapState 辅助函数
import { mapState } from 'vuex'

export default{
  name: 'List',
data(){
  return {
    auth: true
  }
},



  computed:{
    // 将指定的状态混入计算属性
    ...mapState([
      'auth',
      'user',
      'articles'
    ])
  }


}

</script>
