<template>
  <div class="navbar navbar-default topnav">
    <div class="container">
      <div class="navbar-header">
        <a href="/" class="navbar-brand">
          <span class="title">{{ logo.title }}</span>
          <img v-bind:src="logo.src" :alt="logo.title" />
        </a>
      </div>
      <div>
        <ul class="nav navbar-nav">
          <li v-for="(item, index) in navList" v-bind:class="{ active: index === navActiveIndex }">
            <a href="#" @click="changeNavIndex(index)"> {{ item }}</a>
          </li>
        </ul>
      </div>

      <!-- 入口组件 -->
      <div class="navbar-right">
        <TheEntry />
      </div>
    </div>
  </div>
</template>

<script>
// 引入 TheEntry.vue 的默认值
import TheEntry from '@/components/layouts/TheEntry'
export default {
  name: "TheHeader",
  // 添加 components 选项，并注册 TheEntry
  components: {
    TheEntry
  },
  data() {
    return {
      logo: {
        src: `${this.uploadsUrl}images/202101/26/48878/4NbpRGTbE3.png`,
        title: " learnKu js"
      },
      title: "logo js",
      navList: ["社区", "文档", "问答", "头条"],
      navActiveIndex: 0
    }

  },
  beforeCreate() {
    this.uploadsUrl = "https://cdn.learnku.com/uploads/";
  },
  methods: {
    changeNavIndex(index) {
      this.navActiveIndex = index
    }
  }
}
</script>
<style scoped>
.title {
  display: none;

  .navbar-default .navbar-nav>.active>a {
    background: rgba(0, 0, 0, .03);
  }
}
</style>
