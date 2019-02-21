<template>
  <div class="user">
    <magix-aside class="aside"></magix-aside>
    <keep-alive>
      <router-view class="content" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view class="content" v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
  import magixAside from 'components/magix-aside'
  export default {
    name: 'user',
    components: { magixAside },
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
  .user {
    display:flex;
    .aside {
      flex:1;
    }
    .content {
      flex:7;
    }
  }
</style>