import {refreshAccessToken} from "./authentication.js";

/* 
EXAMPLE FUNCTION FROM SPOTIFYS TUTORIAL
https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

Current access token is available in localStorage
*/
async function getProfile() {
  let response = await generalAPI('/me');
  return response;
}

/* GET-functions */
function getSavedTracks() { // Get all of user's saved tracks
  const field = "?limit=50";
  let tracks = [];
  return generalAPI('/me/tracks' + field).then(filterACB);
  
  function filterACB(response) { 
    tracks = tracks.concat(response.items.map(savedTrackToFormatCB));
    if(response.next !== null) {  // If there is more to retrieve
      return generalAPI(apiToEndpoint(response.next)).then(filterACB);
    } else {
      return tracks;
    }
  }
  
  function savedTrackToFormatCB(element) {  // Filter what parameters is kept for each track
    return { 
      track: {
        album: {images:element.track.album.images, name:element.track.album.name},
        artists: element.track.artists.map(artistToFormatCB),
        id: element.track.id,
        href: element.track.href,
        name: element.track.name
      }
    };
  }
}


async function getPlaylistID(playlist) {  // Get id from playlist
  const id = convertURLtoID(playlist);
  return await generalAPI('/playlists/' + id); 
}


function getTracksPlaylist(playlist) {  // Get tracks from playlist
  const id = convertURLtoID(playlist);
  const fields = "?limit=50&fields=next,items(track(album(id, images),artists(genres,id,name,images),name,id))"; // Adjust what is retrieved here
  let tracks = [];
  return generalAPI('/playlists/' + id + '/tracks' + fields).then(getNextACB);

  function getNextACB(response) {
    tracks = tracks.concat(response.items);
    if(response.next !== null) {  // If there is more to retrieve
      return generalAPI(apiToEndpoint(response.next)).then(getNextACB);
    } else {
      return tracks;
    }
  } 
}

function getTracks(idlist) {  // Gets maximum of 50 tracks from id list
  const ids = "?ids=" + idlist.join();
  return generalAPI('/tracks' + ids).then((response) => response.tracks.map((track) => { 
    return {
      track: {
        album: {images:track.album.images, name:track.album.name},
        artists: track.artists.map(artistToFormatCB),
        id: track.id,
        href: track.href,
        name: track.name
      }
    }
  })
  )
}

function getAllTracks(idlist) { // Gets all tracks from a id list
  return fetchAllFromIDList(getTracks, idlist).then((values) => {
    return values.reduce((subArray, response) => subArray.concat(response), []);
  });
}

function getTrackParams(id) { // Gets a tracks audio parameter
  return generalAPI('/audio-features/' + id).then(trackParamsToFormatCB);
}

function getTracksParams(idlist) {  // Gets tracks audio parameters
  const ids = "?ids=" + idlist.join();
  return generalAPI('/audio-features' + ids).then((response) => {return response.audio_features.map(trackParamsToFormatCB);});
}

function getAllTracksParams(idlist) {
  return fetchAllFromIDList(getTracksParams, idlist).then((values) => {
    return values.reduce((subArray, response) => subArray.concat(response), []);
  });
}

async function getGenres() {  // Returns list of all genres
  const response = await generalAPI('/recommendations/available-genre-seeds');
  return response.genres;
}

function getArtistsPlaylist(playlist) { // Returns list of all artists IDs in a playlist
  const list = getTracksPlaylist(playlist).then(tracksToArtistList);
  return list;
}

function getArtistsSaved() {  // Returns list of all artists IDs in saved tracks
  const list = getSavedTracks().then(tracksToArtistList);
  return list;
}

function getArtists(idlist) {  // Get Artist by Spotify ID
  const field = "?ids=" + idlist.join();
  return generalAPI('/artists' + field);
}

function getAllArtistsPlaylist(playlist) {
  return getArtistsPlaylist(playlist).then((idlist) => {   // Retrieve ids from playlist
    return fetchAllFromIDList(getArtists, idlist);  // Get ids from different api call
  }).then((values) => { // Reduce the list to one
    return values.reduce((subArray, response) => {
      return subArray.concat(response.artists)}, []);
  }).then((artists) => artists.map(artistToFormatCB));// Compress to important fields
}

function getAllArtistsSaved() {
  return getArtistsSaved().then((idlist) => {   // Retrieve ids from playlist
    return fetchAllFromIDList(getArtists, idlist);  // Get ids from different api call
  }).then((values) => { // Reduce the list to one
    return values.reduce((subArray, response) => {
      return subArray.concat(response.artists)}, []);
  }).then((artists) => artists.map(artistToFormatCB));// Compress to important fields
}

/* Search */
function searchArtist(term) { // By search term, return a list of possible artists
  return generalAPI('/search?' + new URLSearchParams("query=" + term + "&type=artist"));
}

/* Set playback state */
function getDevices() { // Get available spotify devices 
  return generalAPI('/me/player/devices');
}

