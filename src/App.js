import React, {useGlobal, useEffect, useState} from 'reactn';
import Login from './components/Login'
import Sites from './components/Sites'


function App() {
  const [token, setToken] = useGlobal('token')
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('Bearer') !== "") {
      setToken(localStorage.getItem('Bearer'))
    }
  }, [])

  useEffect(() => {
    if (token) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
  }, [token])

  const isAuthenticated = () => {
    if ( loggedIn ) {
      return (
        <Sites />
      )
    } else {
      return (
        <Login />
      )
    }
  }

  return (
    <div>
      {isAuthenticated()}
    </div>
  );
}

export default App;
