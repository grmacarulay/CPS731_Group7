import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"
import React from "react";
import ReactDOM from "react-dom";

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

<<<<<<< Updated upstream
// Listen for auth changes
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log('user logged in: ', user)
  } else {
    console.log('user logged out')
=======
//----- React code -----

// Nav bar on top of page
const MyNavBar = props => {

  const isLoggedIn = props.authState;

  return (
    <Navbar bg="light" expand="lg">

      <Navbar.Brand href="#home">Ingredientory</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        { // Change button depending on auth state
          isLoggedIn ? <SignOutButton /> : <SignInButton />}
      </Navbar.Collapse>

    </Navbar>
  )
};

// Sign in button will show a modal
// This modal contains a button to sign up, clicking this modal will cause the form to change
const SignInButton = props => {

  // ----- Set up state hooks ------

  // Keep track whether user is signing in or signing up
  const [isSigningIn, setSigningIn] = useState(true);
  const toggleForms = () => setSigningIn(!isSigningIn);

  // For showing/hiding the modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSigningIn(true);
    setShow(false);
  }
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>Sign In</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign{isSigningIn ? ' in to ': ' up for '}Ingredientory</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isSigningIn ? <SignInForm /> : <SignUpForm />}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleForms}>
            {isSigningIn ? 'Not a member? Sign Up' : 'Already a member? Sign in'}
          </Button>
        </Modal.Footer>

      </Modal>

    </>
  )
}

const SignUpForm = props => {

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

  // For name text
  const [firstName, setFirstName] = useState('');
  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
  }

  const [lastName, setLastName] = useState('');
  const handleLastNameChange = event => {
    setLastName(event.target.value);
  }

  const submitForm = event => {
    auth.createUserWithEmailAndPassword(email, password)
      .then(userCredential => {

        console.log("Created user:", userCredential.user.email);

        db.collection("users")
          .add({
            first_name: firstName,
            last_name: lastName,
            user_id: userCredential.user.uid,
            date_created: new Date(),
          })
          .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
        });

      }).catch(error => {
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

    event.preventDefault();
  }


  return (
    <Form onSubmit={submitForm}>
      <Form.Group controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange} />
      </Form.Group>

      <Form.Group controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="John" onChange={handleFirstNameChange} />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" onChange={handleLastNameChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
  )
}

const SignInForm = props => {

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

  const submitForm = event => {
    //alert('A form was submitted');

    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("Logged in as: ", auth.currentUser.email)
      })
      .catch(error => {
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

    //console.log(email, ' ', password);
    event.preventDefault();
>>>>>>> Stashed changes
  }

});

// React code
const hello = <div> Hello React, Webpack 4 & Babel 7!</div>;
ReactDOM.render(hello, document.querySelector("#react"));
// End React code






// Add button listeners
const signUpButton = document.querySelector("#sign-up-button")
  .addEventListener("click", handleSignUp);

<<<<<<< Updated upstream
const signInButton = document.querySelector('#sign-in-button')
  .addEventListener('click', handleSignIn);
=======

 // grabs values within a collection (just outputs into console)
  db.collection('ingredients').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
      console.log(doc.data().ingredient_name);
    })
  })



  // For search bar query
  const [query, setQuery] = useState('');
  const handleQueryChange = (text, event) => {
    setQuery(text);
  }
>>>>>>> Stashed changes

const signOutButton = document.querySelector('#sign-out-button')
  .addEventListener('click', handleSignOut);

<<<<<<< Updated upstream
const addDatabaseButton = document.querySelector("#add-database")
  .addEventListener("click", addDatabase);
=======
  const handleSearch = () => {
    console.log('You have search for: ', selected.toString());
  }

  // Stub, get from database in handleQueryChange
  var options = [
    'Lettuce',
    'Tomato',
    'Onion',
    'Bun',
  ];
>>>>>>> Stashed changes


function testing() {
  alert('click')
}

//Initialize user and password.
var email;
var password;
var first_name;
var last_name;

function handleSignUp() {
  email = document.querySelector("#email1-input-field").value;
  password = document.querySelector("#password1-input-field").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(function () {
      console.log("Saved");
    }).catch (function (error) {
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

function handleSignIn() {
  email  = document.querySelector("#email1-input-field").value;
  password = document.querySelector("#password1-input-field").value;

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
  auth.signOut().then(function() {
    alert('Successfully Signed Out');
  }).catch(function (error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage);
    console.log(error);
  })
}

var userid;
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    userid = user.uid;
  } else {
    // User not logged in or has just logged out.
  }
});

//Add Database Text.
function addDatabase() {

  email  = document.querySelector("#email-input-field").value;
  password = document.querySelector("#password-input-field").value;
  first_name= document.querySelector("#firstName-input-field").value;
  last_name = document.querySelector("#lastName-input-field").value;
  var d= new Date();

  db.collection("users").add({
    first_name: first_name,
    last_name: last_name,
    user_id: userid,
    date_created: d,
    email:email,
    password:password
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
