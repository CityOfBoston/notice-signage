<template>
  <div id='app' class='app'>
    <div class='header'>
      <h1>City Clerk Postings</h1>
      <LastUpdated></LastUpdated>
    </div>
    <div class='container'>
      <div class="main">
        <div class='columns'>
          <Notice :notice="column_one" :column="one"></Notice>
          <Notice :notice="column_two" :column="two"></Notice>
          <Notice :notice="column_three" :column="three"></Notice>
        </div>
        <div class="countdown">Next page in <span class="cursor">:</span>{{time}}</div>
      </div>
      <div class='column sidebar'>
        <NoticeList :notices="notices" ref="noticeList"></NoticeList>
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
      time: null,
      clock: false,
      seconds: 2,
      initialized: false,
      notices: [],
      notice_counter: 0,
      one: 'column_one',
      two: 'column_two',
      three: 'column_three',
      column_one: {},
      column_two: {},
      column_three: {}
    }
  },

  methods: {
    addColumnNotice: function (column) {
      let self = this
      let notice = self.getNotice()

      // Set the notice
      self[column] = notice

      // Tell the world that this notice is on the clock
      window.kyle.$emit('notice_active', {
        id: notice.id,
        column: self.getColumn(column)
      })

      self.notice_counter++
    },

    getColumn: function (column) {
      let slot = false

      switch (column) {
        case 'column_one':
          slot = 'A'
          break
        case 'column_two':
          slot = 'B'
          break
        case 'column_three':
          slot = 'C'
          break
        default:
          slot = false
      }

      return slot
    },

    // Returns the next non-active notive
    getNotice: function () {
      let self = this
      let noticeListItems = self.$refs.noticeList.$children
      let notice = false
      let counter = self.notice_counter

      // Just keep swimming
      for (;;) {
        // If there is not a notice, assume we're at the
        // end, and start at 0
        if (!self.notices[counter]) {
          counter = 0
        }

        // Make sure it's not active
        if (!noticeListItems[counter].active) {
          notice = self.notices[counter]
          break
        // It's active, so move on
        } else {
          counter++
        }
      }

      // Set the counter
      self.notice_counter = counter++

      return notice
    },

    initialized: function () {
      let self = this

      // Setup the first columns
      self.$el.classList.add('is-ready')

      // Set to initialized
      self.initialized = true

      // Start the clock
      self.startTheClock()

      // Listen for the switch notice event
      window.kyle.$on('switch_notice', function (data) {
        self.addColumnNotice(data.column)
      })
    },

    startTheClock: function () {
      if (this.clock !== true) {
        // Setup the timer
        var seconds = this.seconds
        var time = seconds
        var self = this

        // Start the counter
        setInterval(function () {
          // Set the time
          self.time = time

          if (time === 0) {
            time = seconds
            window.kyle.$emit('change_page')
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
      this.$http.get('https://www.boston.gov/api/v1/public-notices').then((response) => {
        // set data on vm
        this.notices = response.body

        // Reschedule the data update
        setTimeout(this.updateData, 2000)

        // If not initialized, then initialize
        if (this.initialized !== true) {
          window.kyle.$emit('initialized')
        }
      }, (response) => {
        setTimeout(this.updateData, 2000)
      })
    }
  },

  created: function () {
    this.updateData()
    window.kyle.$on('initialized', this.initialized)
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

.main {
  width: 70%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.columns {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.countdown {
  padding-top: 0.875rem;
}

.sidebar {
  width: 30%;
  background-color: #ffffff;
  padding: 0;
  overflow-x: scroll;
}

.column:not(:first-child).sidebar {
  margin-left: 0;
}
</style>
