<template>
  <ul class="notices-list">
    <li
      is="notice-item"
      v-bind:notice="notice"
      v-for="(notice, index) in notices"
    >
    </li>
  </ul>
</template>

<style scoped>
  .notices-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
</style>

<script>
import NoticeItem from './NoticeItem'

export default {
  name: 'notice_list',
  components: {
    NoticeItem
  },
  props: ['notices']
}
</script>
