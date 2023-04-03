const { initializeApp }= require( "firebase/app");

// Imports here 
import firebaseConfig from "./firebaseConfig.js";

// Initialise firebase app, database, ref
const app= initializeApp(firebaseConfig)

// Initialize authentication
// const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }= require("firebase/auth");
// const auth = getAuth(app);
const db= getDatabase(app)
const PATH= "";

function modelToPersistence(model){
    // TO-DO: Implement firebase
}

function persistenceToModel(persistedData, model) {
    // TO-DO
}

function firebaseModelPromise(model) {
    // TO-DO
}