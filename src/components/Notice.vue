<template>
  <div class="notice">
    <div class="notice-header">
      <div class="notice-title" v-html="notice.title"></div>
    </div>
    <NoticeBody :body="notice.body" :drawers="notice.field_drawer"></NoticeBody>
  </div>
</template>

<style scoped>
.notice {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #ffc;
}

.notice-body {
  flex: 1;
  background-color: #ddd;
  overflow: hidden;
}
</style>


<script>
import NoticeBody from './NoticeBody'

export default {
  name: 'notice',
  props: ['notice'],
  components: {
    NoticeBody
  }
}
</script>
