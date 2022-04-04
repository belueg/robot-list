<template>
  <div class="home">
    <SearchBar v-model="inputValue" />
    <RecycleScroller
      :items="filteredUsers"
      :item-size="160"
      key-field="email"
      v-slot="{ item }"
    >
      <UserCard :inputValue="inputValue" :user="item" />
    </RecycleScroller>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '~/types'
import omit from 'lodash.omit'

export default Vue.extend({
  name: 'IndexPage',
  data: () => ({
    inputValue: '',
  }),
  async asyncData({ $axios, store }) {
    try {
      const { data } = await $axios.get(
        'https://gist.githubusercontent.com/allaud/093aa499998b7843bb10b44ea6ea02dc/raw/c400744999bf4b308f67807729a6635ced0c8644/users.json'
      )
      store.commit('set_users', data)
    } catch (error) {
      console.error(error)
    }
  },
  async mounted() {
    if (this.$route.query.search) {
      this.inputValue = this.$route.query.search as string
    }
  },
  computed: {
    users(): User[] {
      return this.$store.state.users
    },
    filteredUsers(): User[] {
      if (this.inputValue === '') return this.users
      return this.users.filter((user) => {
        const userWithoutAvatar = omit(user, 'avatar')
        return Object.values(userWithoutAvatar)
          .join(' ')
          .match(new RegExp(this.inputValue, 'gi'))
      })
    },
  },
  watch: {
    inputValue(newVal: string) {
      this.$router.replace({
        name: this.$route.name!,
        query: { search: newVal },
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 564px;
  height: 683px;
  padding: 10px;
  padding-bottom: 0;
  background-color: #ffffff;
  overflow: hidden;
}
</style>
