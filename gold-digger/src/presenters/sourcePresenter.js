/*
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


function Source (props) {
    return (
        <SourceView setSource={setPlaylistIDACB} setSourceSaved={setSourceACB}/>
    );

    /* Event: onInput set playlist ID 
    User chooses to generate playlist based on a playlist on Spotify
    */    
    function setPlaylistIDACB (playlistID) {
        props.model.setSource (playlistID);
    }
    
    /* Event: onClick set source to saved songs
    User chooses to generate playlist based on their saved songs on Spotify
    */
    // TODO: Will this be any different from the function above...? 
    function setSourceACB() {
        // TODO, call function made by Julia
    }
    
}
export default Source;