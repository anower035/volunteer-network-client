import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Link } from 'react-router-dom';
import './RegistrationList.css';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginLeft:'5%',
      padding: theme.spacing(2),
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
        width: '110%',
        height: '110%',
        borderRadius: '5%',
    },
  }));

const RegistrationList = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [del,setdel] = useState(false);

    useEffect(() => {
        fetch('https://morning-citadel-53770.herokuapp.com/registrations?email='+loggedInUser.email,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}` 
            }
        })
        .then(res => res.json())
        .then(data => setRegistrations(data));
    }, [del])
    console.log(registrations)

    const classes = useStyles();



    function deletevolunteer(id){

        fetch(`https://morning-citadel-53770.herokuapp.com/delete/${id}`, {
            method: 'DELETE',
        })
        // .then(res => res.json())
        .then(res => {
            console.log("Deleted Succesfully")
            setdel(!del); 
        })

    }
    const style = {
        display: 'flex',
        margin: '40px',
        marginLeft: '25%',
        justifyContent: 'space-between'
    }
    return (
        <div style={style}>
            <div>
                <h3>You have: {registrations.length} Registered Item</h3>
            </div>
            <div className="row container-fluid">
                {
                    registrations.map(reg => 
                    <ul>
                        <div className="col-md-2" className={classes.root}>
                            <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <ButtonBase className={classes.image}>
                                        <img className={classes.img} alt="complex" src='https://i.ibb.co/Hp8zwkq/extra-Volunteer.png'/>
                                    </ButtonBase>
                                </Grid>
                                <Grid item xs={12} sm container>
                                    <h5>{reg.volunteerType}</h5>
                                    <Grid item xs container direction="column" spacing={2}>
                                    
                                    </Grid>
                                    <Typography variant="body2" gutterBottom>
                                        {(new Date(reg.datefill).toDateString('dd/MM/yyyy'))}
                                        <br/>
                                        <Button onClick={()=> deletevolunteer(reg._id)}  className="btn btn-outline-warning mt-4">Cancel</Button>
                                    </Typography>
                                </Grid>
                                </Grid>
                            </Paper>
                        </div>
                    </ul>)
                }
            </div>  
        </div>
    );
};

export default RegistrationList;