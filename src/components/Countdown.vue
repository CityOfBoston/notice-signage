<template>
  <div class="countdown">
    <div v-if="show_time">Next page in <strong><span>:</span>{{ seconds_left }}</strong></div>
    <div v-else>Updating...</div>
  </div>
</template>

<script>
export default {
  created () {
    window.setTimeout(this.countdown, 1000)
  },

  data () {
    return {
      seconds: 5,
      seconds_left: 5,
      show_time: true,
      timeout: ''
    }
  },

  methods: {
    countdown () {
      let self = this

      if (this.seconds_left > 0) {
        self.seconds_left--
        self.timeout = window.setTimeout(self.countdown, 1000)
      } else {
        // Reset seconds
        self.seconds_left = self.seconds

        // Hide the time
        self.show_time = false

        // Tell things to change
        window.kyle.$emit('change_page')

        // Restart the countdown
        window.setTimeout(function () {
          // Turn the timer back on
          self.show_time = true

          // Start counting
          self.countdown()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>
  .countdown {
    padding-top: 0.875rem;
  }
</style>
