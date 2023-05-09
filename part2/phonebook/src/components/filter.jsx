const Filter = ({ filterBy, handleOnChangeFilter }) => {
  return (
    <div>
      <label htmlFor="filtro">Filter shown with</label>
      <input
        type="text"
        name="filtro"
        onChange={handleOnChangeFilter}
        value={filterBy.name}
      ></input>
    </div>
  )
}

export default Filter
