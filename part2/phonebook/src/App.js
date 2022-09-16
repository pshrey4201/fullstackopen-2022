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
      window.alert(`${newName} is already added to phonebook`)
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
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
