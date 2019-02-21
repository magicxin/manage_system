<template>
  <div class="home">
    <magix-header></magix-header>
    <keep-alive>
      <router-view class="fullheight" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view class="fullheight" v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  import magixHeader from 'components/magix-header'
  export default {
    name: 'home',
    components: { magixHeader },
    data() {
      return {
        
      }
    },
    created() {
      
    },
    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .home {
    display:flex;
    flex-flow:column;
    height:100%;
    .fullheight {
      flex-grow: 1;
    }
    .el-menu {
      padding-left:3rem;
    }
  }
</style>