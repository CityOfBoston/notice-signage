import Vue from 'vue'
import Countdown from 'src/components/Countdown'

describe('Countdown.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Countdown)
    })

    expect(vm.$el.querySelector('.view'))
  })
})
