const Login = ({ handleLogin, handlePasswordChange, handleUsernameChange }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <p>username: <input type="text" onChange={handleUsernameChange}/></p>
        <p>password: <input type="password" onChange={handlePasswordChange}/></p>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login