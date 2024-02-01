const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
        <div>
          name: <input value={props.nameValue} onChange={props.handleNewName} />
        </div>
        <div>
          phone: <input value={props.phoneValue} onChange={props.handleNewPhone} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    )
}

export default PersonForm