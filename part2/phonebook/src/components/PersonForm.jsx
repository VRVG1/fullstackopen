const PersonForm = ({ addPerson, handleOnChange, value1, value2 }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        <label for="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={handleOnChange}
          value={value1}
        />
      </div>
      <div>
        <label for="number">Number</label>
        <input
          type="text"
          name="number"
          onChange={handleOnChange}
          value={value2}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm
