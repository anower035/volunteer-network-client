import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Body from '../Body/Body.js';
import './Home.css';
import { Container } from '@material-ui/core';
const Home = () => {
    const [events,setEvents] = useState([])
    
    useEffect(() => {
        fetch('https://morning-citadel-53770.herokuapp.com/events')
        .then(res => res.json())
        .then(data =>setEvents(data))
    },[])

    return (
        <Container>
            <h1 style={{textAlign:'center',marginTop:'3%'}}>I GROW BY HELPING PEOPLE IN NEED.</h1>
            <form className="form-inline search searchForm">
                <input className="form-control mr-sm-3 custom-input p-3" type="search" placeholder="Search..." aria-label="search" size='38'/>
                <Link className="btn btn-primary d-block px-4">Search</Link>
            </form>
            <div className="row">
                    {
                        events.map(MainCardContent => <Body key={MainCardContent.name} MainCardContent={MainCardContent}></Body>)
                    } 
            </div>
        </Container>
    );
};

export default Home;