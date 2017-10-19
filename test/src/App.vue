<style>
body, html { margin: 0; padding: 0; }
.container { padding-top: 10px; }
.demo { margin-bottom: 20px; text-align: center; }
.demo-item { border: 1px solid #ddd; padding: 20px 0; margin: 0 10px; }

</style>

<style lang="less">
.less-flex {
  display: flex;
  &-item {
    flex: 1;
  }
}
</style>

<style lang="scss">
@import './assets/sass1.scss';

.scss-flex {
  display: flex;
  &-item {
    flex: 1;
  }
}
</style>

<style lang="styl">
.styl-flex {
  display: flex;
  /* http://www.zhangxinxu.com/jq/stylus/mixins.php */
  &-item {
    flex: 1;
  }
}
</style>

<style lang="css">
.css-flex { display: flex; }
.css-flex-item { flex: 1; }
</style>

<style src="./assets/css1.css"></style>
<!-- <style src="./assets/less1.less"></style> -->

<template>
  <div class="container">
    <div class="less-flex demo">
      <div class="less-flex-item demo-item">less-flex-item</div>
      <div class="less-flex-item demo-item">less-flex-item</div>
    </div>

    <div class="scss-flex demo">
      <div class="scss-flex-item demo-item">scss-flex-item</div>
      <div class="scss-flex-item demo-item">scss-flex-item</div>
    </div>

    <div class="styl-flex demo">
      <div class="styl-flex-item demo-item">styl-flex-item</div>
      <div class="styl-flex-item demo-item">styl-flex-item</div>
    </div>

    <div class="css-flex demo">
      <div class="css-flex-item demo-item">css-flex-item</div>
      <div class="css-flex-item demo-item">css-flex-item</div>
    </div>

    <div class="file-css-flex demo">
      <div class="file-css-flex-item demo-item">file-css-flex-item</div>
      <div class="file-css-flex-item demo-item">file-css-flex-item</div>
    </div>

    <div class="file-less-flex demo">
      <div class="file-less-flex-item demo-item">file-less-flex-item</div>
      <div class="file-less-flex-item demo-item">file-less-flex-item</div>
    </div>

    <div class="file-scss-flex demo">
      <div class="file-scss-flex-item demo-item">file-scss-flex-item</div>
      <div class="file-scss-flex-item demo-item">file-scss-flex-item</div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
    };
  },
  methods: {

  },
  computed: {

  },
  mounted() {

  },
};
</script>
