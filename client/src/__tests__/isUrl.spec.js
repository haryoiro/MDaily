import isUrl from '../plugins/isUrl'

describe('isUrl', () => {
  it('no protocol', () => {
    const res = isUrl('www.google.com')
    expect(res).toBeFalsy()
  })
  it('http', () => {
    const res = isUrl('http://www.google.com')
    expect(res).toBeTruthy()
  })
  it('https', () => {
    const res = isUrl('https://www.google.com')
    expect(res).toBeTruthy()
  })
  it('http 日本語', () => {
    const res = isUrl('http://日本語.com')
    expect(res).toBeTruthy()
  })
  it('https 日本語', () => {
    const res = isUrl('https://日本語.com')
    expect(res).toBeTruthy()
  })
  it('<script>', () => {
    const res = isUrl('https://<script>alert</script>.com')
    expect(res).toBeFalsy()
  })
})
