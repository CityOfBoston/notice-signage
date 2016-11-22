<template>
  <li class="notice-item" v-bind:class="{ active: active }">
    <div class="notice-item-container">
      <div class="notice-column" v-if="active"><span>{{column}}</span></div>
      <div class="notice-info">
        <div class="notice-title notice-oneline" v-html="notice.title"></div>
        <div class="notice-location">{{notice.location_street}}<span v-if="notice.location_room">, {{notice.location_room}}</span></div>
      </div>
      <div class="notice-datetime" v-if="notice.canceled !== '1'">
        <div class="notice-date" v-html="notice.notice_date"></div>
        <div class="notice-time" v-html="notice.notice_time"></div>
      </div>
      <div class="notice-datetime" v-else>
        <div class="notice-canceled">Canceled</div>
      </div>
    </div>
  </li>
</template>

<style>
  .notice-item {
    margin: 0;
    padding: 0 5%;
    list-style: none;
    font-size: 1.125rem;
    position: relative;
  }

  .notice-canceled {
    text-transform: uppercase;
    color: #FB4D42;
    font-family: Montserrat;
    font-style: normal;
  }

  .notice-item.active {
    background-color: #dedede
  }

  .notice-column {
    position: absolute;
    height: 33px;
    width: 33px;
    border: 2px solid #FB4D42;
    color: #FB4D42;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-family: Montserrat;
    font-weight: bold;
  }

  .notice-item.active .notice-date,
  .notice-item.active .notice-time,
  .notice-item.active .notice-location {
    color: #091F2F;
  }

  .notice-item-container {
    padding: 1.125rem 0;
    border-bottom: 1px dashed #d2d2d2;
    display: flex;
    flex-direction: row;
  }

  .notice-info {
    flex: 1;
    padding-right: 1em;
    padding-left: 50px;
  }

  .notice-datetime {
    flex: 0.6;
    text-align: right;
    white-space: nowrap;
    font-style: italic;
  }

  .notice-date,
  .notice-time,
  .notice-location {
    font-size: 14px;
    font-style: italic;
    color: #828282;
  }

  .notice-date {
    margin-bottom: 0.25rem;
  }

  .notice-title {
    font-family: Montserrat;
    margin-bottom: 0.25rem;
    font-size: 16px;
  }

  .notice-oneline,
  .notice-oneline a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 270px;
    display: block;
    text-decoration: none;
  }

  .notice-title a {
    text-decoration: none;
  }
</style>

<script>
export default {
  name: 'notice_item',
  props: ['notice'],
  data: function () {
    return {
      active: false,
      column: false
    }
  },
  created: function () {
    window.kyle.$on('notice_active', this.checkIfActive)
    window.kyle.$on('notice_inactive', this.inactiveNotice)
  },
  methods: {
    checkIfActive: function (data) {
      if (data.id === this.notice.id) {
        this.active = true
        this.column = data.column
      }
    },

    inactiveNotice: function (data) {
      if (data.id === this.notice.id) {
        this.active = false
        this.column = false
      }
    }
  }
}
</script>
