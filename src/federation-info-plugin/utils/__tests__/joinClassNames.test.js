import addClassName from '../joinClassNames'

describe('addClassName', () => {
  it('first empty', () => {
    expect(addClassName('', 'test')).toEqual('test')
    expect(addClassName(null, 'test')).toEqual('test')
    expect(addClassName(undefined, 'test')).toEqual('test')
  })

  it('second empty', () => {
    expect(addClassName('test', '')).toEqual('test')
    expect(addClassName('test', null)).toEqual('test')
    expect(addClassName('test', undefined)).toEqual('test')
  })

  it('both empty', () => {
    expect(addClassName('', '')).toEqual('')
    expect(addClassName(null, null)).toEqual('')
    expect(addClassName(undefined, undefined)).toEqual('')
  })

  it('both non-empty', () => {
    expect(addClassName('test1', 'test2')).toEqual('test1 test2')
  })

  it('multiple classes', () => {
    expect(addClassName('test1', 'test2', 'test3')).toEqual('test1 test2 test3')
  })
})
