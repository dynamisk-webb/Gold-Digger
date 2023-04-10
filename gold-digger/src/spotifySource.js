import {BASE_URL} from "./apiConfig.js";
import {refreshAccessToken} from "./authentication.js";

/* 
EXAMPLE FUNCTION FROM SPOTIFYS TUTORIAL
https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow

Current access token is available in localStorage
*/

async function getProfile() {
    let response = await generalAPI('/me');
    console.log("Response: " + response.id);
  }


async function generalAPI(endpoint) {

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
        headers: {
          Authorization: 'Bearer ' + accessToken
        }
      });

      return response.json();
    } 
}


export {getProfile};