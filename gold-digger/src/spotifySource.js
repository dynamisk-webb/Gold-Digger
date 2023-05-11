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
    console.log(tracks);
    tracks = tracks.concat(response.items.map(savedTrackToFormatCB));
    if(response.next !== null) {  // If there is more to retrieve
      return generalAPI(apiToEndpoint(response.next)).then(filterACB);
    } else {
      return tracks;
    }
  }
}

function getTracksPlaylist(playlist) {  // Get tracks from playlist
  const id = convertURLtoID(playlist);
  const fields = "?limit=50&fields=next,items(track(album(id, images),artists(genres,id,name,images),name,id))"; // Adjust what is retrieved here
  let tracks = [];
  return generalAPI('/playlists/' + id + '/tracks' + fields).then(getNextACB);

  function getNextACB(response) {
    console.log(response);
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
        album: {images:track.album.images, name:track.album.naame},
        artists: track.artists.map(artistToFormatCB),
        id: track.id,
        href: track.href,
        name: track.name
      }
    }
  })
  )
}

async function getAllTracks(idlist) { // Gets all tracks from a id list
  let currentIds = idlist.slice(0, 50);
  let leftIds = idlist.slice(50);
  const tracks = await getTracks(currentIds);
  while(leftIds.length) {
    currentIds = leftIds.slice(0,50);
    leftIds = leftIds.slice(50);
    tracks.concat(await getTracks(currentIds));
  }
  return tracks;
}

async function getTrackParam(id) {  // Gets a tracks audio parameter
  const response = await generalAPI('/audio-features/' + id);
  return trackParamsToFormatCB(response);
}

async function getTracksParams(idlist) {  // Gets tracks audio parameters
  const ids = "?ids=" + idlist.join();
  return await generalAPI('/audio-features' + ids).map(trackParamsToFormatCB);
}

async function getAllTracksParams(idlist) {
  let currentIds = idlist.slice(0, 100);
  let leftIds = idlist.slice(100);
  const tracks = await getTracksParams(currentIds);
  while(leftIds.length) {
    currentIds = leftIds.slice(0,100);
    leftIds = leftIds.slice(100);
    tracks.concat(await getTracksParams(currentIds));
  }
  return tracks;
}

async function getGenres() {  // Returns list of all genres
  const response = await generalAPI('/recommendations/available-genre-seeds');
  return response.genres;
}

async function getArtistsPlaylist(playlist) { // Returns list of all artists in a playlist
  const list = getTracksPlaylist(playlist);
  const artistList = [];
  
  list.forEach((track) => {  
    const artists = track.track.artists;
    artists.forEach((artist) => { // Don't allow repeats
      if(!artistList.find(element => element.id == artist.id))
        artistList.push(artist);
    });
  });

  return artistList;
}

// TODO getArtists from saved

async function getArtist(id) {  // Get Artist by Spotify ID
  return await generalAPI('/artists/' + id);
}

/* Search */
async function searchArtist(term) { // By search term, return a list of possible artists
  return await generalAPI('/search?' + new URLSearchParams("query=" + term + "&type=artist"));
}

/* Set playback state */

function playTrack(tracks) { // Set player to track based on id
  const body = {
    uris:tracks.map(convertIDtoURI)
  }

  generalAPI('/me/player/play/', "PUT", JSON.stringify(body));
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
async function addTracks(playlist, idlist) {  // Adds several tracks to one playlist based on id, max 100
  const uris = idlist.map(convertIDtoURI);
  const body = {
    "uris": uris
  };
  generalAPI('/playlists/' + playlist + '/tracks', "POST", JSON.stringify(body));
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

    
    let accessToken = localStorage.getItem('access-token');
    const response = await fetch('https://api.spotify.com/v1' + endpoint, {
      method:method,  
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      body:body
    });
    
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
      } 

      if(method === "GET" || method === "POST")
        return await response.json();
  }
}

// Help-functions
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

function artistToFormatCB(artist) {
  return {
    genres: artist.genres,
    id: artist.id,
    name: artist.name,
    images: artist.images
  }
}

function trackParamsToFormatCB(track) {
  return {
    acousticness: track.acousticness,
    danceability: track.danceability,
    instrumentalness: track.instrumentalness,
    loudness: track.loudness,
    tempo: track.tempo
  };
}

function convertIDtoURI(ID) { // Converts id to spotify URI
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

function apiToEndpoint(url) { // Removes start
  return url.replace("https://api.spotify.com/v1", '');
}

export {getProfile, getSavedTracks, getTracks, getAllTracks, getTracksPlaylist, getTrackParam, getTracksParams, getAllTracksParams, getGenres, getArtistsPlaylist, getArtist, createPlaylist, addTracks, changePlaylistName, playTrack, removeTrack};