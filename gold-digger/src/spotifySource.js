import {refreshAccessToken} from "./authentication.js";
import {usePlayerDevice} from "react-spotify-web-playback-sdk";

/* 
EXAMPLE FUNCTION FROM SPOTIFYS TUTORIAL
https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

Current access token is available in localStorage
*/
async function getProfile() {
    let response = await generalAPI('/me');
    return response;
}

/* Getter */
function getSavedTracks() { 
  // Add limit and offset to pick out parts or limit amount of tracks
  let response = generalAPI('/me/tracks');
  const list =  [...response.items]; 
  return list;
}
async function getTracksPlaylist(playlist) {  // Get from playlist
  const fields = "?fields=items(track(name, id))"; // Adjust what is retrieved here
  return generalAPI('/playlists/' + playlist + '/tracks' + fields);
}
async function getTracks(idlist) {
  const ids = "?ids=" + idlist.join();
  return await generalAPI('/tracks' + ids);
}
async function getTrackParam(id) {
  return await generalAPI('/audio-features/' + id);
}
async function getTracksParams(idlist) {
  const ids = "?ids=" + idlist.join();
  return await generalAPI('/audio-features' + ids);
}
async function getGenres() {
  const response = await generalAPI('/recommendations/available-genre-seeds');
  return response.genres;
}
async function getArtists(playlist) {
  const fields = "?fields=items(track(artists(name, id)))"; // Adjust what is retrieved here
  const response = await generalAPI('/playlists/' + playlist + '/tracks' + fields); // Returns a list of tracks with list of artists for each
  return response.items.flat();
}
async function getArtist(id) {  // By Spotify ID
  return await generalAPI('/artists/' + id);
}

/* Search */
async function searchArtist(term) { // By search term, return a list of possible artists
  return await generalAPI('/search?' + new URLSearchParams("query=" + term + "&type=artist"));
}

/* Set playback state */
async function useTrack(track) { // Set player to track based on id
  const device = usePlayerDevice();
  if(device === null) return;

  const body = {
    "uris": track
  }

  generalAPI('/me/player/play?device_id=${device.device_id}', "PUT", body);
}

/* Generate Playlist and Add to it */
async function createPlaylist(userid, name) {
  const body = {
    "name": name,
    "description": "Playlist Generated through Gold Digger",
    "public": false
  };
  return generalAPI('/users/' + userid + '/playlists', "POST", body).id;  // Returns the new playlist id
}
async function addTracks(playlist, idlist) {  // Adds several tracks to one playlist based on id, max 100
  const uris = idlist.map(convertToURICB);
  const body = {
    "uris": uris
  };
  generalAPI('playlists/' + playlist + '/tracks', "POST", body);

  function convertToURICB(elem){
    return "spotify:track:"+elem;
  }
}
async function changePlaylistName(playlist, name) { // Changes playlist name
  const body = {
    "name": name,
  };
  generalAPI('/playlists/' + playlist, "PUT", body);
}
async function removeTrack(playlist, track) {
  const body = {
    "tracks": [{"uri": "spotify:track:" + track}]
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
          Authorization: 'Bearer ' + accessToken
        },
      body:body
      });

      return await response.json();
  }
}

export {getProfile, getSavedTracks, getTracks, getTracksPlaylist, getTrackParam, getTracksParams, getGenres, getArtists, getArtist, searchArtist, createPlaylist, addTracks, changePlaylistName, useTrack, removeTrack};