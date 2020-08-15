const { style } = require('./consoleStyle')

const action = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(style.FgBlue, '📘:', ...params, style.Reset)
  }
}

const success = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(style.FgGreen, '📗:', ...params, style.Reset)
  }
}

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(style.FgWhite, ...params, style.Reset)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(style.FgRed, '📕:', ...params, style.Reset)
  }
}

module.exports = {
  action,
  success,
  info,
  error,
}
