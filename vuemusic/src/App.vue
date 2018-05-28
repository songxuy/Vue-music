<template>
  <div id="app" class="page">
    <header class="header">
      <h1><i class="fa fa-music" style="margin-right:10px;"></i>音乐随心听</h1>
      <router-link to="/list"><i class="fa fa-list"></i></router-link>
    </header>
    <section class="main">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>
</style>
