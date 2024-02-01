import Person from './Person'

const PersonList = ({ persons, handleDelete }) => {
    return persons.map(person => {
        return (
            <div key={person.id} >
            <Person value={person} /> <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>
        )
    })
}

export default PersonList