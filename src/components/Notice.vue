<template>
  <div class="notice">
    <div class="notice-header">
      <div class="notice-title-container">
        <div class="notice-column"><span>{{column_name}}</span></div>
        <div class="notice-title" v-html="notice.title"></div>
      </div>
      <ul class="notice-details">
        <li class="notice-detail" v-if="notice.canceled !== '1'">
          <div class="notice-detail-header">When</div>
          <div class="notice-detail-content">
            <div v-html="notice.notice_date"></div>
            <div v-html="notice.notice_time"></div>
          </div>
        </li>
        <li class="notice-detail" v-else>
          <div class="notice-detail-header">When</div>
          <div class="notice-detail-content">
            <span class="notice-canceled">Canceled</span>
          </div>
        </li>
        <li class="notice-detail">
          <div class="notice-detail-header">Where</div>
          <div class="notice-detail-content">
            <div v-html="notice.location_street"></div>
            <div v-html="notice.location_room"></div>
          </div>
        </li>
        <li class="notice-detail">
          <div class="notice-detail-header">Posted</div>
          <div class="notice-detail-content">
            <div v-html="notice.posted"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="notice-testimony"  v-if="notice.testimony_time">Public testimony begins at <span v-html="notice.testimony_time"></span></div>
    <NoticeBody :id="notice.id" :body="notice.body" :drawers="notice.field_drawer" :column="column"></NoticeBody>
  </div>
</template>

<style scoped>
.notice {
  flex: 0.33;
  min-width: 25%;
  background: #ffffff;
  padding: 1.5em;
  display: flex;
  flex-direction: column;
}

.notice-canceled {
  text-transform: uppercase;
  color: #FB4D42;
}

.notice-testimony {
  color: #FB4D42;
  padding: 0.875rem;
  background-color: #f3f3f3;
  font-size: 0.875rem;
  margin-bottom: 0.875rem;
}

.notice-title-container {
  border-bottom: 4px solid #091F2F;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
}

.notice-column {
  float: left;
}

.notice-title {
  font-size: 1.5625rem;
  line-height: 1.1;
  font-family: Lora;
  font-style: italic;
  overflow: visible;
  word-wrap: normal;
  white-space: normal;
  margin-left: 43px;
  padding-top: 4px;
  min-height: 1.5625rem;
}

.notice:not(:first-child) {
  margin-left: 1em
}

.notice-details,
.notice-detail {
  list-style: none;
  margin: 0;
  padding: 0;
}

.notice-detail {
  border-bottom: 1px dashed #D2D2D2;
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  display: flex;
}

.notice-detail-header {
  width: 30%;
  padding-top: 0.125rem;
  color: #828282;
  font-style: italic;
}

.notice-detail-content {
  font-family: Montserrat;
  text-transform: uppercase;
  line-height: 1.4;
}
</style>


<script>
import NoticeBody from './NoticeBody'

export default {
  name: 'notice',
  props: ['notice', 'column'],
  components: {
    NoticeBody
  },
  computed: {
    column_name: function () {
      switch (this.column) {
        case 'column_one':
          return 'A'
        case 'column_two':
          return 'B'
        case 'column_three':
          return 'C'
      }
    }
  }
}
</script>
