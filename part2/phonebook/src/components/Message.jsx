const Message = ({ message }) => {
  if (message === null) {
    return
  }
  if (
    message.toLowerCase().includes("failed") ||
    message.toLowerCase().includes("removed")
  ) {
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
