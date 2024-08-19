import {Redirect} from 'react-router-dom'
import {useState} from 'react'
import Cookies from 'js-cookie'
import './index.css'

const Login = props => {
  const [username, setUsername] = useState('')

  const [password, setPassword] = useState('')

  const [errorMsg, setErrorMsg] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const onSubmitSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setErrorMsg(errorMsg)
  }

  const onChangeUserName = event => {
    setUsername(event.target.value)
  }

  const onChangeUsername = event => {
    setPassword(event.target.value)
  }

  const onClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div className="bg-container">
      <div className="login-app-container">
        <img
          src="https://res.cloudinary.com/dtnwl3ron/image/upload/v1723392805/rcdwjp5ingfta8hg4kdl.png"
          alt="login website logo"
          className="logo-image"
        />
        <form className="form-container" onSubmit={onSubmitForm}>
          <div className="username-container">
            <label htmlFor="input-text" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="input-text"
              className="input"
              value={username}
              onChange={onChangeUserName}
            />
          </div>
          <div className="password-container">
            <label htmlFor="input-password" className="label">
              PASSWORD
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="input-password"
              className="input"
              value={password}
              onChange={onChangeUsername}
            />
          </div>
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="input-checkbox"
              className="checkbox"
              onClick={onClickShowPassword}
            />
            <label htmlFor="input-checkbox" className="checkbox-label">
              Show Password
            </label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <p className="error-msg">{errorMsg}</p>
        </form>
      </div>
    </div>
  )
}

export default Login
