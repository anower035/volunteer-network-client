import React from 'react';
import imageV from '../../Images/Icons/users-alt 1.png'
import imagePlus from '../../Images/Icons/plus 1.png'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import 'date-fns';
import upload from '../../Images/Icons/cloud-upload-outline 1.png'
import './AdminEvent.css';
import { useForm } from 'react-hook-form';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        maxWidth: 500,
    },
    button: {
        margin: theme.spacing(),
    },
}));

const AdminEvent = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data,e) => {
        console.log(data)
        fetch('https://morning-citadel-53770.herokuapp.com/addEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert('your registration place successfully');
                    console.log('data');
                }
            })
                e.target.reset();    
    };
    const classes = useStyles();
    return (
        <div>
            <section id="main">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 text-center">
                            <Link to="/admin">
                                <div id="vregimg">
                                    <img src={imageV} className="icon" alt="" />
                                    <h5>Volunteer Register List</h5>
                                </div>
                            </Link>
                            <Link to="/addEvent">
                                <div id="vplusimg">
                                    <img src={imagePlus} className="icon" alt="" />
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
                                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                                <div className="d-flex">
                                                                    <div className="ml-3">
                                                                        <label>Event Name</label>
                                                                        <input name="name" type='text' placeholder="Event Name" required ref={register({ required: true })} />
                                                                    </div>
                                                                    <div className="ml-4">
                                                                        <label>Event Date</label>
                                                                        <input name="eventStarts" type='date' required ref={register({ required: true })} />
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3 d-flex">
                                                                    <div  className="ml-3">
                                                                        <label>Description</label>
                                                                        <input name="description" type="text" placeholder="Description" ref={register({ required: true })} />
                                                                    </div>
                                                                    <div className="uploadButton">
                                                                        <label>Banner</label>
                                                                            <label className='btn btn-outline-primary px-3'>
                                                                                <img className="icon" src={upload} alt="" />
                                                                                    Upload Image
                                                                                <input name="pic_url" type="file" ref={register({ required: true })} />
                                                                            </label>
                                                                    </div>
                                                                </div>
                                                                <hr/>
                                                                <div className='d-flex justify-content-end'>
                                                                        <button className="btn btn-primary mt-5 px-4 justify-content-end" type="submit">Submit</button>
                                                                </div>
                                                            </form>
                                                    </Grid>
                                                </Grid>
                                            </Paper>
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