<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import LoadingSpinner from './LoadingSpinner.vue'

const store = useStore()
const { userId } = defineProps(['userId'])
const isLoading = ref(true)

onMounted(async () => {
  try {
    await store.dispatch('getUserData', userId)
  } catch (error) {
    console.error('Error dispatching getUserData:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <LoadingSpinner v-if="isLoading"></LoadingSpinner>
    <div v-if="!isLoading" class="user-profile">
      <div class="user-profile__icon"></div>
      <h2 class="user-profile__name">
        {{ store.state.currentUser[0]?.name }}
      </h2>
      <div class="user-profile__info">
        <div class="user-profile__id">
          🆔&nbsp;{{ store.state.currentUser[0]?.id }}
        </div>
        <div class="user-profile__email">
          💌&nbsp;{{ store.state.currentUser[0]?.email }}
        </div>
        <div class="user-profile__phone">
          📞&nbsp;{{ store.state.currentUser[0]?.phone }}
        </div>
        <div class="user-profile__website">
          🌐&nbsp;{{ store.state.currentUser[0]?.website }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  &__icon {
    width: 5rem;
    height: 5rem;
    background-color: var(--green-400);
    border-radius: 50%;
  }

  &__email,
  &__phone {
    &::first-letter {
      color: var(--green-300);
    }
  }
}
</style>
