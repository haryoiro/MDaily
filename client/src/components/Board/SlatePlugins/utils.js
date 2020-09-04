export function isMod(event) {
  return ((event.ctrlKey && !event.metaKey) || (!event.ctrlKey && event.metaKey))
}