import React, { useContext, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { handleGoogleSignIn, initializeLoginFramework,handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, handleFbSignIn, resetPassword,storeAuthToken } from './LoginManager';
import google from './google.png'
import fb from './fb.png'
import { Button } from '@material-ui/core';
import './Login.css'
import { Container, Form, FormControl } from 'react-bootstrap';
import { UserContext } from '../../App';
import './Login.css';

initializeLoginFramework()


function Login() {
  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  });



  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
          setUser(res);
          setLoggedInUser(res);
          storeAuthToken();
          history.replace(from);
      })
  }


  const fbSignIn = () =>{
    handleFbSignIn()
    .then(res => {
      setUser(res);
      setLoggedInUser({...res});
      history.replace(from);
      console.log(res);
    })
    .catch(err => console.log(err));
  }




  const handleSubmit = (e) => {
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res =>{
        setUser(res);
        setLoggedInUser(res);
        // console.log(res)
        history.replace(from);
      })
    }

    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email , user.password)
      .then(res => {
        setUser(res);
        // console.log(res)
        setLoggedInUser(res);
        history.replace(from);
      })  
    }
    e.preventDefault();
  }


  const handleBlur = (event) => {
    let isFormValid = true;
    if(event.target.name === 'email'){
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 2;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid 
    }
    if(isFormValid){
      const newUserInfo = {...user}
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  return (
    <Container className="text-center text-dark">
        <div id="login" className="mx-auto p-5 rounded" style={{textAlign: 'center'}}>
          <Form onSubmit={handleSubmit}>
                    <h3 className="my-4">{newUser ? 'Create an account' : 'Login'}</h3>
                    {
                        newUser && <div>
                          <FormControl onBlur={handleBlur} name="name" type="text" placeholder="First Name" className="my-3 bg-light" required />
                          <FormControl name="name" type="text" placeholder="Last Name" className="my-3 bg-light" required />
                          </div>
                    }

                    <FormControl onBlur={handleBlur} name="email" type="email" placeholder="Email" className="my-3 bg-light" required />

                    <FormControl onBlur={handleBlur} name="password" type="password" placeholder="Password" className="my-3 bg-light" required />
                    {newUser ?
                      <FormControl onBlur={handleBlur} name="password" type="password" placeholder="Confirm Password" className="my-3 bg-light" required />
                      : ''}
                    <h6>{newUser ? 'Password must be atleast 5 letter and atleast 1 number ' : '' }</h6>
                    <p onClick={resetPassword(user.email)}>{newUser ? ''  : 'Forgot Password'}</p>

                    <button className="btn-warning btn-sm" type="submit">{newUser ? 'Create an Account' : 'Login'}</button>

                    <span className="btn btn text-dark btn-block w-100 mx-auto" onClick={()=>{
                        setNewUser(!newUser);
                        setUser({
                            signed: false,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                        });
                    }}>
                        {
                            newUser ?
                            "Already Have an account? Login" :
                             "Don't have an account? Create an account"
                        }
                    </span>
                </Form>
                    <hr className="bg-white" />
                    
                    <Button variant="outlined" className="my-3 rounded-pill" onClick={googleSignIn}>
                        <img src={google} className="icon" alt=""/>
                        <h6  className='mt-1'>Sign in with Google</h6>
                    </Button>
                    <br/>
                    <Button variant="outlined" className="rounded-pill" onClick={fbSignIn} >
                        <img src={fb} className="icon" alt=""/>
                        <h6 className='mt-2'>Sign in with Facebook</h6>
                    </Button>
        </div>
      </Container> 
  );
}

export default Login;
