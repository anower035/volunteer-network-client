import React from 'react';
import { Link } from 'react-router-dom';
import './Body.css';


const Body = ({ MainCardContent }) => {
    const volunteerItem = MainCardContent.name
    console.log(volunteerItem)
    return (
        <div>
                <Link to={"/registration/"+volunteerItem} className="eventCard d-flex align-items-end" style={{ backgroundImage: `url(${MainCardContent.pic_url})` }}>
                        <div className="eventName">
                            <h3>{MainCardContent.name}</h3>
                        </div>
                </Link>
        </div>
    )};

export default Body;

