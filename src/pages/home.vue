<template>
  <div class="home">
    <magix-header></magix-header>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  import magixHeader from 'components/magix-header'
  export default {
    name: 'home',
    components: { magixHeader },
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    created() {
      
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .home {
    .el-menu {
      padding-left:3rem;
    }
  }
</style>