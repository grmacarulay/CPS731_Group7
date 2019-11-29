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
import CardGroup from 'react-bootstrap/CardGroup'

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import Carousel from "react-bootstrap/Carousel";
import StarRatings from 'react-star-ratings';

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
  const page = props.page;

  let brand = null;

  console.log('navbar')
  if (page !== "main") {
    brand =
      <Navbar.Brand href="#home">
        <img src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/chef.svg?alt=media&token=c0f126c3-5b94-467f-a7b8-2985f4097b68"
        width="40" height="40" className="d-inline-block align-top" />
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

const Profile = props => {
  return (
    <>
      <Container>
        <Jumbotron className="jumbotronInvis">
          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <div className="text-center">
                <h1 className="headerStyle">Welcome Xander !</h1>
                <img className="carousel" src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/avatar.svg?alt=media&token=4c4c5fee-e27b-4c54-a972-8b8f3f2eb1bd"
                  alt="Pizza"></img>
                <p>First Name: Wesley</p>
                <p>Last Name: Morota</p>
                <p>Email: wesleymorota@gmail.com</p>
                <Button>Edit Profile</Button>
                <br></br>
                <br></br>
                <Button className="btn">Manage Recipes</Button>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Jumbotron>
      </Container>
      <Recipes />
    </>
  )
}

const Recipes = props => {
  return (
    <>
      <Container>
        <Jumbotron className="jumbotronInvis">

          <Row>
            <Col md={3}></Col>
            <Col md={6}>
              <div className="text-center">
                <h1 className="headerStyle">Xander's Approved Recipes</h1>
                <Carousel>
                  <Carousel.Item>
                    <img
                      className="carousel"
                      src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/pancake.png?alt=media&token=7c04eae5-b1d5-4470-899e-0aac21123fba"
                      alt="lasagna"
                    />
                    <Carousel.Caption>
                      <h3>Garfield Lasagna</h3>
                      <p>Mmmm Lasagna!</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="carousel"
                      src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/pancake.png?alt=media&token=7c04eae5-b1d5-4470-899e-0aac21123fba"
                      alt="Pizza"
                    />
                    <Carousel.Caption>
                      <h3>Italian Pizza</h3>
                      <p>Mama mia.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="carousel"
                      src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/pancake.png?alt=media&token=7c04eae5-b1d5-4470-899e-0aac21123fba"
                      alt="Hersheys Chocolate Cake.jpg"
                    />
                    <Carousel.Caption>
                      <h3>Hersheys Chocolate Cake</h3>
                      <p>Yummy and chocolatey!</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <img
                      className="carousel"
                      src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/pancake.png?alt=media&token=7c04eae5-b1d5-4470-899e-0aac21123fba"
                      alt="adobo.jpg"
                    />
                    <Carousel.Caption>
                      <h3>Filipino Adobo</h3>
                      <p>Fillipino people food.</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Jumbotron>
      </Container>
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

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }

  const showProfile = () => {
    setShow(true);
  }

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
      <Button variant="link" onClick={showProfile} className="staatliches">My Account</Button>
      {' '}
      <Button variant="secondary" onClick={handleSignOut} className="staatliches">Sign Out</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="staatliches">Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Profile />
        </Modal.Body>
      </Modal>

    </>
  )
}

