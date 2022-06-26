import React from 'react'

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleLogin}>
      <div>
        username
        <input
          type="text"
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          value={props.password}
          onChange={({ target }) => props.setPassword(target.value)}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm