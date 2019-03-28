import myLibrary from './my-library'

document.body.innerHTML = '<div id="root"></div>'

describe('myLibrary', () => {
  it('render library wrapper inside trigger div', () => {
    const myLib = new myLibrary('#root')
    expect(document.body.innerHTML).toBe('<div id="root"><div id="counter">0</div><button id="btn">Counter</button></div>')
  })

  it('start counter with 0', () => {
    const myLib = new myLibrary('#root')
    const counter = document.getElementById('counter').innerHTML
    expect(parseInt(counter)).toBe(0)
  })

  it('when click on button, counter is 1', () => {
    const myLib = new myLibrary('#root')
    myLib.updateCounter()
    const counter = document.getElementById('counter').innerHTML
    expect(parseInt(counter)).toBe(1)
  })
})
