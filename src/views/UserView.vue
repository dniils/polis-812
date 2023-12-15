<script setup lang="ts">
import UserProfile from '../components/UserProfile.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const userId = route.params.id
</script>

<template>
  <UserProfile :userId="userId"></UserProfile>
</template>

<style scoped lang="scss"></style>
