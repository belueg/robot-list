import { User } from '~/types'
import { MutationTree } from 'vuex'

interface RootState {
  users: User[]
}

export const state = (): RootState => ({
  users: [],
})

export const mutations: MutationTree<RootState> = {
  set_users(state, users: User[]) {
    state.users = users
  },
}
