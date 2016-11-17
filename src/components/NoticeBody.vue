<template>
  <div class="notice-body">
    <div class="notice-body-content" v-html="body"></div>
    <ol class="notice-body-list">
      <div v-for="drawer in drawers">
        <div v-html="drawer"></div>
      </div>
    </ol>
  </div>
</template>

<style>
.notice-body {
  flex: 1;
  overflow: hidden;
}

.notice-body-list {
  margin: 0;
  padding: 0 0 0 1em;
  font-size: 0.875rem;
}

.notice-body .paragraphs-items-field-links {
  margin-bottom: 0.875rem;
}

.notice-body li >  strong:first-child {
  display: block;
  margin-bottom: 0.25rem;
}

.notice-body .detail-item__body > .link-wrapper:before {
  content: '-';
  float: left;
  margin-left: -15px;
}

.notice-body .detail-item__body > .link-wrapper {
  margin-left: 15px;
  margin-top: 0.25rem;
}

.notice-body p {
  margin: 0 0 0.875rem;
}
</style>


<script>
export default {
  name: 'notice_body',
  props: ['body', 'drawers'],
  created: function () {
    console.log(this.el)
  }
}
</script>
