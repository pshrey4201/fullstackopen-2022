const Persons = ({ persons, filter, remove }) => {
  return (
    <>
      {
        persons
        .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person => {
            return (
              <div key={person.id}>
                {person.name} {person.number} <button onClick={() => remove(person.id)}>delete</button>
              </div>
            )
          })
      }
    </>
  )
}

export default Persons
