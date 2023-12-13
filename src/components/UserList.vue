<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers } from '../api/index'
import { UserInterface } from '../types/UserInterface'

const users = ref<UserInterface[]>([])

onMounted(async () => {
  users.value = await getUsers()
})

function getEmoji(): string {
  const emojiOptions = [
    '🐸',
    '👷‍♂️',
    '🧔',
    '👵',
    '🧒',
    '👧',
    '🐨',
    '🐍',
    '👩‍💻',
    '👩',
    '🦥',
  ]
  const randomIndex = Math.floor(Math.random() * emojiOptions.length)
  console.log(emojiOptions[randomIndex])
  return emojiOptions[randomIndex]
}
</script>

<template>
  <h2 class="title">Users</h2>
  <ul class="users">
    <li class="user" v-for="user in users" :key="user.id">
      <div class="user__icon">{{ getEmoji() }}</div>
      <h3 class="user__name">{{ user.name }}</h3>
      <div class="user__info">
        <div class="user__email">✉&nbsp;{{ user.email }}</div>
        <div class="user__phone">☎&nbsp;{{ user.phone }}</div>
      </div>
      <button class="button user__button">View Profile</button>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.title {
  margin-bottom: 1rem;
  text-align: center;
}

.users {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 1200px) {
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

  &__icon {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 2rem;
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

  &__button {
    margin-top: 1rem;
  }
}
</style>
