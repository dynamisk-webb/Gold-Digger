// Imports here 
import firebaseConfig from "./firebaseConfig.js";
const { getDatabase, ref, get, set, onValue } = require("firebase/database");
const { initializeApp}= require( "firebase/app");

// Initialise firebase app, database, ref
console.log("FIREBASE init app");
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const PATH= "diggerModel";


function modelParamsToPersistence(model){
    if (model.userid) {
         // TODO: update to correspond to what needs to be persisted
        return {userid:model.userid, test:"blahaj", test2:"en rosa helikopter"};
    }
    return null;
}

function generatedListToPersistence(model){
    if (model.userid) {
        return {generated:model.generated};
    }
    return null;
}


function persistenceToModelParams(persistedData, model, setModel) {
    if(persistedData !== null) {
        //console.log("Existing persisted data!");
        
        if (persistedData.userid) {
            model.setUserID(persistedData.userid);  
        } else {
            model.setUserID(null);
        }

        // TODO add remaining model parameters

    } else {
        console.log("No persisted data!");
    }
    return model;
}


function persistenceToGeneratedList(persistedData, model) {
    if(persistedData !== null) { //console.log("Existing persisted data!");
        if (persistedData.generated) {
            model.setGenerated(persistedData.generated);  
        } else {
            model.setGenerated(null);
        }
    } else { //console.log("No persisted data!");
    }
    return model;
}


// gets a prev generated list based on param firebaseKey (id) from persistence and replaces current generated 
function generatedListPromise(model, firebaseKey) {
    // TODO implement
    // GET from firebase
}


function firebaseModelPromise(model, setModel) {
    let userPATH="";
    if(model.userid) {
        userPATH = "/"+model.userid;
        console.log("FIREBASE userpath set to: " + userPATH);
    } else {
        console.log("FIREBASE No user set in model, meaning firebasepath is incorrect");
    }
    
    // Retrieves persisted model parameters
    
    return get(ref(db, PATH+userPATH+"-modelParams")).then(toModelACB).then(addObserversACB);

    // Saves any persisted data into the model (received as parameter)
    function toModelACB(dataFromFirebase) {
        return persistenceToModelParams(dataFromFirebase.val(), model, setModel);
    }
    
    function addObserversACB() {
        console.log("observers added");
        model.addObserver(obsGeneralParamsACB);
        model.addObserver(obsGeneratedListACB);
        model.addObserver(logOutACB);

        // TODO check if any of these are needed (it doesn't seem like it at the moment)
        //setModel(model);
        //return model;
    }

    
    // Observes all model parameters and saves to firebase
    function obsGeneralParamsACB(payload){
        console.log("obsGeneralParamsACB notified!");
        if (payload.key) {
            if(payload.key === "modelParams") {
                set(ref(db, PATH+userPATH+"-modelParams"), modelParamsToPersistence(model));
            }
        }
    }

    // Observes current generated list and saves any changes to firebase
    // (eg changed name, removed song)
    function obsGeneratedListACB(payload){
        if (payload.key) {
            if(payload.key === "editGenerated") {
                /*
                TODO
                - get key (aka firebasespecific ID) of current generated list
                - something like payload.firebaseKey, alt model.generated.firebasekey
                */
                const firebaseKey = 0;
                set(ref(db, PATH+userPATH+"-"+firebaseKey), generatedListToPersistence(model));
            }
        }
    }


    function logOutACB (payload) {
        if (payload.key) {
            if (payload.key === "logout") {
                logout(model);
            }
        }
    }


    function logout(model) {
        // remove all observers before resetting model
        model.removeObserver(obsGeneralParamsACB);
        model.removeObserver(obsGeneratedListACB);
        model.removeObserver(logOutACB);

        // TODO reset all values in model
        model.user = null;

        console.log("Observers removed and model reset");
    }
}


export {modelParamsToPersistence, generatedListToPersistence, persistenceToModelParams, persistenceToGeneratedList, generatedListPromise, firebaseModelPromise};