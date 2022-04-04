<template>
  <div
    class="user-card"
    :style="{
      outline: textBtn === 'SKIP SELECTION' ? '1px solid blue' : 'none',
    }"
  >
    <div class="user-card__avatar">
      <img loading="lazy" :src="user.avatar" :alt="`${user.name} avatar`" />
    </div>

    <div class="user-card__content">
      <div class="user-card__info">
        <h1
          class="user-card__name"
          :title="user.name"
          v-html="highlight(user.name)"
        />
        <h2 class="user-card__title" v-html="highlight(user.title)" />
        <p class="user-card__address">
          <span v-html="highlight(user.address)" />,
          <span v-html="highlight(user.city)" />
        </p>
      </div>

      <div class="user-card__divider"></div>

      <button @click="isMarked" class="user-card__action-btn">
        {{ textBtn }}
      </button>
    </div>
    <span
      class="user-card__email"
      :title="user.email"
      v-html="highlight(user.email)"
    />
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'
import { User } from '~/types'

export default Vue.extend({
  name: 'UserCard',
  props: {
    user: {
      type: Object,
      required: true,
    } as PropOptions<User>,
    inputValue: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      textBtn: 'MARK AS SUITABLE',
    }
  },
  methods: {
    highlight(text: string) {
      if (!this.inputValue) {
        return text
      }
      return text.replace(new RegExp(this.inputValue, 'gi'), (match) => {
        return '<span class="highlightText">' + match + '</span>'
      })
    },
    isMarked() {
      this.textBtn === 'MARK AS SUITABLE'
        ? (this.textBtn = 'SKIP SELECTION')
        : (this.textBtn = 'MARK AS SUITABLE')
    },
  },
})
</script>

<style lang="scss" scoped>
.user-card {
  position: relative;
  display: flex;
  height: 136px;
  background: #fafafa;
  border-radius: 3px;
  overflow: hidden;
  margin: 1px 12px 0 1px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.24);
  &__avatar {
    display: flex;
    align-items: flex-end;
    width: 134px;
    height: 136px;
    background: rgba(0, 0, 0, 0.25);
    img {
      height: auto;
      width: 100%;
    }
  }
  &__content {
    position: relative;
    padding-top: 10px;
    width: 100%;
    padding-left: 27.5px;
  }

  &__info {
    > * {
      margin-top: 0;
      margin-bottom: 8px;
    }
  }

  &__name {
    font-size: 24px;
    font-weight: 400;
    margin-bottom: 0;
    width: 253px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__title {
    font-size: 14px;
    margin-bottom: 4px;
    color: rgba(0, 0, 0, 0.543846);
  }

  &__address {
    font-weight: 400;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.543846);
  }

  &__divider {
    position: absolute;
    background: rgba(0, 0, 0, 0.12);
    height: 1px;
    right: 0;
    left: 0;
    bottom: 33.33%;
  }

  &__action-btn {
    font-weight: 500;
    font-size: 14px;
    color: #009688;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    position: absolute;
    bottom: 16.66%;
    transform: translateY(50%);
  }

  &__email {
    font-weight: 400;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
    position: absolute;
    top: 10px;
    right: 10px;
    white-space: nowrap;
    width: 130px;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
