import { useState, useEffect } from 'react'
import axios from 'axios'
import phoneBookService from './components/PhoneBookService'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if(!persons.reduce((includes, person) => (person.name === newName) ? true : includes, false)) {
      const temp = {
        name: newName,
        number: newNumber,
      }
      phoneBookService.create(temp).then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
      })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const temp = persons.filter(person => person.name === newName)[0]
        temp.number = newNumber
        phoneBookService.update(temp).then(response => {
          setPersons(persons.map(person => person.id !== temp.id ? person : response))
          setNewName('')
          setNewNumber('')
        })
      }
    }
  }

  const remove = (id) => {
    if(window.confirm(`Delete ${persons.filter(person => person.id === id)[0].name}?`)) {
      phoneBookService.remove(id).then(response => setPersons(persons.filter(person => person.id !== id)))
    }
  }
  useEffect(() => {
    phoneBookService.getAll().then(response => setPersons(response))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm addName={addName} newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} remove={remove}/>
    </div>
  )
}

export default App
