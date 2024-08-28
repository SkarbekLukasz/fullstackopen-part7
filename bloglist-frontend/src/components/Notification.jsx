const Notification = ({ message }) => {

  const styles = {
    border: 'solid blue 2px',
    color: 'black',
    backgroundColor: 'grey',
    padding: '4px'
  }

  if(message === null) return null
  return (
    <div>
      <h2 style={styles}>{message}</h2>
    </div>
  )
}

export default Notification