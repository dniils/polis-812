import { createStore, Commit } from 'vuex'
import { UserInterface } from '../types/UserInterface'
import { AlbumInterface } from '../types/AlbumInterface'
import { PostInterface } from '../types/PostInterface'
import { PhotoInterface } from '../types/PhotoInterface'
import {
  fetchUsers,
  fetchUser,
  fetchUserAlbums,
  fetchUserPosts,
  fetchPhotosFromAlbum,
} from '../api'
import { capitalizeFirstLetter } from '../utils/capitalizeFirstLetter'

interface AppState {
  users: UserInterface[]
  currentUser: UserInterface[]
  userAlbums: AlbumInterface[]
  userPosts: PostInterface[]
  photosFromAlbums: PhotoInterface[]
}

const store = createStore<AppState>({
  state: {
    users: [],
    currentUser: [],
    userAlbums: [],
    userPosts: [],
    photosFromAlbums: [],
  },
  mutations: {
    setUsers(state, newUsersData: UserInterface[]): void {
      state.users = newUsersData
    },
    setUser(state, newUserData: UserInterface[]): void {
      state.currentUser = newUserData
    },
    setUserAlbums(state, newUserAlbums: AlbumInterface[]): void {
      newUserAlbums.forEach(
        (album) => (album.title = capitalizeFirstLetter(album.title))
      )
      state.userAlbums = newUserAlbums
    },
    setUserPosts(state, newUserPosts: PostInterface[]): void {
      newUserPosts.forEach((post) => {
        post.title = capitalizeFirstLetter(post.title)
        post.body = capitalizeFirstLetter(post.body)
      })
      state.userPosts = newUserPosts
    },
    setPhotosFromAlbum(state, newPhotos: PhotoInterface[]): void {
      state.photosFromAlbums.push(...newPhotos)
    },
  },
  actions: {
    async getUsersData({ commit }: { commit: Commit }): Promise<void> {
      try {
        const usersData = await fetchUsers()
        commit('setUsers', usersData)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    async getUserData({ commit }: { commit: Commit }, userId): Promise<void> {
      try {
        const userData = await fetchUser(userId)
        commit('setUser', userData)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },
    async getUserAlbums({ commit }: { commit: Commit }, userId): Promise<void> {
      try {
        const userAlbums = await fetchUserAlbums(userId)
        commit('setUserAlbums', userAlbums)
      } catch (error) {
        console.error('Error fetching user albums:', error)
      }
    },
    async getUserPosts({ commit }: { commit: Commit }, userId): Promise<void> {
      try {
        const userPosts = await fetchUserPosts(userId)
        commit('setUserPosts', userPosts)
      } catch (error) {
        console.error('Error fetching user posts:', error)
      }
    },
    async getPhotosFromAlbum(
      { commit }: { commit: Commit },
      albumId
    ): Promise<void> {
      try {
        const photosFromAlbum = await fetchPhotosFromAlbum(albumId)
        commit('setPhotosFromAlbum', photosFromAlbum)
      } catch (error) {
        console.error('Error fetching photos:', error)
      }
    },
  },
})

export { store }
