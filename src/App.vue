<template>
  <div id="wrap">
    <TheHeaders />

    <div id="main-container" class="container main-container">
      <router-view />
    </div>

  </div>
  <TheFooter />
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import TheHeaders from './components/layouts/TheHeaders.vue';
import TheFooter from './components/layouts/TheFooters.vue';
// import Modal from './components/Modal.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld
    TheHeaders,
    TheFooter,
    // Modal
  },

}
</script>

<style lang="scss">
$container-large-desktop: 1200px;
$btn-primary-bg: #00b5ad;
$btn-primary-border: #00b5ad;
$label-primary-bg: #00b5ad;
$pagination-active-bg: #00b5ad;
$pagination-active-border: #00b5ad;
$pagination-color: #00b5ad;
$input-border-focus: #00b5ad;
$link-color: #12c4c5;
$link-hover-color: #22ddde;
$icon-font-path: "~bootstrap-sass/assets/fonts/bootstrap/";
$fa-font-path: "~font-awesome/fonts/";
@import "~bootstrap-sass/assets/stylesheets/_bootstrap";
@import "~font-awesome/scss/font-awesome";
@import "./styles/main.scss";
@import "./styles/extra.scss";
@import "~animate.css/animate.min.css";

body>.container {
  margin-top: 15px;
}
</style>
