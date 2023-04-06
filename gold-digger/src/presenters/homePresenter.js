/*

TODO

Lifecycle: GET prev playlists from Firebase
For each previous playlist Event: onClick inspect playlist
Event: Set window.location to Source

*/


function Home() {

    
    return (
      <HomeView></HomeView>  
    );

    /* Lifecycle */
    function onMountedACB () {

        function onUnMountedACB () {
            return;
        }
        return;
    }

    function connectSpotifyACB() {
        // login();
        // requestToken();
    }

    function generatePlaylist() {
        // go to next window, ie Source Presenter
        return redirect("/source"); 
    }

}
export default Home;