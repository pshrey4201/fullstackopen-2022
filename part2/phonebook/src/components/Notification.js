const Notification = ({ notification, className }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={className}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
