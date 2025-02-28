import Person from './Person'

const Persons = ({ personsToShow, removePerson }) => {
  return (
    <div>
      {personsToShow.map(person =>
        <Person
          key={person.name} 
          person={person}
          removePerson={removePerson}
        />
      )}
    </div>
  )
}

export default Persons