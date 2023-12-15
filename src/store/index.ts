import { createStore, Commit } from 'vuex'
import { UserInterface } from '../types/UserInterface'
import { getUsers, getUser } from '../api'

interface AppState {
  users: UserInterface[]
  currentUser: UserInterface[]
}

const store = createStore<AppState>({
  state: {
    users: [],
    currentUser: [],
  },
  mutations: {
    setUsers(state, newUsersData: UserInterface[]) {
      state.users = newUsersData
      // .sort((a, b) => a.name.localeCompare(b.name))
    },
    setUser(state, newUserData: UserInterface[]) {
      state.currentUser = newUserData
    },
  },
  actions: {
    async getUsersData({ commit }: { commit: Commit }) {
      try {
        const usersData = await getUsers()
        commit('setUsers', usersData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async getUserData({ commit }: { commit: Commit }, userId) {
      try {
        const userData = await getUser(userId)
        commit('setUser', userData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
  },
})

export { store }
