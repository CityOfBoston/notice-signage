<template>
  <div class="notice-body">
    <div class="notice-body-content" v-html="body"></div>
    <ol>
      <div v-for="drawer in drawers">
        <div v-html="drawer"></div>
      </div>
    </ol>
  </div>
</template>

<style scoped>
.notice {
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #ffc;
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
