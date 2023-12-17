<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { register } from 'swiper/element/bundle'
import LoadingSpinner from './LoadingSpinner.vue'
import trimText from '../utils/trimText'
import { AlbumInterface } from '../types/AlbumInterface'
import { PhotoInterface } from '../types/PhotoInterface'
import {
  ALBUM_TITLE_MAX_CHARS,
  POST_TITLE_MAX_CHARS,
  POST_BODY_MAX_CHARS,
  AMOUNT_OF_FIRST_PHOTOS_FROM_ALBUM,
} from '../constants/userProfile'

register()

const store = useStore()
const { userId } = defineProps(['userId'])
const userDataIsLoading = ref(true)
const tabs = ref({
  tabActive: 'Albums',
  name: ['Albums', 'Posts'],
})

onMounted(async () => {
  try {
    await store.dispatch('getUserData', userId)
    await store.dispatch('getUserAlbums', userId)
    await store.dispatch('getUserPosts', userId)

    store.state.photosFromAlbums = []
    store.state.userAlbums.forEach(
      async (album: AlbumInterface) =>
        await store.dispatch('getPhotosFromAlbum', album.id)
    )

    console.log(await store.state.photosFromAlbums)
  } catch (error) {
    console.error('Error dispatching:', error)
  } finally {
    userDataIsLoading.value = false
  }
})

function selectTab(e: MouseEvent): void {
  const selectedTab = (e.target as HTMLDivElement).innerHTML
  if (tabs.value.tabActive !== selectedTab) {
    tabs.value.tabActive = selectedTab
  }
}
</script>

<template>
  <div>
    <LoadingSpinner v-if="userDataIsLoading"></LoadingSpinner>

    <div v-if="!userDataIsLoading" class="user-profile">
      <div class="user-info">
        <div class="user-profile__icon"></div>
        <h2 class="user-profile__name">
          {{ store.state.currentUser[0]?.name }}
        </h2>
        <div class="user-profile__info">
          <div class="user-profile__id">
            🆔&nbsp;{{ store.state.currentUser[0]?.id }}
          </div>
          <div class="user-profile__email">
            💌&nbsp;{{ store.state.currentUser[0]?.email.toLowerCase() }}
          </div>
          <div class="user-profile__phone">
            📞&nbsp;{{ store.state.currentUser[0]?.phone }}
          </div>
          <div class="user-profile__website">
            🌐&nbsp;{{ store.state.currentUser[0]?.website }}
          </div>
        </div>
      </div>

      <div class="tabs-wrapper">
        <div class="tabs">
          <div
            class="tabs__item"
            v-for="(tab, index) in tabs.name"
            :key="index"
            @click="selectTab"
            :class="{ tabs__item_active: tab == tabs.tabActive }"
          >
            {{ tab }}
          </div>
        </div>
        <div class="tabs__content">
          <div class="albums" v-if="tabs.tabActive === 'Albums'">
            <div class="albums__items">
              <div
                class="albums__item"
                v-for="(album, index) in store.state.userAlbums"
                :key="album.id"
              >
                <div class="albums__number-and-title">
                  <span class="albums__number">{{ index + 1 }}</span>
                  <h4 class="albums__title">
                    {{ trimText(album.title, ALBUM_TITLE_MAX_CHARS) }}
                  </h4>
                </div>

                <swiper-container
                  slides-per-view="1"
                  navigation="true"
                  pagination="true"
                  class="swiper-container"
                >
                  <swiper-slide
                    class="swiper-slide"
                    v-for="(photo) in store.state.photosFromAlbums.filter(
                  (photo:PhotoInterface) => photo.albumId === album.id
                ).slice(0, AMOUNT_OF_FIRST_PHOTOS_FROM_ALBUM)"
                  >
                    <img :src="photo.url" alt="photo" class="albums__photo" />
                  </swiper-slide>
                </swiper-container>
              </div>
            </div>
          </div>

          <div class="posts" v-if="tabs.tabActive === 'Posts'">
            <div class="posts__items">
              <div
                class="posts__item"
                v-for="post in store.state.userPosts"
                :key="post.id"
              >
                <h4 class="posts__title">
                  📝 {{ trimText(post.title, POST_TITLE_MAX_CHARS) }}
                </h4>
                <p class="posts__body">
                  {{ trimText(post.body, POST_BODY_MAX_CHARS) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin card {
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--green-200);
}

.tabs {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;

  &__item {
    color: var(--green-300);
    font-weight: 600;
    background-color: var(--green-200);
    border-radius: 1rem;
    min-height: 2rem;
    min-width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    user-select: none;

    &:hover {
      color: var(--green-500);
      background-color: var(--green-300);
    }

    &_active {
      background-color: var(--green-300);
      color: var(--green-500);
    }
  }
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  &__name {
    text-wrap: nowrap;
  }

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

  &__info {
    align-self: flex-start;
  }
}

.user-info {
  @include card;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.tabs-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.albums,
.posts {
  &__items {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 1rem;
    gap: 1rem;

    @media screen and (min-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__number-and-title {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    color: var(--green-300);
  }

  &__number {
    font-weight: 200;
  }
}

.albums {
  &__photo {
    width: 70%;
    object-fit: contain;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    margin-bottom: 0.2rem;
  }
}

.posts {
  &__item {
    @include card;
    width: 100%;
    max-width: 22rem;
    margin: 0 auto;
  }

  &__body {
    color: var(--green-300);
  }
}

.swiper-container {
  max-width: 20rem;
  border-radius: 1rem;
  overflow: clip;
  background-color: var(--green-200);

  @media screen and (min-width: 900px) {
    // max-width: 20rem;
  }
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
