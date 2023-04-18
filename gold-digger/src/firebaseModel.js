// Imports here 
import firebaseConfig from "./firebaseConfig.js";
const { getDatabase, ref, get, set, onValue } = require("firebase/database");
const { initializeApp}= require( "firebase/app");

// Initialise firebase app, database, ref
console.log("FIREBASE init app");
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)
const PATH= "diggerModel";

// ===================
// ======TEST=========
// ===================
function testPersistenceToModel(model) {
    let userPATH="";
    /*
    if(model.user) {
        userPATH = "/"+model.userid;
    }
    */
    console.log("userid before: " + model.userid);
    get(ref(db, PATH+userPATH)).then(toModelACB).then(resultACB);
    
    function toModelACB(dataFromFirebase) {
        return persistenceToModel(dataFromFirebase.val(), model);
    }

    function resultACB() {
        console.log("userid after: " + model.userid);
    }
}

function testModelToPersistence(model) {
    let userPATH="";
    /*
    if(model.user) {
        userPATH = "/"+model.userid;
    }
    */
    
    set(ref(db, PATH+userPATH), modelToPersistence(model));
}
// ===================
// ===================
// ===================



function modelToPersistence(model){
    if (model.userid) {
         // TODO: update to correspond to what needs to be persisted
        return {userid:model.userid, testValue:"FallOutBoy4Life"};
    }
    // TODO: return null when login has a functioning flow
    return {userid:"test_userid", testValue:"FallOutBoy4Life"};
    //return null;
}


function persistenceToModel(persistedData, model) {
     // TODO: update to correspond to what needs to be persisted
    if(persistedData !== null) {
        if (persistedData.userid) {
            model.setUserID(persistedData.userid);  
        } else {
            model.setUserID(null);
        }
    }
    
    return model;
}


function firebaseModelPromise(model) {
    let userPATH="";
    if(model.user) {
        userPATH = "/"+model.userid;
    }
    // 1) retrieves data from firebase using firebase get()
    return get(ref(db, PATH+userPATH+"_SESSION")).then(toModelACB).then(addObserverACB); // return promise chain

    // 2) saves the data into the model (received as parameter)
    function toModelACB(dataFromFirebase) {
        return persistenceToModel(dataFromFirebase.val(), model);
    }
    
    function addObserverACB() {
        model.addObserver(obsACB);
        //model.addObserver(signOutACB);
        onValue(ref(db, PATH+"_SESSION"), changeModelACB);
        return model;
    }

    // 3) adds a model observer that calls firebase set() and modelToPersistence()
    function obsACB(payload){
        // Check payload to skip the set
        if(payload !== "some payload" && !payload.key) {
            set(ref(db, PATH+userPATH+"_SESSION"), modelToPersistence(model));
        }
    }

    // 4) optional: calls firebase onValue() for live update
    
    function changeModelACB(payload) {
        model.notifyObservers("some payload");
        persistenceToModel(payload.val(), model);
    }
    

    /*
    function signOutACB (payload) {
        if (payload.key) {
            if (payload.key === "signout") {
                signout(model);
            }
        }
    }

    function signout(model) {
        // TODO reset all values in model
        model.user = null;
    
        model.removeObserver(obsACB);
        model.removeObserver(signOutACB);

        console.log("Logged out");
    }
    */
}


export {modelToPersistence, persistenceToModel, firebaseModelPromise, testPersistenceToModel, testModelToPersistence};