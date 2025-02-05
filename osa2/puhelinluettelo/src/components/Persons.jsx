import Person from './Person'

const Persons = ({ personsToShow }) => {
  console.log(personsToShow)
  return (
    <div>
      {personsToShow.map(person =>
      <Person key={person.name} person={person} />
      )}
    </div>
  )
}

export default Persons