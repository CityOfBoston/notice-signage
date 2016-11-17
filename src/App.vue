<template>
  <div id='app' class='app'>
    <div class='header'>
      <h1>City Clerk Postings</h1>
      <LastUpdated></LastUpdated>
    </div>
    <div class='container'>
      <div class='columns'>
        <Notice :notice="column_one"></Notice>
        <Notice :notice="column_two"></Notice>
        <Notice :notice="column_three"></Notice>
      </div>
      <div class='column sidebar'>
        <NoticeList :notices="notices"></NoticeList>
      </div>
    </div>
  </div>
</template>

<script>
import Notice from './components/Notice'
import NoticeList from './components/NoticeList'
import LastUpdated from './components/LastUpdated'

export default {
  name: 'app',

  components: {
    NoticeList,
    LastUpdated,
    Notice
  },

  data: function () {
    return {
      clock: false,
      seconds: 5,
      initialized: false,
      notices: [],
      column_one: {},
      column_two: {},
      column_three: {}
    }
  },

  methods: {
    initialized: function () {
      // Setup the first columns
      this.$el.classList.add('is-ready')

      // Setup the first columns
      this.column_one = this.notices[0]
      this.column_two = this.notices[1]
      this.column_three = this.notices[1]

      // Set to initialized
      this.initialized = true

      // Start the clock
      this.startTheClock()
    },

    startTheClock: function () {
      if (this.clock !== true) {
        // Setup the timer
        var seconds = this.seconds
        var time = seconds

        // Start the counter
        setInterval(function () {
          if (time === 0) {
            time = seconds
            console.log('PARTY!!!!')
          } else {
            time--
          }
        }, 1000)

        // The clock is running
        this.clock = true
      } else {
        console.log('Clock is running. OMG!')
      }
    },

    updateData: function () {
      this.$http.get('http://spyglass.dd:8083/api/v1/public-notices').then((response) => {
        // set data on vm
        this.notices = response.body

        // Reschedule the data update
        setTimeout(this.updateData, 2000)

        // If not initialized, then initialize
        if (this.initialized !== true) {
          this.$emit('initialized')
        }
      }, (response) => {
        setTimeout(this.updateData, 2000)
      })
    }
  },

  created: function () {
    this.updateData()
    this.$on('initialized', this.initialized)
  }
}
</script>

<style scoped>
.app {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
}

.header {
  background: #000000;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
}

h1 {
  margin: 0;
  color: #ffffff;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.columns {
  flex: 0.65;
  display: flex;
  flex-direction: row;
  padding: 1em;
}

.sidebar {
  flex: 0.35;
  background-color: #ffffff;
  padding: 0;
}

.column:not(:first-child).sidebar {
  margin-left: 0;
}
</style>
