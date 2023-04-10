
/*

Props: Artists wanted/unwanted
Component state members: Search term
Lifecycle: GET /me/top/artists or get all artists in playlist (place in included artists)

Event: onInput set search term in component state
GET /search type:artist
Event: onCheck set/unset artist wanted
if in artist unwanted
Disabled
Event: onCheck set/unset artist unwanted
if in artists wanted
Disabled


*/

import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import ArtistResultView from "../views/artistResultView.js";
import {redirect} from "react-router-dom";

function Artists(props) {

    // TODO: add parameter setIncludeExclude 
    return (
        <div>
            <FilterView filterType="artist" title="Include or Exclude Artists" nextTitle="Next"></FilterView>
            <SearchView></SearchView>
            <ArtistResultView></ArtistResultView>
        </div>
    );

    /* Event: onClick go to next page */
    function goForwardACB () {
        return redirect("/loading");  // TODO: get url for this
    }
    
    /* Event: onClick go back to previous page */
    function goBackACB () {
        // return redirect("/login");
        return redirect("/parameters"); // TODO: get url for this
    }
}

export default Artists;
