import React, { useState, useEffect } from 'react'
import personsService from './services/persons'
import './index.css'

const Filter = ({newFilter, setNewFilter}) => {

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      filter shown with<input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({persons, setPersons, newName, newNumber, setNewName, setNewNumber, setNewMessage, setError}) => {

  const addName = (event) => {
    event.preventDefault()

    const index = persons.findIndex(person => person.name === newName)

    if (index !== -1) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const person = persons.find(p => p.name === newName)
        const id = person.id
        const changedPerson = {...person, number: newNumber}

        personsService
          .update(id, changedPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== id ? person : response.data))
          })
        setNewMessage(`Changed ${changedPerson.name}`)
        setError(false)
        setTimeout(() => { setNewMessage(null) }, 5000)
      }
    } else {

      const newPerson = {
        name: newName, 
        number: newNumber
      }


      personsService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
      setNewMessage(`Added ${newPerson.name}`)
      setError(false)
      setTimeout(() => { setNewMessage(null) }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input 
          value={newName}
          onChange={handleNameChange}
          />
      </div>
      <div>
        number: <input 
        value={newNumber} 
        onChange={handleNumberChange}
        /> 
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons, setPersons, newFilter, setNewMessage, setError}) => {
  const personsToShow = newFilter
    ? persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    : persons

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(response => 
        {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setPersons(persons.filter(person => person.id !== id))
          setNewMessage(`Information of ${name} was already deleted from the server`)
          setError(true)
          setTimeout(() => {setNewMessage(null)}, 5000)
        })
    }
  }

  return (
    <div>
      {personsToShow.map(person => <p key={person.name}>{person.name} {person.number}<button onClick={() => handleDelete(person.id, person.name)}>delete</button></p>)}
    </div>
  )
}

const Notification = ({message, isError}) => {
  if (message === null) {
    return null
  }
  if (isError) {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  return (
    <div className="notif">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setNewMessage ] = useState(null)
  const [ isError, setError ] = useState(true)

  useEffect(() => {
    personsService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
    }, [])
  
 return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={message} isError={isError}/>
        <Filter newFilter={newFilter} setNewFilter={setNewFilter} />
      <h3>add a new</h3>
      <PersonForm 
        persons = {persons} newName={newName} newNumber={newNumber} 
        setPersons = {setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setNewMessage={setNewMessage} setError={setError}/>
      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons} newFilter={newFilter} setNewMessage={setNewMessage} setError={setError}/>
    </div>
  )
}

export default App
