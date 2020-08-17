let nameInput = document.getElementById(`nameInput`)
let textInput = document.getElementById(`textInput`)
let loadButton = document.getElementById(`loadButton`)
let saveButton = document.getElementById(`saveButton`)
let deleteButton = document.getElementById(`deleteButton`)
let responseParagraph = document.getElementById(`responseParagraph`)

loadButton.addEventListener(`click`, loadClipboard)
saveButton.addEventListener(`click`, saveClipboard)
deleteButton.addEventListener(`click`, deleteClipboard)

function loadClipboard() {
  let request = new XMLHttpRequest()
  request.addEventListener(`load`, showResponse)
  request.open(`GET`, `/load?name=${nameInput.value}`)
  request.send()
}

function saveClipboard() {
  let request = new XMLHttpRequest()
  request.addEventListener(`load`, showResponse)
  request.open(`POST`, `/save`)
  request.setRequestHeader(`Content-Type`, `application/json`)

  let requestBody = {
    name: nameInput.value,
    text: textInput.value
  }

  request.send(JSON.stringify(requestBody))
}

function deleteClipboard() {
  let request = new XMLHttpRequest()
  request.addEventListener(`load`, showResponse)
  request.open(`POST`, `/delete`)
  request.setRequestHeader(`Content-Type`, `application/json`)

  let requestBody = {
    name: nameInput.value
  }

  request.send(JSON.stringify(requestBody))
}

function showResponse() {
  responseParagraph.innerHTML = this.response
}