import React from 'react';
import ReactDOM from 'react-dom';
//import React, { Component } from 'react';
//import profile_pic from '.profile_pic.svg';
//import './account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//help  https://www.youtube.com/watch?v=Ke90Tje7VS0  @34:31

// Firebase Imports
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore"

// React-Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Jumbotron from "react-bootstrap/Jumbotron";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Typeahead
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

// Custom styles
import './style.css';

// //Firebase Variables
// var user = firebase.auth().currentUser;
// var firstName, lastName, email, photoUrl, uid;
//
// if (user != null) {
//   email = user.email;
//   firstName = user.first_name;
//   lastName = user.last_name;
//   //photoUrl = user.photoURL;
//   uid = user.user_id;  // The user's ID, unique to the Firebase project. Do NOT use
//                    // this value to authenticate with your backend server, if
//                    // you have one. Use User.getToken() instead.
// }

// Nav bar on top of page
// const MyNavBar = props => {
//
//   const isLoggedIn = props.authState;
//
//   return (
//     <Navbar bg="light" expand="lg">
//
//       <Navbar.Brand href="#home">Ingredientory</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//
//       <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
//         { // Change button depending on auth state
//           isLoggedIn ? <SignOutButton /> : <SignInButton />}
//       </Navbar.Collapse>
//
//     </Navbar>
//   )
// };



//Profile Page
export const Profile = props => {
  return (
    <>
    <Container>
    <Jumbotron>
    <Row>
    <Col md={3}></Col>
    <Col md={6}>
    <div className="text-center">
    <h1>Welcome Xavier !</h1>
    <img className="carousel" src="src/images/male.jpg"
    alt="Pizza"></img>
    <p>First Name: Xavier</p>
    <p>Last Name: Cage</p>
    <p>Email: xaviercage4life@gmail.coms</p>
    <Button>Edit Profile</Button>
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

export const Recipes = props => {
  return (
    <>
    <Container>
    <Jumbotron>
    <h1 className="text-center">Xavier's Approved Recipes</h1>
    <Row>
    <Col md={3}></Col>
    <Col md={6}>
          <div className="text-center">
          <Carousel>
          <Carousel.Item>
            <img
              className="carousel"
              src="src/images/lasagna.jpg"
              alt="lasagna"
            />
            <Carousel.Caption>
              <h3>Lasagna</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel"
              src="src/images/Pizza.png"
              alt="Pizza"

            />

            <Carousel.Caption>
              <h3>Pizza</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel"
              src="src\images\Hersheys Chocolate Cake.jpg"
              alt="Hersheys Chocolate Cake.jpg"
            />

            <Carousel.Caption>
              <h3>Hersheys Chocolate Cake</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="carousel"
              src="src\images\adobo.jpg"
              alt="adobo.jpg"
            />

            <Carousel.Caption>
              <h3>Filipino Adobo</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
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

//Approved Recipes List
export const App = () => {
  return (
    <>
      <Profile />
    </>
  )
}
ReactDOM.render(<App />, document.querySelector("#root"));








// class Account extends Component {
//   render() {
//     return (
//       <div classname="Account">
//         <header classname="Account_header">
//           <img src{profile_pic} classname="Account-profile_pic" alt="profile_pic" />
//           <h1 classname="Account_title">Account<h1>
//         </header>
//             )
//   }
// }
//
// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('nav')
// );
