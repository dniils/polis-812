<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import LoadingSpinner from './LoadingSpinner.vue'

const store = useStore()
const isLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    if (!store.state.users.length) await store.dispatch('getUsersData')
  } catch (error) {
    console.error('Error dispatching getUsersData:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <LoadingSpinner v-if="isLoading"></LoadingSpinner>
  <ul class="users" v-else>
    <li class="user" v-for="user in store.state.users" :key="user.id">
      <div class="user__icon"></div>
      <h3 class="user__name">{{ user.name }}</h3>
      <div class="user__info">
        <div class="user__email">✉&nbsp;{{ user.email.toLowerCase() }}</div>
        <div class="user__phone">☎&nbsp;{{ user.phone }}</div>
      </div>
      <router-link
        :to="`/user/${user.id}`"
        v-slot="{ navigate }"
        class="router-link"
      >
        <button @click="navigate" class="button user__button">
          View Profile
        </button>
      </router-link>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.users {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1300px) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.user {
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  margin: 0 auto;
  width: 100%;
  max-width: 22rem;
  border-radius: 1rem;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
  background-color: var(--green-200);
  position: relative;

  &:hover {
    .user__button {
      background-color: var(--green-400);
      color: var(--green-200);
    }
    .user__icon {
      opacity: 0.7;
      animation: grow-and-shrink 0.5s ease-in-out infinite alternate;
    }
  }

  &__button {
    width: 100%;
  }

  &__icon {
    position: absolute;
    right: 1rem;
    top: 1rem;
    width: 3rem;
    height: 3rem;
    background-color: var(--green-400);
    border-radius: 50%;
    opacity: 0.3;
    transition: all 0.2s ease-in-out;
    user-select: none;
  }

  &__email,
  &__phone {
    &::first-letter {
      color: var(--green-300);
    }
  }
}

.router-link {
  margin-top: 1rem;
}
</style>
