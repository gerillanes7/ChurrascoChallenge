import React, {useGlobal, useEffect, useState} from 'reactn'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import uuid from 'uuidv4';
import axios from 'axios'
import './Sites.css'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflowY: 'hidden'
    },
    gridList: {
      width: "78%",
      height: '100%',
    },
    icon: {
      color: '#ffffff',
    },
    appBar: {
        backgroundColor: '#2C2C2C'
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: -12
      }
  }));
  


function Sites() {
    const classes = useStyles();

    const [token, setToken] = useGlobal('token')
    const [sites, setSites] = useState([])

    const getSites = () => {
        axios.get('http://churrasco.uk.to:3005/api/sites', { headers: {Authorization: `Bearer ${token}`} })
        .then(res => setSites(res.data.sites))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getSites()
    }, [])

    const logOut = () => {
        localStorage.removeItem('Bearer')
        window.location.reload(false);
    }

    return (
        <div className="containerLogin">
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6">
                        Churrasco Sites
                    </Typography>
                    <Button color="inherit" className={classes.rightToolbar} onClick={() => logOut()}>Log Out</Button>
                </Toolbar>
            </AppBar>
            <div className="infoContainer">
                <Paper variant="outlined" style={{backgroundColor: '#2B0E5B', color: 'white'}}>
                    <Typography variant="h4" component="h3">
                        Welcome to Churrasco Sites!
                    </Typography>
                    <Typography variant="subtitle1">
                        If you want to know where there sites are just click on information icon!
                    </Typography>
                </Paper>
            </div>
            <div className="sitesContainer">
                <div className={classes.root}>
                    <GridList cellHeight={400} className={classes.gridList} cols={3} spacing={10}>
                        {sites.map((site) => (
                        <GridListTile key={uuid}>
                            <img src={site.url_imagen} alt={site.nombre} />
                            <GridListTileBar                           
                            title={site.nombre}
                            subtitle={<span>{site.descripcion}</span>}
                            actionIcon={
                                <Tooltip arrow placement="top" title="Ver en Google Maps">
                                    <IconButton className={classes.icon} href={`https://maps.google.com?q=${site.ubicacion._lat},${site.ubicacion._lon || site.ubicacion._long}`} target="_blank">
                                        <InfoIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                            />
                        </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
            <footer className="footerSite">
                web services under your control
            </footer>
        </div>
    )
}

export default Sites
