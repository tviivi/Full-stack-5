import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
    return (
        <div>

            <h2>Log in to application:</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
  <input
                        type="text"
                        name="username"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    password
  <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm