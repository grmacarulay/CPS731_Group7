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

// Typeahead
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

// Sidenav
import SideNav, { Toggle, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

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
      <Navbar.Brand href="#home">
      <img src="\src\images\chef.svg" width="40" height="40" className="d-inline-block align-top"/>
      {' '}
      <b className="staatliches">Ingredientory</b>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />


      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end ">
          <Navbar.Text>
              Signed in as: <a href="#profile">Name</a>
          </Navbar.Text>

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
      <Button variant="outline-success" onClick={handleShow} className="staatliches">Sign In</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="staatliches">Sign{isSigningIn ? ' in to ': ' up for '}Ingredientory</Modal.Title>
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
        <Form.Control type="password" placeholder="Enter password" onChange={handlePasswordChange} className="oswald" required/>
      </Form.Group>

      <Form.Group controlId="firstName">
        <Form.Label className="staatliches">First Name</Form.Label>
        <Form.Control type="text" placeholder="John" onChange={handleFirstNameChange} className="oswald" required/>
      </Form.Group>

      <Form.Group controlId="lastName">
        <Form.Label className="staatliches">Last Name</Form.Label>
        <Form.Control type="text" placeholder="Doe" onChange={handleLastNameChange} className="oswald" required/>
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
        <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} className="oswald" required/>
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
      <Button variant="outline-success" onClick={handleSignOut} className="staatliches">Sign Out</Button>
    </>
  )
}

const SearchBar = props => {

//   var array_test=[] ;
//
//   // grabs values within a collection (just outputs into console)
//    db.collection('ingredients').get().then((snapshot) => {
//      snapshot.docs.forEach(doc => {
//        console.log(doc.data().ingredient_name);
//        array_test.push(doc.data().ingredient_name);
//      })
//    })
//
// db.collection('ingredients').get().then((snapshot) => {
//    console.log(array_test.toString());
//  })

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
    props.onSearchingStateChange(true);
    console.log('You have search for: ');
    console.log(selected);
  }

  return (
    <>
    <div className="bottom">  </div>

    <Row>
    <Col className="text-center">
    <img src="/src/images/Logo.png"
     alt=""
     width="1000px"
     height="300px"
     className="responsive-image"
    />
    </Col>
    </Row>

    <Row >
    <Col md={3}> </Col>
    <Col md={6}>
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
      </Col>
      <Col md={3}> </Col>
      </Row>


      <div className="searchAndButtonSpace">  </div>

      <Row>
      <Col> </Col>
      <Col className="text-center staatliches">
      <Button variant="primary" onClick={handleSearch} className="search-btn">
        Search
      </Button>
      </Col>
      <Col> </Col>

      </Row>

    </>
  )
}





