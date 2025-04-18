import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      changeNumber(persons.find(person => person.name === newName).id, newNumber)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccessMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          if (error.response && error.response.data) {
            console.log(error.response.data)
            setErrorMessage(`Error ${error.response.status}: ${error.response.data.error}`)
          } else {
            console.log('Error:', error.message)
            setErrorMessage('An error occurred while adding the person')
          }
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }

  const changeNumber = (id, newNumber) => {
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person, number: newNumber }
    personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setSuccessMessage(
          `Changed ${person.name} number to ${newNumber}`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log('Error updating:', error)
        if (error.response && error.response.data) {
          setErrorMessage(`Error ${error.response.status}: ${error.response.data.error}`)
        } else {
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setPersons(persons.filter(p => p.id !== id))
        }
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setSuccessMessage(
            `Removed ${person.name}`
          )
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          personService
            .getAll()
            .then(updatedPersons => {
              setPersons(updatedPersons)
            })
        })
        .catch(error => {
          console.log('Error removing:', error.message)
          setErrorMessage(`Error removing ${person.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  const personsToShow = filterName === ''
  ? persons
  : persons.filter(person => 
      person.name && person.name.toLowerCase().includes(filterName.toLowerCase())
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <Filter 
        value={filterName}
        onChange={handleFilterChange}
      />

      <h3>Add a new</h3>
      <PersonsForm
        onSubmit={addPerson}
        nameValue={newName}
        nameChange={handleNameChange}
        numberValue={newNumber}
        numberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons
        personsToShow={personsToShow}
        removePerson={removePerson}
      />
    </div>
  )

}

export default App