<template>
  <h1 class="h1">{{ msg }}</h1>
  <van-button type="primary" size="small" @click="state.count++">count add is: {{ state.count }}</van-button>
  <br>
  <br>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
  .h1 {
    padding: 20px 0;
  }
</style>