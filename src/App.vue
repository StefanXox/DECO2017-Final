<template>
  <div class="page">
    <pageNav />
    <router-view/>
  </div>
  <!-- <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
  </div> -->
</template>

<script>
import pageNav from './components/pageNav.vue';
export default {
  name: 'app',
  components: {
    pageNav
  },
  mixins: [],
  props: {
    
  },
  data() {
    return {
      
    }
  },
  computed: {
    
  },
  watch: {
    
  },
  mounted() {
    
  },
  methods: {
    
  }
}
</script>