<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { register } from 'swiper/element/bundle'
import LoadingSpinner from './LoadingSpinner.vue'
import { AlbumInterface } from '../types/AlbumInterface'
import { PhotoInterface } from '../types/PhotoInterface'
import trimText from '../utils/trimText'
import {
  ALBUM_TITLE_MAX_CHARS,
  POST_TITLE_MAX_CHARS,
  POST_BODY_MAX_CHARS,
  AMOUNT_OF_FIRST_PHOTOS_FROM_ALBUM,
} from '../constants/userProfile'

register()

const store = useStore()
const router = useRouter()
const { userId } = defineProps(['userId'])
const userDataIsLoading = ref(true)
const tabs = ref({
  tabActive: '',
  name: ['albums', 'posts', 'lorem'],
})
const currentView =
  router.currentRoute.value.query.view?.toString() || tabs.value.name[0]

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

watch(
  () => router.currentRoute.value.query.view,
  (newView) => {
    tabs.value.tabActive = newView?.toString() || currentView
  }
)

function setQueryParam(view: string): void {
  router.push({ query: { view } })
}

function setActiveTab(tabName: string): void {
  tabs.value.tabActive = tabName
}

function handleView(view: string) {
  setQueryParam(view)
  setActiveTab(view)
}

handleView(currentView)

function selectTab(e: MouseEvent): void {
  const selectedTab = (e.target as HTMLDivElement).innerHTML
  if (tabs.value.tabActive !== selectedTab) {
    handleView(selectedTab)
  }
}
</script>

<template>
  <div>
    <button class="button button_back" @click="router.push('/')">&lt;-</button>
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
          <div class="albums" v-if="tabs.tabActive === 'albums'">
            <ul class="albums__items">
              <li
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
              </li>
            </ul>
          </div>

          <div class="posts" v-if="tabs.tabActive === 'posts'">
            <ul class="posts__items">
              <li
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
              </li>
            </ul>
          </div>

          <div class="lorem" v-if="tabs.tabActive === 'lorem'">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe
              corporis aut, ex id exercitationem quia sequi quidem sed quis
              beatae distinctio vel molestias velit. Possimus delectus soluta
              quas, quod et nemo eligendi nam. Eveniet rem reprehenderit nemo
              necessitatibus, optio eos voluptatibus porro alias consequatur
              dicta dolores sequi corporis aliquid reiciendis perferendis
              aliquam deleniti deserunt consequuntur molestias. Doloribus
              pariatur aspernatur magni architecto expedita minus quae.
              Reiciendis hic, modi eaque corporis voluptatem totam rem adipisci
              nobis qui, nisi atque sequi pariatur. Vitae dolor natus illo nihil
              similique dolores inventore accusamus vel quis temporibus
              molestias quam adipisci labore aut culpa tempore, ea minima
              consequuntur expedita ab autem. Illo in neque odit dolor tenetur
              deserunt ab amet aperiam, voluptates iusto aliquid a iste et
              sapiente facilis, eius beatae! Voluptatibus quaerat dolor laborum
              nulla quia ipsa officia dolores sequi ipsam maxime, ut eligendi,
              et aspernatur consectetur aliquid ex numquam optio voluptates iure
              veniam. Laudantium rerum dolore laborum quia, illum veniam velit
              unde ratione cumque saepe, animi eligendi dicta laboriosam sequi
              repudiandae, doloremque vel quidem distinctio dolores hic ipsum!
              In accusantium at optio alias, ab quasi aliquam maxime sed
              eligendi dolores modi eum dolor voluptas corrupti illo
              reprehenderit aliquid hic laborum. Dignissimos quis optio cum
              minus!
            </p>
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

.button {
  &_back {
    font-family: 'Fira Code', monospace;
    font-size: 2rem;
    margin-bottom: 2rem;
  }
}

.tabs-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.tabs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--green-200);
  border-radius: 1rem;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 2rem;
    min-width: 6rem;
    font-weight: 600;
    color: var(--green-300);
    background-color: var(--green-200);
    cursor: pointer;
    user-select: none;
    text-transform: capitalize;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: var(--green-500);
    }

    &:first-child {
      border-radius: 1rem 0 0 1rem;
    }

    &:last-child {
      border-radius: 0 1rem 1rem 0;
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.albums,
.posts {
  &__items {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    list-style: none;

    @media screen and (min-width: 900px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 1280px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1440px) {
      grid-template-columns: repeat(4, 1fr);
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

.lorem {
  text-align: justify;
  max-width: 80vw;
}

.swiper-container {
  max-width: 20rem;
  border-radius: 1rem;
  overflow: clip;
  background-color: var(--green-200);
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
