let express = require(`express`)
let profanity = require(`profanity-middleware`)
let app = express()

let clipboards = {}

app.use(express.static(`public`))
app.use(express.json())

profanity.setOptions({
  fullyMasked: true,
})
app.use(profanity.init)

app.get(`/`, (request, response) => {
  response.sendFile(`${__dirname}/index.html`)
})

app.get(`/load`, (request, response) => {
  let name = request.query.name
  name = name == null ? `` : name.trim()

  if (clipboards[name] == null) {
    response.send(`No such clipboard`)
  } else {
    response.send(clipboards[name])
  }
})

app.post(`/save`, (request, response) => {
  let name = request.body.name
  name = name == null ? `` : name.trim()

  let text = request.body.text
  text = text == null ? `` : text.trim()

  if (name == ``) {
    response.send(`Clipboard name cannot be blank`)
  } else if (text == ``) {
    response.send(`Clipboard text cannot be blank`)
  } else {
    clipboards[name] = text
    response.send(`Clipboard saved`)
  }
})

app.post(`/delete`, (request, response) => {
  let name = request.body.name
  name = name == null ? `` : name.trim()

  if (clipboards[name] == null) {
    response.send(`No such clipboard`)
  } else {
    delete clipboards[name]
    response.send(`Clipboard deleted`)
  }
})

app.listen(3011)
