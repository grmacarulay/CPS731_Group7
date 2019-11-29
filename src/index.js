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

import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Dropdown from "react-bootstrap/Dropdown";

// Typeahead
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

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
  const isMain = props.isMain;

  let brand = null;

  console.log('navbar')
  if (isMain) {
    brand =
      <Navbar.Brand href="#home">
        <img src="\src\images\chef.svg" width="40" height="40" className="d-inline-block align-top" />
        {' '}
        <b className="staatliches">Ingredientory</b>
      </Navbar.Brand>
  }

  return (
    <Navbar sticky="top" expand="lg" bg='light'>
      {brand}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />


      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end ">

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
      <Button variant="primary" onClick={handleShow} className="staatliches">Sign In</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="staatliches">Sign{isSigningIn ? ' in to ' : ' up for '}Ingredientory</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isSigningIn ? <SignInForm /> : <SignUpForm />}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={toggleForms} className="staatliches">
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
        <Form.Label className="staatliches">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} className="oswald" required />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label className="staatliches">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={handlePasswordChange} className="oswald" required />
      </Form.Group>

      <Form.Group controlId="firstName">
        <Form.Label className="staatliches">First Name</Form.Label>
        <Form.Control type="text" placeholder="John" onChange={handleFirstNameChange} className="oswald" required />
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label className="staatliches">Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" onChange={handleLastNameChange} className="oswald" required />
      </Form.Group>

      <Button variant="primary" type="submit" className="staatliches">
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
        <Form.Label className="staatliches">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} className="oswald" required />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Label className="staatliches">Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={handlePasswordChange} className="oswald" required />
      </Form.Group>

      <Button variant="primary" type="submit" className="staatliches">
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
      <Button variant="secondary" onClick={handleSignOut} className="staatliches">Sign Out</Button>
    </>
  )
}

const MainPage = props => {

  const onIngredientsChange = props.onIngredientsChange;
  const onPageChange = props.onPageChange;

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <img src="/src/images/Logo.png"
          alt=""
          width="1000px"
          height="300px"
          className="responsive-image"
        />
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <SearchBar
            page="main"
            onPageChange={onPageChange}
            onIngredientsChange={onIngredientsChange} />
        </Col>
      </Row>
    </Container>

  )
}

const SearchBar = props => {

  const onIngredientsChange = props.onIngredientsChange;

  // For search bar query text
  const [query, setQuery] = useState('');

  // For search bar selections
  const handleSelectedChange = selected => {
    onIngredientsChange(selected);
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
    props.onPageChange("results");
  }

  var typeahead =
    <AsyncTypeahead className="oswald"               // Async because we are querying database for suggestions
      id='search bar'
      placeholder="Type an ingredient ..."
      labelKey="ingredient_name"
      multiple
      promptText=''
      isLoading={isLoading}
      minLength={1}                   // Length of query before options will show
      options={options}               // The suggestions
      onSearch={handleQueryChange}    // Fires when the user types something
      onChange={handleSelectedChange} // Fires when the user selects or deselects
      bsSize="large"
      required
    />

  var button = <Button onClick={handleSearch} className="search-btn staatliches">Search</Button>

  var page = props.page;

  return (
    <>
      {(page === "main") ?
        <Container fluid>
          <Row>
            <Col>
              {typeahead}
            </Col>
          </Row >
          <Row className="justify-content-center align-items-center top-padding">
            {button}
          </Row>
        </Container>
        :
        <Container fluid>
          <Row className="justify-content-center align-items-center">
            <Col md={9} className="align-items-mcenter">
              {typeahead}
            </Col>
            <Col>
              <Button onClick={handleSearch} className="search-btn staatliches">Search</Button>
            </Col>
          </Row>
        </Container>
      }


    </>
  )
}

const FilterCard = props => {

  const label = props.label;
  const items = props.items
  const eventKey = props.eventKey

  const onChangeFilters = props.onChangeFilters;

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} className="text-center" eventKey={eventKey}>
          {label}
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>
            <Form>
              {
                Object.keys(items).map(type => {
                  return (
                    <Form.Check
                      custom
                      onChange={onChangeFilters(label)}
                      name={type}
                      type='checkbox'
                      label={type}
                      key={`${type}-checkbox`}
                      id={type} />
                  )
                })
              }
            </Form>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}

const SelectedIngredientsCard = props => {

  const selected = props.selected;
  const eventKey = props.eventKey;

  return (
    <>
      <Card>
        <Accordion.Toggle as={Card.Header} className="text-center" eventKey={eventKey} >
          Ingredients
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body>
            {
              selected.map(ingredient => {
                return (
                  <Button variant="primary" key={`${ingredient}-badge`}>{ingredient}<Badge >x</Badge> </Button>
                )
              })
            }
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  )
}

