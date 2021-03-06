<template>
  <div id='app' class='app'>
    <div class='container'>
      <div class='header'>
        <h1>City Clerk Postings</h1>
        <LastUpdated :updated="last_updated"></LastUpdated>
      </div>
      <div class="main">
        <div class='columns'>
          <Notice :notice="column_one" :column="one"></Notice>
          <Notice :notice="column_two" :column="two"></Notice>
          <Notice :notice="column_three" :column="three"></Notice>
        </div>
        <Countdown></Countdown>
      </div>
    </div>
    <div class='sidebar'>
      <NoticeList :notices="notices" ref="noticeList"></NoticeList>
    </div>
  </div>
</template>

<script>
import Notice from './components/Notice'
import NoticeList from './components/NoticeList'
import LastUpdated from './components/LastUpdated'
import Countdown from './components/Countdown'
let Pusher = require('pusher-js')

export default {
  name: 'app',

  components: {
    NoticeList,
    LastUpdated,
    Notice,
    Countdown
  },

  data: function () {
    return {
      time: null,
      clock: false,
      initialized: false,
      notices: [],
      notice_counter: 0,
      one: 'column_one',
      two: 'column_two',
      three: 'column_three',
      column_one: {title: 'Loading...'},
      column_two: {title: 'Loading...'},
      column_three: {title: 'Loading...'},
      last_updated: 'Updating...'
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

      // Listen for the switch notice event
      window.kyle.$on('switch_notice', function (data) {
        self.addColumnNotice(data.column)
      })
    },

    updateData: function () {
      this.$http.get('https://www.boston.gov/api/v1/public-notices?' + Date.now()).then((response) => {
        // set data on vm
        this.notices = response.body.slice(0, 13)

        // set the last updated time
        this.last_updated = Date.now()

        // If not initialized, then initialize
        if (this.initialized !== true) {
          window.kyle.$emit('initialized')
        }
      })
    }
  },

  created: function () {
    let self = this

    // Update the data
    self.updateData()

    // Tell the event bus that everything is ready to go
    window.kyle.$on('initialized', this.initialized)

    // Use pusher to subscribe to events
    self.pusher = new Pusher('165e0e23610763f5ea8d')
    self.pusherChannel = this.pusher.subscribe('updates')

    // Allow us to remotely refresh the page
    self.pusherChannel.bind('reload', function (data) {
      window.location.reload()
    })

    // Allow us to remotely update the notice list
    self.pusherChannel.bind('update_notice', function (data) {
      self.updateData()
    })
  }
}
</script>

<style>
.app {
  flex-direction: row;
  display: flex;
  height: 100%;
  max-height: 1080px;
  overflow: hidden;
}

.header {
  background: #091F2F;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1em;
}

h1 {
  margin: 0;
  color: #ffffff;
  font-family: Montserrat;
  text-transform: uppercase;
}

.container {
  display: flex;
  flex-direction: column;
  width: 70%;
}

.main {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.columns {
  display: flex;
  flex-direction: row;
  flex: 1;
}

.sidebar {
  width: 30%;
  background-color: #ffffff;
  padding: 0;
  overflow: hidden;
}

.column:not(:first-child).sidebar {
  margin-left: 0;
}
</style>
