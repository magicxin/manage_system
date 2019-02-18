<template>
  <div class="news">
    <div v-html="person&&person.name"></div>
  </div>
</template>

<script>
  import { getData } from 'controller/home'
  export default {
    name: 'news',
    data() {
      return {
        person:null
      }
    },
    mounted() {
//    getData.bind(this)().then(res=>{
//        this.person = res.person
//      })
    },
    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .news {
    
  }
</style>