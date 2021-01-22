import React from 'react';
import imageV from '../../Images/Icons/users-alt 1.png'
import imagePlus from '../../Images/Icons/plus 1.png'
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Form } from 'react-bootstrap';
import 'date-fns';
import TextField from '@material-ui/core/TextField';
import upload from '../../Images/Icons/cloud-upload-outline 1.png'
import './AdminEvent.css';




const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      marginLeft:'5%',
      padding: theme.spacing(2),
      maxWidth: 500,
    },
    button: {
        margin: theme.spacing(1),
    },
  }));

const AdminEvent = () => {
    const classes = useStyles();
    const handleAddEvent=() => {
        const name = document.getElementById("eventName").value
        const pic_url = document.getElementById("eventPic").value
        const description = document.getElementById("eventDescription").value
        const eventStarts = document.getElementById("date").value

        const eventArray = { name, pic_url, description, eventStarts }
        console.log(eventArray);
            fetch('http://localhost:5000/addEvent',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventArray)
            })
            .then(res => res.json())
            .then(data => {
            if(data){
                alert('your registration place successfully');
                console.log(data);
            }
            window.location.reload(false);
        })
   
        }
    return (
        <div>
            <section id="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <Link to="/admin">
                                <div id="vregimg">
                                    <img src={imageV} className="icon" alt=""/>
                                    <h5>Volunteer Register List</h5>
                                </div>
                            </Link>
                            <Link to="/addEvent">
                                <div  id="vplusimg">
                                    <img src={imagePlus} className="icon" alt=""/>
                                    <h5>Add Event</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-9">
                            <table className="table table-striped">
                                <thead> 
                                    <div className="row container-fluid mt-5">
                                            <div className="col-md-2" className={classes.root}>
                                                <Paper className={classes.paper}>
                                                <Grid container spacing={2}>
                                                    <Grid item>
                                                        <Form>
                                                            <div className="d-flex">
                                                                <div className="ml-5">
                                                                    <label>Event Title</label>
                                                                    <form>
                                                                        <input id="eventName" className="form-control mr-sm-3 custom-input p-3" type="text" placeholder="Event Name" a required/>
                                                                    </form>
                                                                </div>
                                                                <div className="ml-5" id='eventDate'>
                                                                    <label>Event Date</label>
                                                                    <form className={classes.container} noValidate>
                                                                        <TextField
                                                                            id="date"
                                                                            type="date"
                                                                            defaultValue="2017-05-24"
                                                                            className={classes.textField}
                                                                            InputLabelProps={{
                                                                            shrink: true,
                                                                            }}
                                                                        />
                                                                    </form>
                                                                </div>
                                                            </div>
                                                            <div className=" mt-3 d-flex">
                                                                <div  className="ml-5">
                                                                    <label>Description</label>
                                                                    <form>
                                                                        <input id="eventDescription" className="form-control mr-sm-3 custom-input p-3" type="text" placeholder="Description" a required/>
                                                                    </form>
                                                                </div>
                                                                <div className="ml-5 uploadButton">
                                                                    <label>Banner</label>
                                                                    <label className="btn btn-outline-primary">
                                                                        <img className="icon" src={upload} alt=""/>
                                                                            Upload Image
                                                                        <input type="file" id='eventPic'/>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </Form>                    
                                                    </Grid>
                                                    </Grid>
                                                </Paper>
                                                <button id="submitButton" className="btn btn-primary mt-5 px-4" onClick={handleAddEvent}>Submit</button> 
                                            </div> 
                                        </div>  
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminEvent;