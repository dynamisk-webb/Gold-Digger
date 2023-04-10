<a name="readme-top"></a>

<!-- Title and Logo -->
<br />
<div align="center">
  <a href="https://github.com/dynamisk-webb/Gold-Digger">
    <img src="images/piano.png" height="200">
  </a>

  <h3 align="center">Gold Digger</h3>

  <p align="center">
    A iprogd Project Web site that generates a Spotify playlist based on selected parameters and your own library.
    <br />
    <br />
    <a href="https://gold-digger-be2ef.web.app/">Deployed Site</a>
    ·
    <a href="https://www.figma.com/file/3TpeoyPVti5l0aqRASbQL3/Gold-Digger-mock-up?node-id=0%3A1&t=UOCqxbzFzoUMvWx5-1">View Prototype</a>
  </p>
</div>

<!-- Table of Contents -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#description">Description</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#progress">Progress</a></li>
    <li><a href="#plan">Plan</a></li>
    <li>
      <a href="#project-file-structure">Project File Structure</a>
      <ul>
        <li><a href="#model">Model</a></li>
        <li><a href="#spotify-api">Spotify API</a></li>
        <li><a href="#presenters">Presenters</a></li>
        <li><a href="#views">Views</a></li>
        <li><a href="persistence">Persistence</a></li>
      </ul>
    </li>
     <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## **Description**
<div >
  <img src="images/frontPage.png" height="350">
</div>

Our web app will help Spotify users generate new playlists from sections of their pre-existing playlists or saved tracks. The user gets to first either select a playlist or their saved tracks and then their preferences in the app according to their current ~mood or ~feel.

*Go to <a href="progress">Progress</a> amd <a href="plan">Plan</a> to see detailed description of functionality.*

### Built with
* [![Node.js][node-shield]][node-url]
* [![MUI][mui-shield]][mui-url]
* [![Spotify][spotify-shield]][spotify-url]
* [![React][react-shield]][react-url]

### How to use

This project depends on Spotify's API to run.

1. Go to the deployed <a href="https://gold-digger-be2ef.web.app/">site</a>
2. You need Spotify to connect to and Spotify API needs to register the username before using in Develop-mode. **Log-in with this dummy account to test the app:**
```
  Dummy Account Email: test.iprogd@gmail.com
  Password: testare_iprogd
```
1. `Peer-review!`

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## **Progress**
### Application

The main feature that we implemented into the project:
- Create a playlist from your saved tracks/a playlist by filtering
  - Parameters to filter from:
    - Genre
    - Artists (Include/Exclude)
    - Tempo (BPM)
    - Loudness (Noise)
    - Danceability
    - Instrumentality
    - Acoustic
  - Not all filters have to be selected

Tracks are selected from the specific filters.

We have planned our layout, added functions for API calls and Spotify log-in (through `OAuth 2.0`). The model is also complete and our site is deployed on firebase. The buttons should be functional and simulate the intended user experience but the current playlist, artists and genres are fixed so it most buttons don't run any API calls.

We have also implemented routing with the use of React's router system and restricts access to specific routes.

&nbsp;   

### User Experience

We have a clickable <a href="https://www.figma.com/file/3TpeoyPVti5l0aqRASbQL3/Gold-Digger-mock-up?node-id=0%3A1&t=UOCqxbzFzoUMvWx5-1">digital prototype</a> made in Figma that we have used for the first user testing which represents our vision.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## **Plan**
### What we plan to do

Our main functionality and playlist generation logic is in progress. What we still have to do:
- [ ] Playlist generation logic
- [ ] Complete appearance
  - [ ] Better CSS
  - [ ] Functional search bar
  - [ ] Proper display of playlists
- [ ] Edit final playlist (remove songs) and saving it to Spotify
- [ ] Implement API calls
- [ ] Suspense
  - [ ] Spotify-compatible audio player that plays standby music when loading for suspense
- [ ] Persistence with ``Firebase``

If we have time, we'd like to add a third-party component.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## **Project File Structure**

We're following the MVP-architecture for the project.

Project files for the app are under `/gold-digger/`. The code is mainly divided into the folders:
- `src` contains DiggerModel.js, App.js, index.js that renders the app and source-files with authentication and api calls
- `src/presenters/` contains our presenters 
- `src/static/` contains CSS files
- `src/views/`contains our views 
- `src/test/` contains test files for API calls and log in

### Spotify API

We use Spotify's own API to implement our app. It requires authorize `OAuth 2.0` and redirects to Spotify's log in page. Our authentication implementation is defined in `authentication.js` 

The API calls we run currently:
- Fetch access token with ``requestAccessToken()`` in `authentication.js`

The others are defined but not yet tested in `spotifySource.js`. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## **Contact**
Jessica Gorwat – jgorwat@kth.se

Julia Wang – julwan@kth.se

Maria Moliteus – moliteus@kth.se

Rej Karlander – isakkar@kth.se

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Links & Images -->
[spotify-shield]:https://camo.githubusercontent.com/f63f025c4f4797f4e0cf1904d1c87d02179a369b11948d5023af396d30dcad7b/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d53706f7469667926636f6c6f723d314442393534266c6f676f3d53706f74696679266c6f676f436f6c6f723d464646464646266c6162656c3d
[spotify-url]:https://developer.spotify.com/documentation/web-api
[react-shield]:https://camo.githubusercontent.com/67a01fa7cf337616274f39c070a11638f2e65720e414ef55b8dd3f9c2a803b2a/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d526561637426636f6c6f723d323232323232266c6f676f3d5265616374266c6f676f436f6c6f723d363144414642266c6162656c3d
[react-url]:https://react.dev/
[node-shield]:https://camo.githubusercontent.com/faec9d89bd2c7d47b91d988dcd0f27011c27e8191d45836cfa36bf2b3c2a92bd/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4e6f64652e6a7326636f6c6f723d333339393333266c6f676f3d4e6f64652e6a73266c6f676f436f6c6f723d464646464646266c6162656c3d
[node-url]:https://nodejs.org/en
[mui-shield]:https://camo.githubusercontent.com/208852c2348eb4c34115c18e7bc1364ef7ccc88a76a8e659a7ba13c4da7318c0/68747470733a2f2f696d672e736869656c64732e696f2f7374617469632f76313f7374796c653d666f722d7468652d6261646765266d6573736167653d4d554926636f6c6f723d303037464646266c6f676f3d4d5549266c6f676f436f6c6f723d464646464646266c6162656c3d
[mui-url]:https://mui.com/