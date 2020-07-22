import React, {useState, useGlobal } from 'reactn'
import axios from 'axios'
import './Login.css'
import logo from '../assets/LOGO1.png'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import PersonIcon from '@material-ui/icons/Person'
import LockIcon from '@material-ui/icons/Lock'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles, withStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    icon: {
        borderRadius: 3,
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
          outline: '2px auto rgba(19,124,189,.6)',
          outlineOffset: 2,
        },
        'input:hover ~ &': {
          backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
          boxShadow: 'none',
          background: 'rgba(206,217,224,.5)',
        },
      },
      checkedIcon: {
        backgroundColor: '#3c357a',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
          display: 'block',
          width: 16,
          height: 16,
          backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
          content: '""',
        },
        'input:hover ~ &': {
          backgroundColor: '#3c357a',
        },
      },
})

const LoginButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText('#3c357a'),
      backgroundColor: '#3c357a',
      '&:hover': {
        backgroundColor: '#3c357a',
      },
    },
  }))(Button);

function Login() {

    const classes = useStyles();

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [checked, setChecked] = useState(false)
    const [open, setOpen] = useState(false)

    const [token, setToken] = useGlobal('token')

    const headers = {
        'Content-Type': 'application/json',
      }

    const userAuth = () => {
        axios.post('https://cors-anywhere.herokuapp.com/http://churrasco.uk.to:3005/api/auth', 
        {
            "email": username, 
            "password": password
        },
        {
            headers: headers
          })
        .then(res => {
            setToken(res.data)
            localStorage.setItem('Bearer', res.data)
            console.log(localStorage.getItem('Bearer'))
        })
        .catch(err => handleAlert())
    }

    const handleAlert = () => {
        if(username === "" || password === "") {
            setOpen(true)
        }
    }

    const handleCloseAlert = () => {
        setOpen(false)
    }

    const handleCheck = () => {
        if(checked) {
            setChecked(false)
        } else {
            setChecked(true)
        }
    }

    return (
        <div>
            <Grid container
                spacing={0}
                justify="center">
                <Grid item>
                    <img src={logo} className="logo"/>
                    <div style={{maxWidth: '18.75rem', margin: '0 auto'}}>
                        <form>
                            <TextField
                                className="emailInput"
                                required
                                fullWidth
                                id="username"
                                placeholder="Username"
                                name="username"
                                autoFocus
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{
                                    style: {
                                        padding: ".7rem",
                                        border: 'none'
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                          <PersonIcon style={{color: '#CBCBCB'}}/>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <TextField
                                className="passwordInput"
                                required
                                fullWidth
                                name="password"
                                placeholder="Password"
                                type="password"
                                id="password"
                                InputProps={{
                                    style: {
                                        padding: ".7rem",
                                        border: 'none'
                                    },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                          <LockIcon style={{color: '#CBCBCB'}}/>
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="actionsContainer">
                                <Grid item className="remember">
                                    <FormControlLabel                               
                                        label="remember"
                                        control={
                                        <Checkbox checked={checked} onChange={() => handleCheck()}
                                        size="small"
                                        className={classes.root} 
                                        icon={<span className={classes.icon} />}
                                        checkedIcon={<span className={classes.icon, classes.checkedIcon} />}
                                        />}
                                    />
                                </Grid>
                                <Grid item>
                                    <LoginButton variant="contained" className="button" size="large" onClick={() => userAuth()}>
                                        Log in
                                    </LoginButton>
                                </Grid>
                            </div>
                        </form>
                    </div>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}  
                open={open} 
                autoHideDuration={3000}
                onClose={() => handleCloseAlert()}
                message="Ingrese todos los campos por favor"
                />
            <footer className="footerLogin">
                web services under your control
            </footer>
        </div>
    )
}

export default Login
