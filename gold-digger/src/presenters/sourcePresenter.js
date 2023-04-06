/*

TODO


    or

____________________________________________________________________________________________


Hur man skriver en presenter Maria <3
EX: SidebarPresenter

import SidebarView from "../views/sidebarView";

function Sidebar (props) {
    return (
        <SidebarView number={props.model.numberOfGuests} dishes={props.model.dishes} onNumberChange={numChangedACB} userWantsToViewDish={viewDishACB} onDishRemoved={dishRemovedACB}/>
    );

    function numChangedACB(num){
        props.model.setNumberOfGuests(num);
    }
    function viewDishACB(dish){
        props.model.setCurrentDish(dish.id);
    }
    function dishRemovedACB(dish){
        props.model.removeFromMenu(dish);
    }
}
export default Sidebar;

*/

import SourceView from "../views/sourceView";
import redirect from "react-router-dom";


function Source (props) {
    return (
        <SourceView setSourcePlaylist={setPlaylistIDACB} setSourceSaved={setSourceACB} goForwardACB={goToArtistsACB} returnHome={returnHomeACB}></SourceView>
    );

    /* Event: onInput set playlist ID 
    User chooses to generate playlist based on a playlist on Spotify
    */    
    function setPlaylistIDACB (playlistID) {
        props.model.setPlaylistID();
    }
    
    /* Event: onClick set source to saved songs
    User chooses to generate playlist based on their saved songs on Spotify
    */
    function setSourceACB() {
        // TODO, call function made by Julia
    }

    /*  Event: onClick continue to artists
        playlist ID is blank when using saved tracks
    */
    function goToArtistsACB () {
        return redirect("/artists");
    }

    /* Event: Set window location to Home */
    function returnHomeACB () {
        return redirect("/home");
    }
}
export default Source;