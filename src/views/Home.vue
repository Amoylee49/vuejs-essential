<template  lang="">
  <!-- <Message :show.sync="msgShow" :type="msgType" :msg="msg" /> -->

  <!-- 帖子列表 -->
  <div class="col-md-9 topics-index main-col">
    <div class="panel panel-default">
      <div class="panel-heading">
        <!-- 为 -->
        <ul class="list-inline topic-filter">
          <li v-for="item in filters">
            <router-link v-bind:title="item.title" v-bind:class="{ active: filter === item.filter }"
              :to="`/topics?filter=${item.filter}`">{{ item.name }}</router-link>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>

      <div class="panel-body remove-padding-horizontal">
        <ul class="list-group row topic-list">
          <li v-for="article in articles" :key="article.articleId" class="list-group-item">
            <router-link :to="`/articles/${article.articleId}/content`" tag="div"
              class="reply_count_area hidden-xs pull-right">
              <div class="count_set">
                <span class="count_of_votes" title="投票数">{{ article.likeUsers ? article.likeUsers.length : 0 }}</span>
                <span class="count_seperator">/</span>
                <span class="count_of_replies" title="回复数">{{ article.comments ? article.comments.length : 0 }}</span>
                <span class="count_seperator">|</span>
                <abbr class="timeago">{{ article.date }}</abbr>
              </div>
            </router-link>
            <router-link :to="`/${article.uname}`" tag="div" class="avatar pull-left">
              <img :src="article.uavatar" class="media-object img-thumbnail avatar avatar-middle">
            </router-link>
            <router-link :to="`/articles/${article.articleId}/content`" tag="div" class="infos">
              <div class="media-heading">
                {{ article.title }}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 分页 样式映入的element-plus里面的分页样式
 total总页数  page-size每页条数  currentPage当前页  handleCurrentChange触发函数   :hide-on-single-page="true"只有一条数据时不显示分页
 -->
      <el-pagination background layout="prev, pager, next" :total="total" :page-size="pageSize"
        v-model:currentPage="currentPage" @current-change="handleCurrentChange" :hide-on-single-page="true" />



      </div>
    </div>
    <!-- 侧栏 -->
            <TheSidebar/>
</template>

<script>
import { ref, onMounted } from "vue"

import { mapState } from 'vuex'
// 引入 TheSidebar.vue 的默认值
import TheSidebar from '@/components/layouts/TheSidebar.vue'

export default {

  name: 'Home',
  components:{
    // 局部注册 TheSidebar
    TheSidebar,
  },
  data() {
    return {
      msg: '',
      msgType: '',
      msgShow: false,
      articles: [], // 文章列表
      filter: 'default', // 默认过滤方式
      filters: [ // 过滤方式列表
        { filter: 'default', name: '活跃', title: '最后回复排序' },
        { filter: 'excellent', name: '精华', title: '只看加精的话题' },
        { filter: 'vote', name: '投票', title: '点赞数排序' },
        { filter: 'recent', name: '最近', title: '发布时间排序' },
        { filter: 'noreply', name: '零回复', title: '无人问津的话题' }
      ],
      total: 0, // 文章总数
      pageSize: 5, // 每页条数
      currentPage: 1,
      tableData: [],

    }
  },
  beforeRouteEnter(to, from, next) {

    const fromName = from.name
    const logout = to.params.logout

    next(vm => {
      if (vm.$store.state.auth) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('注册成功')
            break
          case 'Login':
            vm.showMsg('登录成功')
            break
        }
      } else if (logout) {
        vm.showMsg('操作成功')
      }

      // 确认渲染该组件的对应路由时，设置相关数据
      vm.setDataByFilter(to.query.filter)
      // console.log(to.query.filter)
    })
  },
  computed: {
    ...mapState([
      'auth',
      'user',
      // 'articles'

    ]),
    // 这里删除了原来的 articles
    // articles() {
    //   return this.$store.getters.computedArticles
    // },
  },
  watch: {
    auth(value) {
      if (!value) {
        this.showMsg('操作成功')
      }
    },
    // 监听 '$route'，在查询参数变化后，设置相关数据
    '$route'(to) {
      this.setDataByFilter(to.query.filter)

      // console.log(to.query.filter)
    },
    handleCurrentChange(currentPage, filter) {
      console.log("watch handleChange:" + currentPage)
      this.handleCurrentChange(currentPage, filter)
    }
  },
  methods: {

    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    },
    // 设置相关数据
    setDataByFilter(filter = 'default', currentPage = 1) {
      // 设置当前过滤方式为查询参数的 filter
      this.filter = filter
      // console.log(this.filter)
      // 设置文章列表为过滤后的所有文章
      // this.articles = this.$store.getters.getArticlesByFilter(filter)

      // 每页条数
      const pageSize = this.pageSize
      // // 当前页
      // const currentPage = currentPage
      // 过滤后的所有文章
      const allArticles = this.$store.getters.getArticlesByFilter(filter)

      // 文章总数
      this.total = allArticles.length
      console.log(currentPage)
      // 当前页的文章
      this.articles = allArticles.slice(pageSize * (currentPage - 1), pageSize * currentPage)

    },
    handleCurrentChange(currentPage = 1, filter = 'default') {
      // 设置当前过滤方式为查询参数的 filter
      this.filter = filter
      //定义变量    分页 total总数  currentPage当前第几页  pageSize每页条数
      const total = ref(0);
      const pageSize = ref(5);
      // const currentPage = ref(1);
      // const tableData = ref([]);
      // 过滤后的所有文章
      const allArticles = this.$store.getters.getArticlesByFilter(filter)
      console.log(allArticles.slice(pageSize.value * (currentPage - 1), pageSize.value * currentPage))
      console.log(currentPage)
      // 文章总数
      this.total = allArticles.length
      // 当前页的文章
      this.articles = allArticles.slice(pageSize.value * (currentPage - 1), pageSize.value * currentPage)
      // return {
      //   pageSize: pageSize.value,
      //   // pageIndex: currentPage.value,
      //   currentPage: currentPage,

      //   total: allArticles.length,
      //   tableData: allArticles.slice(pageSize.value * (currentPage - 1), pageSize.value * currentPage),

      // }
    }
  },
  onMounted() {
    this.handleCurrentChange();
    console.log(this.handleCurrentChange)
  },
  created() {

    // 设置相关数据
    // console.log(this.$store.getters.getArticlesByFilter('default'));
    //定义变量    分页 total总数  currentPage当前第几页  pageSize每页条数
    // this.total = ref(0);
    // this.pageSize = ref(4);
    // this.currentPage = ref(1);
    // this.tableData = ref([1, 2, 3, 4, 5, 6]);


    // console.log(this.articles)
    // console.log(this.$store.getters)
  }
}


</script>

<style></style>

