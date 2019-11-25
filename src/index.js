// Firebase Imports
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"

// React Imports
import React, { useState } from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import './style.css';

const firebaseConfig = {
  apiKey: "AIzaSyCQiJIXDWoPw9Uc4tpophAapgq7G2am-V0",
  authDomain: "ingredientory.firebaseapp.com",
  databaseURL: "https://ingredientory.firebaseio.com",
  projectId: "ingredientory",
  storageBucket: "ingredientory.appspot.com",
  messagingSenderId: "16706844326",
  appId: "1:16706844326:web:5f2d386536963ddd316667",
  measurementId: "G-1E8MRBE26T"
};
firebase.initializeApp(firebaseConfig);

// Create auth and firestore references
const db = firebase.firestore();
const auth = firebase.auth();

// React code
const MyNavBar = props => {

  // CHANGE (ugly right now but it works)
  const [isLoggedIn, setLoggedIn] = useState(false)

  /* email: test@test.com pass: test123 */
  auth.onAuthStateChanged(function (user) {
    if (user) {
      setLoggedIn(true);
      console.log('user logged in: ', user.email)
    } else {
      setLoggedIn(false);
      console.log('user logged out')
    }
  });
  
  return (
    <Navbar bg="light" expand="lg">

      <Navbar.Brand href="#home">Ingredientory</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        {isLoggedIn ? <SignOutButton /> : <SignInButton />}
      </Navbar.Collapse>

    </Navbar>
  )
};

const SignInButton = props => {

  // ----- Declare ids ------ //
  const emailId = 'email';
  const passwordId = 'password';
  // ------

  // ----- Set up state hooks ------

  // For showing/hiding sign in modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // For email text
  const [email, setEmail] = useState('');
  const handleEmailChange = event => {
    setEmail(event.target.value);
  }
  // For password text
  const [password, setPassword] = useState('');
  const handlePasswordChange = event => {
    setPassword(event.target.value);
  }

  // ------

  // Submission
  const submitForm = event => {
    alert('A form was submitted');
    handleSignIn(email, password);
    console.log(email, ' ', password);
    event.preventDefault();
  }

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>Sign In</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in to Ingredientory</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group controlId={emailId}>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
            </Form.Group>

            <Form.Group controlId={passwordId}>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </Modal.Body>
      </Modal>

    </>
  )
}

const SignOutButton = props => {
  return (
    <>
      <Button variant="outline-success" onClick={handleSignOut}>Sign Out</Button>
    </>
  )
}
    
    
const App = () => {




  return (
    <>
      <MyNavBar />
    </>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));

// End React code

// Add button listeners

/*
const signUpButton = document.querySelector("#sign-up-button")
  .addEventListener("click", handleSignUp);

const signInButton = document.querySelector('#sign-in-button')
  .addEventListener('click', handleSignIn);

const signOutButton = document.querySelector('#sign-out-button')
  .addEventListener('click', handleSignOut);

const addDatabaseButton = document.querySelector("#add-database")
  .addEventListener("click", addDatabase);

  */
function testing() {
  alert('click')
}

function handleSignUp() {
  var email = document.querySelector("#email-input-field").value;
  var password = document.querySelector("#password-input-field").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      console.log("Saved");
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    });
}

function handleSignIn(email, password) {
  //var email = document.querySelector("#email-input-field").value;
  //var password = document.querySelector("#password-input-field").value;

  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);

  });
}

function handleSignOut() {
  auth.signOut().then(function () {
    alert('Successfully Signed Out');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(error);
  })
}

function addDatabase() {
  db.collection("users").add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}

// button.addEventListener("click", function () {
//   const s = textField.value;
//   console.log("Sent " + s);

//   doc.set({
//     text: s
//   }).then(function () {
//     console.log("Saved");
//   }).catch(function (error) {
//     console.log("Error");
//   });

// })
