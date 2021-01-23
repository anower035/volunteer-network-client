import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imagev from '../../Images/Icons/users-alt 1.png'
import imageplus from '../../Images/Icons/plus 1.png'
import imagedel from '../../Images/Icons/trash-2 9.png'
import './Admin.css';


const Admin = () => {

   const [user, alluser] = useState([]);
   const [userdelete,setuserdelete] = useState(false);

   useEffect(() => {
    fetch('https://morning-citadel-53770.herokuapp.com/alluser')
    .then(res => res.json())
    .then(data => alluser(data));
   },[userdelete])


   function delvol(id){

    fetch(`https://morning-citadel-53770.herokuapp.com/delete/${id}`, {
        method: 'DELETE',
    })
    // .then(res => res.json())
    .then(res => {
        console.log("Deleted Succesfully")
        setuserdelete(!userdelete); 
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
                                    <img src={imagev} className="icon" alt=""/>
                                    <h5>Volunteer Register List</h5>
                                </div>
                            </Link>
                            <Link to="/addevent">
                                <div  id="vplusimg">
                                    <img src={imageplus} className="icon" alt=""/>
                                    <h5>Add Event</h5>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-9 alluserlist">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email ID</th>
                                        <th>Registration Date</th>
                                        <th>Volunteer List</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {
                                    user.map(user => 
                                        <tbody>
                                            <tr>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{(new Date(user.datefill).toDateString('dd/MM/yyyy'))}</td>
                                                <td>{user.volunteerItem}</td>
                                                <td id="vdelimg"><button onClick={()=> delvol(user._id)} type="button" class="btn btn-danger"><img src={imagedel} className="icon" alt=""/></button></td>
                                            </tr>
                                        </tbody>
                                    )
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Admin;