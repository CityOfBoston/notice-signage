<template>
  <li class="notice-item" v-on:click="toggleClass" v-bind:class="{ active: active }">
    <div class="notice-item-container">
      <div class="notice-info">
        <div class="notice-title" v-html="notice.title"></div>
        <div class="notice-location">{{notice.location_street}}<span v-if="notice.location_room">, {{notice.location_room}}</span></div>
      </div>
      <div class="notice-datetime">
        <div class="notice-date" v-html="notice.notice_date"></div>
        <div class="notice-time" v-html="notice.notice_time"></div>
      </div>
    </div>
  </li>
</template>

<style>
  .notice-item {
    margin: 0;
    padding: 0 2rem;
    list-style: none;
    font-size: 1.125rem;
  }

  .notice-item.active {
    background-color: #dedede
  }

  .notice-item.active .notice-date,
  .notice-item.active .notice-time,
  .notice-item.active .notice-location {
    color: #091F2F;
  }

  .notice-item-container {
    padding: 1em 0;
    border-bottom: 1px dashed #d2d2d2;
    display: flex;
    flex-direction: row;
  }

  .notice-info {
    flex: 1;
    padding-right: 1em;
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
    font-size: 1rem;
    font-style: italic;
    color: #828282;
  }

  .notice-date {
    font-size: 1.125rem;
    margin-bottom: 0.25rem;
  }

  .notice-title {
    font-family: Montserrat;
    margin-bottom: 0.25rem;
  }

  .notice-title a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 250px;
    display: block;
    text-decoration: none;
  }
</style>

<script>
export default {
  name: 'notice_item',
  data: function () {
    return {
      active: false
    }
  },
  methods: {
    toggleClass: function () {
      this.active = !this.active
    }
  },
  props: ['notice']
}
</script>
