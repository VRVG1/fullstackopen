const Message = ({ message }) => {
  if (message === null) {
    return
  }
  if (message.includes("failed") || message.includes("Removed")) {
    return (
      <div className="message-container-error">
        <h2>{message}</h2>
      </div>
    )
  }
  return (
    <div className="message-container">
      <h2>{message}</h2>
    </div>
  )
}

export default Message
