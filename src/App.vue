<template>
  <div class="app-container">
    <UploaderFile action="http://123.57.138.48/api/upload/"></UploaderFile>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UploaderFile from './components/UploaderFile.vue'

export default defineComponent({
  name: 'App',
  components: {
    UploaderFile,
  },
})
</script>

<style>
.page-title {
  color: #fff;
}
</style>
