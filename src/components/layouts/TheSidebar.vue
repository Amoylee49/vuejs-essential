
<template>
  <div class="col-md-3 side-bar">
    <div class="panel panel-default corner-radius sidebar-resources">
      <div class="panel-heading text-center">
        <h3 class="panel-title">实战课程</h3>
      </div>
      <div class="panel-body">

        <Slider :slides="slides">
          <template v-slot:currentSlides="{currentSlide}">
            <a :href="currentSlide.link" target="_blank">
              <!-- {{ currentSlide }} -->
              <img :alt="currentSlide.title" :title="currentSlide.title" :src="currentSlide.img">
            </a>
          </template>
        </Slider>

      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: 'Sidebar',
  data() {
    return {
      // 实战课程
      slides: [
        {
          title: '《Laravel 入门教程 - 从零到部署上线》',
          img: 'https://cdn.learnku.com/uploads/banners/YpxKKNlSPdmwotO3u8An.jpg',
          link: 'https://learnku.com/laravel/t/3383/laravel-the-first-chinese-new-book-laravel-tutorial'
        },
        {
          title: '《Laravel 进阶课程 - 从零构建论坛系统》',
          img: 'https://cdn.learnku.com/uploads/banners/iNanVVOXdnYQ6jRfMdWE.png',
          link: 'https://learnku.com/laravel/t/6592'
        },
        {
          title: '《Laravel 教程实战高级 - 构架 API 服务器》',
          img: 'https://cdn.learnku.com/uploads/banners/tEd4GxhMp6VMh9e0hrUH.jpg',
          link: 'https://learnku.com/laravel/t/7657'
        }
      ]
    }
  }
}
</script>

<style scoped>
.carousel-inner img {
  display: block;
  margin: auto;
  line-height: 1;
  width: 70%;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px #ccc;
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
}</style>
