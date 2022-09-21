require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
morgan.token('data', function getData (req) {
  if(req.method === 'POST') return JSON.stringify(req.body)

  return ' '
})

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/info', (request, response) => {
  response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
    //response.status(404).end()
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const person = {...request.body}

  if (!person.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!person.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  if (persons.filter(p => p.name === person.name).length > 0) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  person.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
  persons = persons.concat(person)
  console.log(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