const SortOptions = props => {

  const options = props.options
  const handleOnSelect = props.onSelectSort

  return (
    <Dropdown onSelect={handleOnSelect}>
      <Dropdown.Toggle>
        Sort by
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {
          options.map((option, index) => {
            return (<Dropdown.Item name={option} key={`${option}-sortOption`}>{option}</Dropdown.Item>)
          })
        }
      </Dropdown.Menu>

    </Dropdown>
  )
}

const FiltersSideBar = props => {

  const filters = props.filters;
  const selected = props.selected;
  const onChangeFilters = props.onChangeFilters;

  return (
    <>
      <Nav defaultActiveKey="/home" fill className="yellow flex-column sidebar">
        <Accordion>
          <SelectedIngredientsCard selected={selected} eventKey={0} />
          {
            Object.keys(filters).map((item, index) => {
              return (
                <FilterCard
                  label={item}
                  onChangeFilters={onChangeFilters}
                  items={filters[item]}
                  eventKey={index + 1}
                  key={`${item}-filterCard`} />)
            })
          }

        </Accordion>
      </Nav>
    </>
  )
}



const ResultsPage = props => {

  const onPageChange = props.onPageChange;
  const onIngredientsChange = props.onIngredientsChange;
  const selectedIngredients = props.selectedIngredients;

  // Test
  Object.values(selectedIngredients).map(value => {
    console.log(value)
  })

  // Hard Coded
  const selected = ['Milk', 'Baking Powder', 'Butter', 'All-purpose Flour', 'Salt', 'White Sugar', 'Egg']

  var mealTypes = ['Snack', 'Breakfast', 'Lunch', 'Brunch', 'Dinner']
  var cookingMethods = ['Grilling', 'Roasting', 'Frying', 'Baking']
  var dietaryRestrictions = ['Vegetarian', 'Halal', 'Lactose-Free', 'Kosher']
  var ethnicities = ['Italian', 'Indian', 'Chinese', 'French', 'Filipino']

  var sortOptions = ['Rating', 'Time', 'Spice Level']

  var filterList = {
    'Meal Types': mealTypes,
    'Cooking Methods': cookingMethods,
    'Dietary Restrictions': dietaryRestrictions,
    'Ethnicities': ethnicities,
  }

  const initializeFilters = filters => {
    var initialFilters = {}

    Object.keys(filters).map(filter => {
      var temp = {}
      filters[filter].map(item => {
        temp[item] = false;
      })
      initialFilters[filter] = temp;
    })

    return (initialFilters)
  }

  // Filter States
  const [filters, setFilters] = useState(initializeFilters(filterList));
  const handleFilterChange = filter => event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setFilters(prevState => {
      prevState[filter][name] = value;
      return (prevState)
    });
    console.log(filters)
  }

  // Sort States
  const [sort, setSort] = useState('Rating')
  const onSelectSort = (eventKey, event) => {
    setSort(event.target.name)
  }

  // Print whenever sort changes
  useEffect(() => {
    console.log(sort)
  }, [sort])

  return (
    <Container fluid >
      <Row noGutters>
        <Col md={2}>
          <FiltersSideBar selected={selected} filters={filters} onChangeFilters={handleFilterChange} />
        </Col>

        <Col md={10}>

          <Row noGutters className="align-items-center justify-content-center">
            <Col>
              <SearchBar
                onpage="results"
                onPageChange={onPageChange}
                onIngredientsChange={onIngredientsChange}/>
            </Col>

            <Col md={3}>
              <SortOptions options={sortOptions} onSelectSort={onSelectSort}/>
            </Col>
          </Row>

          <Row noGutters>
            <Col md={12} className="right">
              <Card>
                <Card.Header>
                  Hello
                </Card.Header>
              </Card>
            </Col>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}



const App = () => {

  // Save authentication state (whether user is logged in or not)
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Is it being used in the main screen or results page
  const [page, setPage] = useState('main');

  // Ingredients user wants to search
  const [ingredients, setIngredients] = useState([]);

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
      <MyNavBar authState={isLoggedIn} page={page} />
      {(page === "main") ?
        <MainPage onPageChange={setPage} onIngredientsChange={setIngredients} />
        :
        <ResultsPage onPageChange={setPage} selectedIngredients={ingredients} onIngredientsChange={setIngredients} />}
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
