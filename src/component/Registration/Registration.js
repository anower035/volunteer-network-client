import React, { useContext, useState } from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { Container, Form, FormControl } from 'react-bootstrap';
import './Registration.css';
import { makeStyles } from '@material-ui/core';




const useStyles = makeStyles({
    root: {
      "& .MuiInputBase-root": {
        padding: 0,
        "& .MuiButtonBase-root": {
          padding: 0,
          paddingLeft: 10,
          marginRight: 15,
        },
        "& .MuiInputBase-input": {
          padding: 15,
          paddingLeft:10,
          paddingRight:96,
          border:"none"
        },
        "& .MuiInputBase-input : focus": {
            borderColor:'none'
        }
      }
    }
  });


const Registration = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {volunteerItem} = useParams();
    const [selectedDate, setSelectedDate] = useState({
        datefill : new Date()
    });
    
    const classes = useStyles();

    const handleDateChange = (date) => {
        const newDates ={...selectedDate}
        newDates.datefill = date;
        
        setSelectedDate(newDates);
    };

    const handleRegistration = () => {
        const description = document.getElementById('description').value;
        const registersDetails = {...loggedInUser, ...selectedDate,volunteerItem,description};
        fetch('https://morning-citadel-53770.herokuapp.com/addRegisters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registersDetails)
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                alert('your registration place successfully');
            }
        })

    }
 
    return (
        <div style={{textAlign: 'center'}}>

            <Container className="text-center text-dark">
                <div id="login" className="mx-auto rounded" style={{textAlign: 'center'}}>
                    <Form>
                        <h3>Register as a Volunteer</h3>
                        <div>
                            <FormControl name="name" type="text" placeholder="Full Name" defaultValue={loggedInUser.name} className="my-3 bg-light" required />
                            <FormControl name="name" type="text" placeholder="Email" defaultValue={loggedInUser.email} className="my-3 bg-light" required />
                            <Form className="my-3 bg-light dated" required>

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            className={classes.root}
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Date"
                                            format="MM/dd/yyyy"
                                            value={selectedDate.datefill}
                                            InputAdornmentProps=
                                                {{ 
                                                    position: "end",
                                                    underline:"false",
                                                    
                                                }}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label":"change-date"
                                            }}
                                        />
                                        </Grid>
                                    </MuiPickersUtilsProvider>

                            </Form>
                            <FormControl id="description" name="name" type="text" placeholder="Description" className="my-3 bg-light" required />
                            <FormControl name="name" type="text" placeholder="Organize books at the library" defaultValue={volunteerItem} className="my-3 bg-light" required /> 
                        </div>
                        <Link to="/registrationList" style={{ textDecoration: 'none'}}>
                            <button onClick={handleRegistration} variant="light" className="btn btn-primary my-3 mt-5 d-block w-100 p-1 regButton">
                                <h6  className="pt-1">Registration</h6>
                            </button>
                        </Link>
                    </Form>
                </div>
            </Container>             
        </div>
    );
};

export default Registration;