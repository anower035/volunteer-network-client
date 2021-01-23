import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () =>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
        // firebase.analytics()
    }
} 

export const handleGoogleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      console.log(res.user)
      return signedInUser;
    })
    .catch(err =>{
      console.log(err)
    })
  }



  export const handleFbSignIn = () =>{
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      console.log("fb user",user);
      return user;
     
    }).catch(function(error) {
      console.log(error)
      return error;
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  }


  export const createUserWithEmailAndPassword = (name , email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res =>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        updateUserName(name);
        verifyEmail();
        return newUserInfo;
      })
      .catch(error => {
        const newUserInfo = {};
        newUserInfo.error = error.message
        newUserInfo.success = false;
        console.log(error)
        return newUserInfo;
      });
  }

  export const signInWithEmailAndPassword = (email, password) =>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
        const newUserInfo = res.user;
        newUserInfo.error = '';
        newUserInfo.success = true;
        return newUserInfo; 
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message
      newUserInfo.success = false;
      return newUserInfo;
    });
  }


  
  const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,
    }).then(function() {
      console.log('User name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
  const verifyEmail = () =>{
    var user = firebase.auth().currentUser;

      user.sendEmailVerification().then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
  }

  export const resetPassword = email => {
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
  }
  export const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
        sessionStorage.setItem('token', idToken)
      })
      .catch(function(error) {
        // Handle error
      });
}