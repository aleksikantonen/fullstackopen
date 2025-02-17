const Notification = ({ errorMessage, successMessage }) => {
  if (!errorMessage && !successMessage) {
    return null
  }

  if (errorMessage) {
    return (
      <div className="error">
        {errorMessage}
      </div>
    )
  }

  if (successMessage) {
    return (
      <div className="success">
        {successMessage}
      </div>
    )
  }
}

export default Notification