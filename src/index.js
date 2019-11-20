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

// Listen for auth changes
auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log('user logged in: ', user)
  } else {
    console.log('user logged out')
  }

});

// React code
const hello = <div> Hello React, Webpack 4 & Babel 7!</div>;
ReactDOM.render(hello, document.querySelector("#react"));
// End React code

// Add button listeners
const signUpButton = document.querySelector("#sign-up-button")
  .addEventListener("click", handleSignUp);

const signInButton = document.querySelector('#sign-in-button')
  .addEventListener('click', handleSignIn);

const signOutButton = document.querySelector('#sign-out-button')
  .addEventListener('click', handleSignOut);

const addDatabaseButton = document.querySelector("#add-database")
  .addEventListener("click", addDatabase);

function testing() {
  alert('click')
}

function handleSignUp() {
  var email = document.querySelector("#email-input-field").value;
  var password = document.querySelector("#password-input-field").value;

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
  var email  = document.querySelector("#email-input-field").value;
  var password = document.querySelector("#password-input-field").value;

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

function addDatabase() {
  var currentUser;
  currentUser = user.uid;
  window.localStorage.setItem("UID",currentUser);
  var getuid = window.localStorage.getItem("UID");
  db.collection("users").add({
    first: "Eric",
    middle: "Nam",
    last: "Turing",
    id: getuid,
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
