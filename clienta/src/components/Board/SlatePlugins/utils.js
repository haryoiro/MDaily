export function isMod(event) {
  return ((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey))
}
export function getLength(token) {
  if (typeof token === 'string') {
    return token.length
  } if (typeof token.content === 'string') {
    return token.content.length
  }
  return token.content.reduce((l, t) => l + getLength(t), 0)
}

export default { isMod, getLength }
