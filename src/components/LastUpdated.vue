<template>
  <div class="last-updated">Last updated: {{ time }}</div>
</template>

<script>
export default {
  name: 'last_updated',
  data () {
    return {
      time: 'April 20, 2016 at 1:53pm'
    }
  }
}
</script>

<style scoped>
.last-updated {
  color: #e8e8e8;
  margin-left: auto;
}
</style>
