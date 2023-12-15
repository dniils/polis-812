import { createStore, Commit } from 'vuex'
import { UserInterface } from '../types/UserInterface'
import { getUsers } from '../api'

interface AppState {
  users: UserInterface[]
}

const store = createStore<AppState>({
  state: {
    users: [],
  },
  mutations: {
    setUsers(state, newUsersData: UserInterface[]) {
      state.users = newUsersData.sort((a, b) => a.name.localeCompare(b.name))
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
  },
})

export { store }