const MainPage = props => {

  const onIngredientsChange = props.onIngredientsChange;
  const onPageChange = props.onPageChange;

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <img src="https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/Logo.png?alt=media&token=bf9773e5-1044-4b04-a860-7df137392ce3"
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
    setLoading(true);
    db.collection("ingredients").get()
      .then(snapshot => {
        // Put all docs in an array
        var tempOptions = [];
        snapshot.docs.forEach(doc => {
          tempOptions.push(doc.data());
        })
        setOptions(tempOptions);
        setLoading(false);
      }
    );

    // STUB, simulates above to save on data
    // setLoading(true);
    // setOptions(testData);
    // setLoading(false);
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
        <Accordion.Toggle as={Card.Header} className="text-center filter-font" eventKey={eventKey}>
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
      <Card className="filter-font">
        <Accordion.Toggle as={Card.Header} className="text-center" eventKey={eventKey} >
          Ingredients
        </Accordion.Toggle>

        <Accordion.Collapse eventKey={eventKey}>
          <Card.Body className="oswald">
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
    <Dropdown onSelect={handleOnSelect} className="staatliches">
      <Dropdown.Toggle className="sort-btn">
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

const RecipeCard = props => {

  const title = props.title;
  const time = props.time;
  const author = props.author;
  const image = props.image;

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  }


  const handleClick = event => {
    setShow(true);
  }

  return (
    <>
    <Card className="results-card-size" onClick={handleClick}>
      <Card.Img className="responsive-image"
        variant="top"
        src={image}
      />
      <Card.Title as="h5" className="">{title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{time}</Card.Subtitle>
      <Card.Body>
        <Card.Text className="text-center">
          This is a great recipe that I found in my Grandma's recipe book.
           Judging from the weathered look of this recipe card, this was a family favorite.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">Submitted by: {author}</Card.Footer>

      </Card>
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="staatliches">Recipe</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <RecipePage />
        </Modal.Body>
      </Modal>


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

  var recipeTitle = ['Fluffy Pancake w/ Maple Syrup', 'American-style Cheeseburger', 'Chicken Adobo', 'Traditional Canadian Poutine']
  var time = '15 minutes'
  var authors = ['Wesley M.', 'Kyle P.', 'Faadhil A.', 'Genie M.']
  var images = ["https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/pancake.png?alt=media&token=7c04eae5-b1d5-4470-899e-0aac21123fba",
    "https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/burger.jpg?alt=media&token=688b8b14-43aa-4cd5-93ea-08e872aec0fd",
    "https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/Adobo-Chicken.jpg?alt=media&token=61b4fcc9-3453-42d0-b60e-d215a77c3662",
    "https://firebasestorage.googleapis.com/v0/b/ingredientory.appspot.com/o/poutine.png?alt=media&token=1af203e4-bf03-4ce1-b906-7260828a60e1"
  ]

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

  var recipe_names_array = [];
  const [recipe_names, setRecipe] = useState("");

  // // grabs values within a collection (just outputs into console)
  //  db.collection('recipes').get().then((snapshot) => {
  //    snapshot.docs.forEach(doc => {
  //      recipe_names_array.push(doc.data().name);
  //    })
  //       setRecipe(recipe_names_array);
  //  })

  return (
    <Container fluid className="gray">
      <Row noGutters>
        <Col md={2}>
          <FiltersSideBar selected={selected} filters={filters} onChangeFilters={handleFilterChange} />
        </Col>

        <Col md={10}>

          <Row noGutters className="align-items-center justify-content-center ">
            <Col>
              <SearchBar
                onpage="results"
                onPageChange={onPageChange}
                onIngredientsChange={onIngredientsChange} />
            </Col>

            <Col md={3} className="justify-content-end">
              <SortOptions options={sortOptions} onSelectSort={onSelectSort} />
            </Col>
          </Row>

          <Row noGutters className="right">
            <CardGroup>
              <RecipeCard title={recipeTitle[0]} time={time} author={authors[0]} image={images[0]}/>
              <RecipeCard title={recipeTitle[1]} time={time} author={authors[1]} image={images[1]}/>
            </CardGroup>
            <CardGroup>
              <RecipeCard title={recipeTitle[2]} time={time} author={authors[2]} image={images[2]}/>
              <RecipeCard title={recipeTitle[3]} time={time} author={authors[3]} image={images[3]}/>
            </CardGroup>
          </Row>

        </Col>
      </Row>
    </Container>
  )
}

const RecipePage = () => {;

  const[foodName,setfoodName] = useState("Chicken Adobo"); //set the new FoodName.

  const[cookingMethod,setCookingMethod] = useState("boiling"); //set the new cooking method.

  const[rating,setRating] = useState(3); //set the rating method.

  const[ingredients,setIngredients] = useState("Chicken, oil, vinegar"); //sets the ingredients.

  const[mealType,setMealType] = useState("lunch,dinner"); //sets the meal type.

  const[ethnicity,setEthnicity] = useState("filipino"); //sets the ethnicity.

  const[dietaryRestrictions,setDietaryRestrictions] = useState("Peanut-free"); //sets the ethnicity.


  // Create a reference to the cities collection.
  //var citiesRef = db.collection("recipes");

  // Create a query against the collection. "Adobo is placeholder for the button is press."
  //db.collection("recipes").where("name", "==", "Chicken Adobo")
    //.get()
    //.then(function(querySnapshot) {
      //  querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //setfoodName(doc.data().name); //gets the name.
            //setCookingMethod(doc.data().cooking_method); //gets the cooking method.
            //setRating(parseFloat(doc.data().rating); //gets the rating.
            //setIngredients(doc.data().ingredients); //gets the ingredients.
      //  });
  //  })
  //  .catch(function(error) {
  //      console.log("Error getting documents: ", error);
    //});


  return (
    <>
    <div className="recipeModal">
      <Container>
        <Jumbotron className="jumbotron_style">
          <h1 className="recipe_heading">{foodName}</h1>
            <Carousel>
              <Carousel.Item>
              <img className="responsive-image" src="src/images/Adobo-Chicken.jpg" alt="adobo"/>
              </Carousel.Item>
              <Carousel.Item>
              <img className="responsive-image"src="src/images/adobo2.jpg" alt="adobo" />
                <Carousel.Caption>
                <p>"Filipino party!"</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
        </Jumbotron>

        <Row>
        <Col md={1}></Col>
        <Col md={6}>

          <Card bg="secondary" text="white" className="card_size">
            <Card.Body className="card_body">

            <div className="gen_info">
              <h2 className="text-center recipe_heading">{foodName}</h2>

              <StarRatings starDimension="20px"
                rating={rating}
                starRatedColor="yellow"
                numberOfStars={5}
                name='rating'
              />


               <div>
               <a href="#" className="text-center">By: Bong Nevillo</a>
              </div>


                <div>
                  <p>
                  "This classic adobo recipe is simple to make and famous with all who have tasted it.
                  It has been modified to be a bit more saucy than traditional adobo, it is delicious served over rice."
                  </p>
                </div>

            </div>

            <div className="ingredients">
              <h3 className="recipeHeading">Ingredients</h3>
                <p>
                      {ingredients}
                  </p>
            </div>

            <div className="meal_type">
              <h3 className="recipeHeading">Meal-Type</h3>
                <p>
                {mealType}
                  </p>
            </div>

            <div className="cooking_method">
              <h3 className="recipeHeading">Cooking Method</h3>
                  <p>
                  {cookingMethod}
                  </p>
            </div>

            <div className="diet">
              <h3 className="recipeHeading">Dietary Restrictions</h3>
                <p>
                {dietaryRestrictions}
                </p>
            </div>

            <div className="ethnicity">
              <h3 className="recipeHeading">Ethnicity</h3>
                <p>
                {ethnicity}
                </p>
            </div>

            <div className="steps">
              <h3 className="recipeHeading">Steps</h3>
                <p>
                  <ul className="list-styles">
                    <li className="steps">1. Heat the vegetable oil in a large skillet over medium-high heat. Cook chicken pieces until golden brown on both sides, then remove.
                      Stir in the onion and garlic; cook until they soften and brown, about 6 minutes.</li>
                    <li  className="steps" >2. Pour in vinegar and soy sauce, and season with garlic powder, black pepper, and bay leaf. Add the browned chicken, increase the heat to high, and bring to a boil.
                      Reduce heat to medium-low, cover, and simmer until the chicken is tender and cooked through, 35 to 40 minutes.</li>
                  </ul>
                  </p>
            </div>

            </Card.Body>
          </Card>

        </Col>

        <Col md={4}>
          <div className= "nutrition_info">
            <Card bg="secondary" text="white" className="card_size_nutr">
              <Card.Body className="card_body">
              <h3>Nutrition Info: </h3>
              <p>Prep: 20min</p>
              <p>Cook: 50 mins</p>
              <p>Total: 1 hr 10 mins</p>
              <p>Servings:6</p>
              </Card.Body>
            </Card>


          </div>
        </Col>
        <Col md={1}></Col>
        </Row>

      </Container>
    </div>
    </>

  );
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
}

var userid;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    userid = user.uid;
    console.log(userid);
  } else {
    // User not logged in or has just logged out.
  }

});
