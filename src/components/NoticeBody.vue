<template>
  <div class="notice-body-container">
    <div class="notice-body" ref="body">
      <div class="notice-body-content" ref="content">
        <div class="notice-body-body" v-html="body"></div>
        <ol class="notice-body-list">
          <div v-for="drawer in drawers">
            <div v-html="drawer"></div>
          </div>
        </ol>
      </div>
    </div>
    <div class="notice-meta">
      <div class="notice-pages">1 of {{page_count}}</div>
      <div class="notice-url">boston.gov/public-notices/{{id}}</div>
    </div>
  </div>
</template>

<style>
.notice-body-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.notice-body {
  flex: 1;
  overflow: hidden;
}

.notice-meta {
  display: flex;
  font-size: 0.75rem;
  margin-top: 0.875rem;
  padding-top: 0.875rem;
  border-top: 1px dashed #d2d2d2;
  color: #828282;
}

.notice-pages {
  width: 25%;
}

.notice-url {
  width: 75%;
  text-align: right;
  white-space: nowrap;
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
  data: function () {
    return {
      page_number: 1,
      page_count: 1,
      body_height: 0,
      content_height: 0
    }
  },
  props: ['body', 'drawers', 'id'],
  created: function () {
    // Scroll pages
    window.kyle.$on('change_page', this.change_page)
  },
  updated: function () {
    // Calculate the number of pages.
    this.calculate_pages()
  },
  methods: {
    change_page: function () {
      let pageCount = this.page_count
      let pageNumber = this.page_number
      let scroll = 0

      if (pageCount === pageNumber) {
        console.log('Switch!')
      } else {
        scroll = ((pageNumber * this.body_height) * -1) + 25
        scroll = scroll + 'px'

        this.$refs.content.style.transform = 'translateY(' + scroll + ')'

        this.page_number++
      }
    },

    calculate_pages: function () {
      this.body_height = this.$refs.body.clientHeight
      this.content_height = this.$refs.content.clientHeight

      this.page_count = Math.ceil(this.content_height / this.body_height)
    }
  }
}
</script>
