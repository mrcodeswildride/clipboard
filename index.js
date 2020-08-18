let express = require(`express`)
let bodyParser = require(`body-parser`)
let profanity = require(`profanity-middleware`)
let app = express()

let clipboards = {}

app.use(express.static(`public`))
app.use(bodyParser.json())

profanity.setOptions({
  fullyMasked: true
})
app.use(profanity.init)

app.get(`/`, (request, response) => {
  response.sendFile(`${__dirname}/index.html`)
})

app.get(`/load`, (request, response) => {
  let name = request.query.name

  if (name != null) {
    name = name.trim()
  }

  if (name == null || clipboards[name] == null) {
    response.send(`No such clipboard`)
  }
  else {
    response.send(clipboards[name])
  }
})

app.post(`/save`, (request, response) => {
  let name = request.body.name
  let text = request.body.text

  if (name != null) {
    name = name.trim()
  }

  if (text != null) {
    text = text.trim()
  }

  if (name == null || name == ``) {
    response.send(`Clipboard name cannot be blank`)
  }
  else if (text == null || text == ``) {
    response.send(`Clipboard text cannot be blank`)
  }
  else {
    clipboards[name] = text
    response.send(`Clipboard saved`)
  }
})

app.post(`/delete`, (request, response) => {
  let name = request.body.name

  if (name != null) {
    name = name.trim()
  }

  if (name == null || name == ``) {
    response.send(`No such clipboard`)
  }
  else {
    delete clipboards[name]
    response.send(`Clipboard deleted`)
  }
})

app.listen(3021)