const dayjs = require('dayjs')

const today = dayjs().locale('ja').format('YYYY-MM-DD hh:mm')
const slateInitialValue = {
  title: today,
  contents: {
    text:
      [{
        children: [{
          type: 'h1',
          children: [{ text: 'title' }],
        }, {
          type: 'paragraph',
          children: [{
            text: 'Hi',
          }],
        }],
      }],
  },
}

module.exports = {
  slateInitialValue,
}
