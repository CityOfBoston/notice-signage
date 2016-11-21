<template>
  <div class='last-updated'>Last updated: {{ updated_time  }}</div>
</template>

<script>
export default {
  name: 'last_updated',
  props: ['updated'],
  computed: {
    updated_time: function () {
      try {
        let date = new Date(this.updated)
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

        if (date.getHours()) {
          return monthNames[(date.getMonth())] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + ':' + date.getMinutes() + '' + (date.getHours() > 11 ? 'PM' : 'AM')
        } else {
          return 'Updating...'
        }
      } catch (e) {
        console.log('Need a valid date')
      }
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
