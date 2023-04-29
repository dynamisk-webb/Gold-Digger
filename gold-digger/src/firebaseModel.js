// Imports here 
import firebaseConfig from "./firebaseConfig.js";
const { getDatabase, ref, get, set, onValue } = require("firebase/database");
const { initializeApp}= require( "firebase/app");

// Initialise firebase app, database, ref
const app= initializeApp(firebaseConfig);
const db= getDatabase(app);

function modelParamsToPersistence(model){
    if (model.userid) {
        
        // handle case of no generated playlist set in model
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
            playlistCounter:model.playlistCounter,
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
    return {generated:model.generated};
}

function persistenceToModelParams(persistedData, model, setModel) {
    if(persistedData !== null) {
        if (persistedData.userid) {
            model.userid = persistedData.userid;
        }
        console.log("Counter from persisted data" + persistedData.playlistCounter);
        if (persistedData.playlistCounter) {
            model.playlistCounter = persistedData.playlistCounter;
            console.log("Counter from persisted data, set" + persistedData.playlistCounter);
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
        //console.log("No persisted data!");
    }
    return model;
}

function persistenceToGeneratedList(persistedData, model) {
    if(persistedData !== null) {
        if (persistedData.generated) {
            model.generated = persistedData.generated;  
        } else {
            model.generated = null;
        }
    } else {
        //console.log("No persisted data!");
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
        if (payload.key) {
            if(payload.key === "modelParams") {
                set(ref(db, userPATH+"_modelParams"), modelParamsToPersistence(model));
            }
        }
    }

    // Observes current generated list and saves any changes to firebase
    // (eg creation, name change, removed track)
    function obsGeneratedListACB(payload){
        if (payload.key && payload.param) {
            if(payload.key === "modelParams" && payload.param === "generated") {
                if (payload.specs === "newList") {
                    model.playlistCounter++;
                    console.log("model.fire" + model.generated.firebaseKey);
                    model.generated.firebaseKey = model.playlistCounter;
                    console.log("Playlist counter: " + model.playlistCounter);
                    console.log("model.fire" + model.generated.firebaseKey);
                    model.addToPrevPlaylists();
                }
                console.log("Playlist counter: " + model.playlistCounter);
                console.log("model.fire" + model.generated.firebaseKey);
                set(ref(db, userPATH+"_generatedList_" + model.generated.firebaseKey), generatedListToPersistence(model));
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

        model.user = null;
        model.resetParams();
    }
}


function setUserPath(model) {
    let userPATH="";
    if(model.userid) {
        userPATH = "/"+model.userid;
        //console.log("FIREBASE userpath set to: " + userPATH);
    } else {
        //console.log("FIREBASE No user set in model, firebasepath is incorrect");
    }
    return userPATH;
}


export {generatedListPromise, firebaseModelPromise};