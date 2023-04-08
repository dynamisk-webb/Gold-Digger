import {refreshAccessToken} from "./authentication.js";

/* 
EXAMPLE FUNCTION FROM SPOTIFYS TUTORIAL
https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

Current access token is available in localStorage
*/
async function getProfile() {
    let response = await generalAPI('v1/me', "GET");
    console.log("Response: " + response.id);
  }

/* Getter */
async function getSavedTracks() {
  
}

async function generalAPI(endpoint, method, body=null) {

  // TODO: if null, redirect to home
  if (localStorage.getItem('expire-time') != null) {

    // check if access token needs to be refreshed
    const currentTime = new Date().getTime();
    if (currentTime > localStorage.getItem('expire-time')) {
      // do somthing about it
      console.log("refresh!");
      refreshAccessToken();
    }

    let accessToken = localStorage.getItem('access-token');

    const response = await fetch('https://api.spotify.com/' + endpoint, {
      method:method,  
      headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      return response.json();
    } 
}


export {getProfile};