class myLibrary {
	trigger: string;

  constructor (trigger: string) {
    this.trigger = trigger
    this.renderDiv()
    this.listenClick()
  }

  renderDiv () {
    const div = document.querySelector(this.trigger)
    div!.innerHTML = `<div id="counter">0</div><button id="btn">Counter</button>`
  }

  updateCounter () {
    const div = document.getElementById('counter')
    div!.innerHTML = `${parseInt(div!.innerHTML) + 1}`
  }

  listenClick () {
    const btn = document.getElementById('btn')
    btn!.addEventListener('click', this.updateCounter)
  }
}

export default myLibrary
