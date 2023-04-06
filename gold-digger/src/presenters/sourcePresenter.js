/*

TODO

Event: Set window.location to Home

Event: onInput set playlist ID
    or
Event: onClick continue to artists
playlist ID is blank when using saved tracks
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

import sourceView from "../views/sourceView";

function Source (props) {
    return (<div></div>);

    function setPlaylistIDACB(evt){

        // if onInput
        props.model.setPlaylistID();
   
        // if onClick
        props.model.goToArtists();
    }



}
export default Source;