async function playTracks(tracks) { // Set player to track based on id
  const body = {
    uris:tracks.map(convertIDtoURI)
  }

  getDevices().then(findDeviceCB).then(playCB);

  function findDeviceCB(response) {
    return response.devices.find(device => device.name === "Gold Digger");
  }
  function playCB(device) {
    const field = "?device_id=" + device.id;
    generalAPI('/me/player/play' + field, "PUT", JSON.stringify(body));
  }
}

/* Generate Playlist and Add to it */
async function createPlaylist(userid, name) {
  const body = {
    "name": name,
    "description": "Playlist Generated through Gold Digger",
    "public": false
  };
  return generalAPI('/users/' + userid + '/playlists', "POST", JSON.stringify(body));  // Returns the new playlist id
}

function addTracks(playlist, idlist) {  // Adds several tracks to one playlist based on id, max 100
  const uris = idlist.map(convertIDtoURI);
  const body = {
    "uris": uris
  };
  return generalAPI('/playlists/' + playlist + '/tracks', "POST", JSON.stringify(body));
}

function addAllTracks(playlist, idlist) {
  const promises = [];
  let currentIds = [];
  let leftIds = idlist;
  if(idlist.length > 0) {
    for(let i = 0; i < idlist.length/50; i++) {
      currentIds = leftIds.slice(0,50);
      leftIds = leftIds.slice(50);
      promises.push(addTracks(playlist, currentIds));
    }
    return Promise.all(promises);
  }
}

async function changePlaylistName(playlist, name) { // Changes playlist name by playlist id
  const body = {
    "name": name,
  };
  generalAPI('/playlists/' + playlist, "PUT", body);
}

async function removeTrack(playlist, track) {
  const body = {
    tracks:[{uri:convertIDtoURI(track)}]
  };
  generalAPI('playlists/' + playlist + '/tracks', "DELETE", body);
}

// General Spotify API Call
async function generalAPI(endpoint, method="GET", body=null) {

  if (localStorage.getItem('expire-time') != null) {

    // check if access token needs to be refreshed
    const currentTime = new Date().getTime();
    if (currentTime > localStorage.getItem('expire-time')) {
      console.log("refresh!");
      refreshAccessToken();
    }

    try {
      let accessToken = localStorage.getItem('access-token');
      const response = await fetch('https://api.spotify.com/v1' + endpoint, {
        method:method,  
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        body:body
      });
      
      //console.log("Response from fetch: ", response);
      if (response.ok) {
        if(method === "GET" || method === "POST")
          return await response.json();
      } else {
        throw new Error('HTTP status ' + response.status);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
}

// Help-functions
function tracksToArtistList(tracks) { // Retrieve unique artist from list of tracks
  const artistList = [];
  const idlist = [];
  tracks.forEach((track) => {  
    const artists = track.track.artists;
    artists.forEach((artist) => { // Don't allow repeats
      if(artistList.find(element => element.id === artist.id || element.name === artist.name)) {
        return;
      }
      artistList.push({id:artist.id, name:artist.name});
      idlist.push(artist.id);
    });
  });

  return idlist;
}

function fetchAllFromIDList(call, idlist) { // Uses Promise.all to call all promises concurrently
  const promises = [];
  let currentIds = [];
  let leftIds = idlist;
  if(idlist.length > 0) {
    for(let i = 0; i < idlist.length/50; i++) {
      currentIds = leftIds.slice(0,50);
      leftIds = leftIds.slice(50);
      promises.push(call(currentIds));
    }
    return Promise.all(promises);
  }
}

function artistToFormatCB(artist) { // Compress retrieved artist format to what we need
  let genres = [];
  let images = null;

  if (artist.genres) {
    genres = artist.genres;
  }

  if (artist.images) {
    images = artist.images;
  }

  return {
    genres:genres,
    id:artist.id,
    name:artist.name,
    images:images
  }
}

function trackParamsToFormatCB(track) { // Get audio features used in app
  return {
    id:track.id,
    acousticness: track.acousticness,
    danceability: track.danceability,
    instrumentalness: track.instrumentalness,
    loudness: track.loudness,
    tempo: track.tempo
  };
}

function convertIDtoURI(ID) { // Converts ID to spotify URI
  return "spotify:track:" + ID;
}

function convertURLtoID(url) {  // Removes part of url to convert to spotify id
  let url_new;
  if(url.includes('/track/')) // Filter based on track or playlist
    url_new = url.replace("http://open.spotify.com/track/", '');
  else
    url_new = url.replace("https://open.spotify.com/playlist/", '');
  return url_new.split('?')[0];
}

function apiToEndpoint(url) { // Removes start when retrieving next url from Spotify API
  return url.replace("https://api.spotify.com/v1", '');
}

export {getProfile, getSavedTracks, getPlaylistID, getTracks, getAllTracks, getTracksPlaylist, getTrackParams, getTracksParams, getAllTracksParams, getGenres, getArtistsPlaylist, getArtistsSaved, getAllArtistsPlaylist, getAllArtistsSaved, searchArtist, playTracks, createPlaylist, addTracks, addAllTracks, changePlaylistName, removeTrack};