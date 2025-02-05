const PersonsForm = ({ onSubmit, nameValue, nameChange, numberValue, numberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: 
        <input value={nameValue} onChange={nameChange} />
      </div>
      <div>
        number:
        <input value={numberValue} onChange={numberChange} />
      </div>
      <button type="submit">add</button>
    </form>
  )
}

export default PersonsForm