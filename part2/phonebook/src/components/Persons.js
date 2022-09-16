const Persons = ({ persons, filter, }) => {
  return (
    <>
      {
        persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => <div key={person.id}>{person.name} {person.number}</div>)
      }
    </>
  )
}

export default Persons
