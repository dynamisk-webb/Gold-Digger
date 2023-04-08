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
import {redirect} from "react-router-dom";


function Source (props) {
    return (
        <sourceView onInput={setPlaylistIDACB} onClick={goToArtistACB}></sourceView>
    );

    /* Event: onInput set playlist ID */    
    function setPlaylistIDACB(){
        props.model.setPlaylistID();
    }
    
    /*  Event: onClick continue to artists
        playlist ID is blank when using saved tracks
    */
    function goToArtistACB () {
        // router thing?
        // TODO
    }

    // TODO, router 
    /* Event: Set window.location to Home */

    /* 
    const loader = async () => {
        const user = await getUser();
        if (!user) {
        return redirect("/home");
        }
        return null;
    };
    */
    

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