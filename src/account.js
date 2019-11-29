import React from 'react';
import ReactDOM from 'react-dom';
//import React, { Component } from 'react';
//import profile_pic from '.profile_pic.svg';
//import './account.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//help  https://www.youtube.com/watch?v=Ke90Tje7VS0  @34:31

// Firebase Imports
import * as firebase from "firebase/app";
import "firebase/database"; //newly added
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

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
const db = firebase.database();
const auth = firebase.auth();

//Firebase Variables
//var user = firebase.auth().currentUser;
// var user = db.users.'lWO64EMXYFwx3YprG6ON'
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

  var user, firstName, lastName, email, photoUrl, uid;

function writeUserData(userId, firstName,lastName, email) {
  firebase.database().ref('users/' + userId).set({
    first_name: firstName,
    last_name: lastName,
    email: email,
    user_id: userId
  });
}

  // Create a reference to the cities collection
//  var docRef = db.collection("users");

// Create a query against the collection.
// db.collection("users").where("user_id", "==", "XOpg2Fd2ZJYoVQGKzVDRqn0KnLd2")
//     .get()
//     .then(function(querySnapshot) {
//         querySnapshot.forEach(function(doc) {
//             // doc.data() is never undefined for query doc snapshots
//             //console.log(doc.data().ingredients[2]);
//             user = doc.data();
//             email = user.email;
//             firstName = user.first_name;
//             lastName = user.last_name;
//             //photoUrl = user.photoURL;
//             uid = user.user_id;
//             console.log(email, firstName, lastName);
//
//         });
//     })
//     .catch(function(error) {
//         console.log("Error getting documents: ", error);
//     });



//Profile Page
export const Profile = props => {
  return (
    <>
    <Container>
    <Jumbotron className = "jumbotronInvis">
    <Row>
    <Col md={3}></Col>
    <Col md={6}>
    <div className="text-center">
    <h1 className = "headerStyle">Welcome Wesley !</h1>
    <img className="carousel" src="src/images/male.jpg"
    alt="Pizza"></img>
    <p>First Name: Wesley</p>
    <p>Last Name: Morota</p>
    <p>Email: wesleymorota@gmail.com</p>
    <Button>Edit Profile</Button>
    <br></br>
    <br></br>
    <Button className = "btn">Manage Recipes</Button>
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
    <Jumbotron className = "jumbotronInvis">

    <Row>
    <Col md={3}></Col>
    <Col md={6}>
          <div className="text-center">
          <h1 className="headerStyle">Xander's Approved Recipes</h1>
          <Carousel>
          <Carousel.Item>
            <img
              className="carousel"
              src="src/images/lasagna.jpg"
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
              src="src/images/Pizza.png"
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
              src="src\images\Hersheys Chocolate Cake.jpg"
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
              src="src\images\adobo.jpg"
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
