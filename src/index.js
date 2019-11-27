// Firebase Imports
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"

// React Imports
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// React-Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

// Typeahead
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Custom styles
import './style.css';

// Firbase config
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

      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
  )
}

const SignOutButton = props => {

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        alert('Successfully Signed Out');
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
      })
  }

  return (
    <>
      <Button variant="outline-success" onClick={handleSignOut}>Sign Out</Button>
    </>
  )
}

const SearchBar = props => {

  // For search bar query text
  const [query, setQuery] = useState('');

  // For search bar selections
  const [selected, setSelected] = useState([]);
  const handleSelectedChange = selected => {
    setSelected(selected);
  }

  // For options
  const [options, setOptions] = useState([]);

  // For changes to options
  const [isLoading, setLoading] = useState(false);

  // STUB
  var testData = [
    { ingredient_name: "baking powder" },
    { ingredient_name: "milk" },
    { ingredient_name: "all-purpose flour" },
    { ingredient_name: "salt" },
    { ingredient_name: "white sugar" },
    { ingredient_name: "egg" },
    { ingredient_name: "butter" }
  ];

  const handleQueryChange = query => {
    console.log('handle query')
    setQuery(query);

    // TODO optimize cache to decrease network calls

    // TODO get only a few
    // setLoading(true);
    // db.collection("ingredients").get()
    //   .then(snapshot => {
    //     // Put all docs in an array
    //     var tempOptions = [];
    //     snapshot.docs.forEach(doc => {
    //       tempOptions.push(doc.data());
    //     })
    //     setOptions(tempOptions);
    //     setLoading(false);
    //   }
    // );

    // STUB, simulates above to save on data
    setLoading(true);
    setOptions(testData);
    setLoading(false);
  }
  
  // For testing: Print query to console
  // Sidenote: do not read query in handleQueryChange because setQuery is async
  useEffect(
    () => {
      //console.log(query);
    }, [query]
  );

  // TODO
  const handleSearch = () => {
    console.log('You have search for: ');
    console.log(selected);
  }

  return (
    <>
      <AsyncTypeahead                   // Async because we are querying database for suggestions
        id='search bar'
        placeholder="Type an ingredient"
        labelKey="ingredient_name"
        multiple
        promptText=''
        isLoading={isLoading}
        minLength={1}                   // Length of query before options will show
        options={options}               // The suggestions
        onSearch={handleQueryChange}    // Fires when the user types something
        onChange={handleSelectedChange} // Fires when the user selects or deselects
      />

      <Button variant="primary" onClick={handleSearch}>
        Search
      </Button>
    </>
  )
}

const App = () => {

  // Save authentication state (whether user is logged in or not)
  const [isLoggedIn, setLoggedIn] = useState(false)

  // Bind an function to auth object that runs when there is a change in auth state
  /* email: test@test.com pass: test123 */
  auth.onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
      // console.log('user logged in: ', user.email)
    } else {
      setLoggedIn(false);
      // console.log('user logged out')
    }
  });

  return (
    <>
      <MyNavBar authState={isLoggedIn} />
      <SearchBar/>
    </>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));

//----- End React code ------

function testing() {
  alert('hi')
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
