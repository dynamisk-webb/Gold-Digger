// Imports here 
import firebaseConfig from "./firebaseConfig.js";
const { getDatabase, ref, get, set, onValue } = require("firebase/database");
const { initializeApp}= require( "firebase/app");

// Initialise firebase app, database, ref
const app= initializeApp(firebaseConfig)
const db= getDatabase(app)

function modelParamsToPersistence(model){
    if (model.userid) {
        
        let playlist = null;
        let firebaseKey = null;
        if (model.generated) {
            if (model.generated.playlist) {
                playlist = model.generated.playlist;
            } 
            if (model.generated.firebaseKey) {
                 firebaseKey = model.generated.firebaseKey;
            }
        }

        return {userid:model.userid,
            source:model.source,
            generated:{playlist:playlist, firebaseKey:firebaseKey},
            genres:model.genres,
            includedArtists:model.includedArtists,
            excludedArtists:model.excludedArtists,
            prevPlaylists:model.prevPlaylists,
            tempo:model.tempo,
            loudness:model.loudness,
            instrumentalness:model.instrumentalness,
            danceable:model.danceable,
            acoustic:model.acoustic};
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
        if (persistedData.userid) {
            model.userid = persistedData.userid;
        }
        if (persistedData.source) {
            model.source = persistedData.source;
        }
        if (persistedData.generated) {
            if (persistedData.generated.playlist) {
                model.generated.playlist = persistedData.generated.playlist;
            }
            if (persistedData.generated.firebaseKey) {
                model.generated.firebaseKey = persistedData.generated.firebaseKey;
            }
        }
        if (persistedData.genres) {
            model.genres = persistedData.genres;
        }
        if (persistedData.includedArtists) {
            model.includedArtists = persistedData.includedArtists;
        }
        if (persistedData.excludedArtists) {
            model.excludedArtists = persistedData.excludedArtists;
        }
        if (persistedData.excludedArtists) {
            model.excludedArtists = persistedData.excludedArtists;
        }
        if (persistedData.prevPlaylists) {
            model.prevPlaylists = persistedData.prevPlaylists;
        }
        if (persistedData.tempo) {
            model.tempo = persistedData.tempo;
        }
        if (persistedData.loudness) {
            model.loudness = persistedData.loudness;
        }
        if (persistedData.instrumentalness) {
            model.instrumentalness = persistedData.instrumentalness;
        }
        if (persistedData.danceable) {
            model.danceable = persistedData.danceable;
        }
        if (persistedData.acoustic) {
            model.acoustic = persistedData.acoustic;
        }
    } else {
        console.log("No persisted data!");
    }
    return model;
}

function persistenceToGeneratedList(persistedData, model) {
    if(persistedData !== null) { //console.log("Existing persisted data!");
        if (persistedData.generated) {
            model.generated = persistedData.generated;  
        } else {
            model.generated = null;
        }
    } else {
        console.log("No persisted data!");
    }
    return model;
}

// gets a prev generated list based on param firebaseKey (id) from firebase and replaces current generated 
function generatedListPromise(model, firebaseKey) {
    let userPATH=setUserPath(model);

    return get(ref(db, userPATH+"_generatedList_"+firebaseKey)).then(toModelACB);

    // Saves any persisted data into the model (received as parameter)
    function toModelACB(dataFromFirebase) {
        return persistenceToGeneratedList(dataFromFirebase.val(), model);
    }
}


// get general information from firebase
function firebaseModelPromise(model, setModel) {
    let userPATH=setUserPath(model);
    
    // Retrieves persisted model parameters
    return get(ref(db, userPATH+"_modelParams")).then(toModelACB).then(addObserversACB);

    // Saves any persisted data into the model (received as parameter)
    function toModelACB(dataFromFirebase) {
        return persistenceToModelParams(dataFromFirebase.val(), model, setModel);
    }
    
    function addObserversACB() {
        //console.log("observers added");
        model.addObserver(obsGeneralParamsACB);
        model.addObserver(obsGeneratedListACB);
        model.addObserver(logOutACB);
        return {};
    }

    // Observes all model parameters and saves to firebase
    function obsGeneralParamsACB(payload){
        console.log("obsGeneralParamsACB notified with payload: " + payload.key);
        if (payload.key) {
            if(payload.key === "modelParams") {
                if (payload.msg) {
                    console.log("msg: " + payload.msg)
                } else {
                    console.log("no msg");
                }
                set(ref(db, userPATH+"_modelParams"), modelParamsToPersistence(model));
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
                - something like model.generated.firebasekey
                */
                const firebaseKey = 0;
                // update this path with whole generated list
                set(ref(db, userPATH+"_generatedList_"+firebaseKey), generatedListToPersistence(model));
                // update this path with eg. name updates
                if (payload.msg === "editName" && payload.msg === "editFirebaseKey") {
                    set(ref(db, userPATH+"_modelParams"), modelParamsToPersistence(model));
                }
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


function setUserPath(model) {
    let userPATH="";
    if(model.userid) {
        userPATH = "/"+model.userid;
        console.log("FIREBASE userpath set to: " + userPATH);
    } else {
        console.log("FIREBASE No user set in model, meaning firebasepath is incorrect");
    }
    return userPATH;
}


export {generatedListPromise, firebaseModelPromise};