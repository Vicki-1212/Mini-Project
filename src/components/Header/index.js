import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {HiOutlineLogout} from 'react-icons/hi'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  return (
    <div className="header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dtnwl3ron/image/upload/v1723392805/rcdwjp5ingfta8hg4kdl.png"
          alt="logo"
          className="header-logo"
        />
      </Link>
      <button className="logout-button" type="button" onClick={onClickLogout}>
        Logout
      </button>
      <button
        className="logout-button-sm"
        type="button"
        onClick={onClickLogout}
      >
        <HiOutlineLogout size={25} />
      </button>
    </div>
  )
}

export default withRouter(Header)
