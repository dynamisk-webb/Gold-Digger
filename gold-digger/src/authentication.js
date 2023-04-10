/* 
authentication.js
A collection of functions used in the verification process.
Based on code from Spotify's tutorial at https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
*/

import {CLIENT_ID, REDIRECT_URI} from "./apiConfig";
export {generateRandomString, generateCodeChallenge, redirectToSpotifyLogIn, requestAccessToken, refreshAccessToken};

// Generate a code verifier (in PKCE standard a code verifier is a high-entropy cryptographic random string with a length between 43 and 128 characters
function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
  

  // Returns the value that will be sent within the user authorization request
  async function generateCodeChallenge(codeVerifier) {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
  
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
  
    return base64encode(digest);
  }
  
/*
Redirect user to Spotify server in order for them to
*/
function redirectToSpotifyLogIn() {
    let codeVerifier = generateRandomString(128);

    generateCodeChallenge(codeVerifier).then(codeChallenge => {
    let state = generateRandomString(16);
    let scope = 'user-read-private user-read-email playlist-read-private user-library-read playlist-modify-public playlist-modify-private';

    localStorage.setItem('code-verifier', codeVerifier);
    localStorage.setItem('test-item', 'i am a test item');

    let args = new URLSearchParams({
        response_type: 'code',
        client_id: CLIENT_ID,
        scope: scope,
        redirect_uri: REDIRECT_URI,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
    });
    
    window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
}

/* 
Request access token once user has accepted the request from redirectToSpotifyLogIn.
Saves token in localStorage on success.    
*/ 
function requestAccessToken() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    let codeVerifier = localStorage.getItem('code-verifier');

    let body = new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        code_verifier: codeVerifier
    });

    //Finally, we can make the POST request and store the access token by parsing the JSON response from the server:
    const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // set access token
        localStorage.setItem('access-token', data.access_token);
        console.log("access token: " +  data.access_token);

        // Set expire time
        const expire_time = new Date().getTime() + data.expires_in*1000;
        localStorage.setItem('expire-time', expire_time);

        // set refresh token
        localStorage.setItem('refresh-token', data.refresh_token);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


/* Refresh! */
function refreshAccessToken() {
    let body = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: CLIENT_ID,
        refresh_token: localStorage.getItem('refresh-token')
      });

    const response = fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body
    })
    .then(response => {
        if (!response.ok) {
        throw new Error('HTTP status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('access-token', data.access_token);
        console.log("new access token: " +  data.access_token);
       
        // set expire time
        const expire_time = new Date(new Date().getTime() + data.expires_in*1000);
        localStorage.setItem('expire-time', expire_time);

        // set refresh token
        localStorage.setItem('refresh-token', data.refresh_token);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}