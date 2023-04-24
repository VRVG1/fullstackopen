const Input = ({ label, name, onChange, value }) => {
  return (
    <>
      <label for={name}>{label}</label>
      <input type="text" name={name} onChange={onChange} value={value} />
    </>
  )
}

export default Input
