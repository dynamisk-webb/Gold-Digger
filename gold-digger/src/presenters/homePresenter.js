import HomeView from "../views/homeView.js";
import { generatedListPromise } from "../firebaseModel.js";

function Home(props) {

    return (
      <HomeView testName={props.model.generated.playlistName} generatePlaylist={generatePlaylistACB} setCurrentPlaylist={setCurrentPlaylistACB} prevPlaylists={props.model.prevPlaylists}></HomeView>  
    );

    /*
    TODO
    For each previous playlist Event: onClick inspect playlist
    */
  

    function generatePlaylistACB() {
        // TODO
    }

    // Set the generated playlist as the current playlist in the model
    function setCurrentPlaylistACB (playlistName, firebaseKey) {
      props.model.setGeneratedName(playlistName);
      props.model.setGeneratedFirebaseKey(firebaseKey);
      //TODO resolve generatedListPromise in playlistPresenter instead!
    }
}

export default Home;