// Genies Page
const App2 = props => {



   // var recipe_time_array=[];
   // const[recipe_times, setTime] = useState("");
   //
   // db.collection('recipes').get().then((snapshot) => {
   //   snapshot.docs.forEach(doc => {
   //     recipe_time_array.push(doc.data().time);
   //   })
   //      setTime(recipe_time_array);
   // })





  window.location.href = "#Results_Page"
  return (
    <div id="another_page">

  <Container fluid >
  <Row fluid>
<Col md={2} className="min-vh-100 testtest" fluid>

<Nav defaultActiveKey="/home" className="left flex-column w3-sidebar side">

  <Accordion>
  <Card fluid>

            <Accordion.Toggle as={Card.Header} className="text-center" eventKey="0" >
              Ingredients
            </Accordion.Toggle>

          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Button variant="primary"> Milk <Badge >x</Badge></Button>
              <Button variant="primary"> Baking Powder <Badge variant="light">x</Badge></Button>
              <Button variant="primary"> Butter <Badge variant="light">x</Badge></Button>
              <Button variant="primary"> All-Purpose Flour <Badge variant="light">x</Badge></Button>
              <Button variant="primary"> Salt <Badge variant="light">x</Badge></Button>
              <Button variant="primary"> White Sugar <Badge variant="light">x</Badge></Button>
              <Button variant="primary"> Egg <Badge variant="light">x</Badge></Button>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card fluid className="whitetext">
                _
              </Card>


  <Card fluid>
            <Accordion.Toggle as={Card.Header} className="text-center" eventKey="1">
              Meal Type
            </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Form>
                {['checkbox'].map(type => (
                  <div key={`custom-inline-${type}`} className="mb-3">
                  <Row>
                    <Col>
                      <Form.Check custom inline label="Snack" type={type} id={`custom-inline-${type}-1`} />
                      <Form.Check custom inline label="Breakfast" type={type} id={`custom-inline-${type}-2`} />
                      <Form.Check custom inline label="Lunch" type={type} id={`custom-inline-${type}-3`} />
                    </Col>
                    <Col>
                      <Form.Check custom inline label="Brunch" type={type} id={`custom-inline-${type}-4`} />
                      <Form.Check custom inline label="Dinner" type={type} id={`custom-inline-${type}-5`} />
                      <Form.Check custom inline label="Late Night Munchies" type={type} id={`custom-inline-${type}-6`} />

                  </Col>
                </Row>
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
  </Card>

  <Card fluid className="whitetext">
          _
        </Card>

  <Card>

              <Accordion.Toggle as={Card.Header} className="text-center" eventKey="2">
                Cooking Method
              </Accordion.Toggle>

            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <Form>
                  {['checkbox'].map(type => (
                    <div key={`custom-inline-${type}`} className="mb-3">
                    <Row> <Col>
                        <Form.Check custom inline label="Stir Frying" type={type} id={`custom-inline-${type}-1`} />
                        <Form.Check custom inline label="Stewing" type={type} id={`custom-inline-${type}-2`} />
                        <Form.Check custom inline label="Broiling" type={type} id={`custom-inline-${type}-3`} />
                        <Form.Check custom inline label="Stir Frying" type={type} id={`custom-inline-${type}-4`} />
                        <Form.Check custom inline label="Steaming" type={type} id={`custom-inline-${type}-5`} />
                        <Form.Check custom inline label="Searing" type={type} id={`custom-inline-${type}-6`} />
                      </Col>
                      <Col>
                        <Form.Check custom inline label="Grilling" type={type} id={`custom-inline-${type}-7`} />
                        <Form.Check custom inline label="Making" type={type} id={`custom-inline-${type}-8`} />
                        <Form.Check custom inline label="Roasting" type={type} id={`custom-inline-${type}-9`} />
                        <Form.Check custom inline label="Frying" type={type} id={`custom-inline-${type}-10`} />
                        <Form.Check custom inline label="Sauteing" type={type} id={`custom-inline-${type}-11`} />
                        <Form.Check custom inline label="Braising" type={type} id={`custom-inline-${type}-12`} />
                    </Col> </Row>
                    </div>
                  ))}
                </Form>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card fluid className="whitetext">
                  _
                </Card>

          <Card>

                      <Accordion.Toggle as={Card.Header} className="text-center"eventKey="3">
                        Spice Level
                      </Accordion.Toggle>

                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                          Spice Level
                      </Card.Body>
                    </Accordion.Collapse>
          </Card>

          <Card fluid className="whitetext">
                  _
                </Card>

        <Card>

            <Accordion.Toggle as={Card.Header} className="text-center" eventKey="4">
              Dietary Restrictions
            </Accordion.Toggle>

          <Accordion.Collapse eventKey="4">
            <Card.Body>
              <Form>
                {['checkbox'].map(type => (
                  <div key={`custom-inline-${type}`} className="mb-3">
                  <Row> <Col>
                      <Form.Check custom inline label="Vegetarian" type={type} id={`custom-inline-${type}-1`} />
                      <Form.Check custom inline label="Dairy Free" type={type} id={`custom-inline-${type}-2`} />
                      <Form.Check custom inline label="Kosher" type={type} id={`custom-inline-${type}-3`} />
                    </Col>
                    <Col>
                      <Form.Check custom inline label="Gluten Free" type={type} id={`custom-inline-${type}-4`} />
                      <Form.Check custom inline label="Halal" type={type} id={`custom-inline-${type}-5`} />
                      <Form.Check custom inline label="Peanut Free" type={type} id={`custom-inline-${type}-6`} />

                  </Col> </Row>
                  </div>
                ))}
              </Form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card fluid className="whitetext">
                __
              </Card>

        <Card>

                    <Accordion.Toggle as={Card.Header} className="text-center" eventKey="5">
                      Ethnicity
                    </Accordion.Toggle>

                  <Accordion.Collapse eventKey="5">
                    <Card.Body>
                      <Form>
                        {['checkbox'].map(type => (
                          <div key={`custom-inline-${type}`} className="mb-3">
                          <Row> <Col>
                              <Form.Check custom inline label="Italian" type={type} id={`custom-inline-${type}-1`} />
                              <Form.Check custom inline label="Greek" type={type} id={`custom-inline-${type}-2`} />
                              <Form.Check custom inline label="Indian" type={type} id={`custom-inline-${type}-3`} />
                              <Form.Check custom inline label="Chinese" type={type} id={`custom-inline-${type}-4`} />
                            </Col>
                            <Col>
                              <Form.Check custom inline label="Mexican" type={type} id={`custom-inline-${type}5`} />
                              <Form.Check custom inline label="American" type={type} id={`custom-inline-${type}-6`} />
                              <Form.Check custom inline label="French" type={type} id={`custom-inline-${type}-7`} />
                              <Form.Check custom inline label="Japanese" type={type} id={`custom-inline-${type}-8`} />
                          </Col> </Row>
                          </div>
                        ))}
                      </Form>
                    </Card.Body>
                  </Accordion.Collapse>
        </Card>
        <Card fluid className="whitetext">
                _
              </Card>
</Accordion>


</Nav>

</Col>

<Col md={10}
className="right"
// Wesley Code
>

  <Row>
    <Col className="search">
      <SearchBar/>
      </Col>

      <Col className="sort_col">
                <Navbar>
                  <Navbar.Collapse className="justify-content-end">
                    <NavDropdown className="sort" title="Sort" alignRight>
                      <NavDropdown.Item href="#">Rating</NavDropdown.Item>
                      <NavDropdown.Item href="#">Time</NavDropdown.Item>
                      <NavDropdown.Item href="#">Spice Level</NavDropdown.Item>
                    </NavDropdown>
                  </Navbar.Collapse>
                </Navbar>
              </Col>
  </Row>

</Col>
</Row>


<RecipeCardResults/>


</Container>
</div>
  )
}

const RecipeCardResults = props => {

  
  var recipe_names_array=[] ;
  const[recipe_names, setRecipe] = useState("");

  // grabs values within a collection (just outputs into console)
   db.collection('recipes').get().then((snapshot) => {
     snapshot.docs.forEach(doc => {
       recipe_names_array.push(doc.data().name);
     })
        setRecipe(recipe_names_array);
   })



  return (

<Container className="this-is-a-margin">
<Row>
    <Row>
    <Col md={6} className="right">

        <Card className="results-card-size">
          <Card.Img className="responsive-image"
          variant="top"
          src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/pancake.png?alt=media&token=7c04eae5-b1d5-4470-899e-0aac21123fba"
          />
          <Card.Body>
          <Card.Text classname="text-center">
        <b> {recipe_names[1]} </b>
          <br></br>
            <br></br>
             This is a great recipe that I found in my Grandma's recipe book.
            Judging from the weathered look of this recipe card, this was a family favorite.
            <br></br>
            <br></br>
            <p align="right" className="bottom-card">  <b> 15 minutes </b> </p>
        </Card.Text>
         </Card.Body>
         <Card.Footer className="text-muted">Submitted By : Wesley Morota</Card.Footer>

        </Card>
    </Col>

    <Col md={6} className="right">

          <Card className="results-card-size">
            <Card.Img className="responsive-image"
            variant="top"
            src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/burger.jpg?alt=media&token=688b8b14-43aa-4cd5-93ea-08e872aec0fd"
            />
            <Card.Body>
            <Card.Text>
            <b> {recipe_names[4]} </b>
            <br></br>
            <br></br>
            The steak of veggie burgers. Serve on a bun with lettuce, tomato, and aioli sauce. Oh yeah!
            <br></br>
            <br></br>
            <br></br>
            <p align="right" className="bottom-card">  <b> 30 minutes </b> </p>
          </Card.Text>
           </Card.Body>
           <Card.Footer className="text-muted">Submitted By : Genieferose Macarulay</Card.Footer>

          </Card>
    </Col>
  </Row>

<Row>
<Col md={6} className="right">

      <Card className="results-card-size">
        <Card.Img className="responsive-image"
        variant="top"
        src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/Adobo-Chicken.jpg?alt=media&token=61b4fcc9-3453-42d0-b60e-d215a77c3662"
        />
        <Card.Body>
        <Card.Text>
        <b> {recipe_names[0]} </b>
        <br></br>
        <br></br>
        My mom always makes her saucy Chicken Adobo recipe when I come home to visit.
        I think it's even better the next day as leftovers — she says it's because of the vinegar.
        <br></br>
        <br></br>
        <p align="right" className="bottom-card">  <b> 120 minutes </b> </p>
      </Card.Text>
       </Card.Body>
       <Card.Footer className="text-muted">Submitted By : Kyle Padernilla </Card.Footer>
      </Card>
  </Col>

  <Col md={6} className="right">

        <Card className="results-card-size">
          <Card.Img className="responsive-image"
          variant="top"
          src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/poutine.png?alt=media&token=1af203e4-bf03-4ce1-b906-7260828a60e1"
          />
          <Card.Body>
          <Card.Text>
            <b> {recipe_names[2]} </b>
            <br></br>
            <br></br>
          Crispy fries are covered with mozzarella cheese and hot beef gravy in
          this lighter version of poutine
          <br></br>
          <br></br>
          <br></br>
          <p align="right" className="bottom-card">  <b> 15 minutes </b> </p>
        </Card.Text>
         </Card.Body>
         <Card.Footer className="text-muted">Submitted By : Paul Baculna  </Card.Footer>
        </Card>
    </Col>
</Row>

</Row>
  </Container>

  )
}



const App = () => {

  // Save authentication state (whether user is logged in or not)
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Did user click the search button
  const [isSearching, setSearching] = useState(false);

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
      {isSearching ? <App2 /> : <SearchBar onSearchingStateChange={setSearching} />}
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
