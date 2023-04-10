/*
TODO

Props: Genres want/unwanted
Component state members: Search term
Lifecycle: GET /recommendations/available-genre-seeds (only available genres from the library/playlist)
Event: Set search term in component state
GET /search type:genre
Event: onCheck set/unset genres
Event: onClick window.location to Parameters

*/
import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import {redirect} from "react-router-dom";

function Genres(props) {

    return (
        <div>
            <FilterView filterType="genre" title="Select Genres" nextTitle="Next"></FilterView>
            <SearchView></SearchView>
            <GenreResultView></GenreResultView>
        </div>
    );
    
    /* Event: onClick go to next page */
    function goForwardACB () {
        return redirect("/parameters");  // TODO: get url for this
    }
    
    /* Event: onClick go back to previous page */
    function goBackACB () {
        return redirect("/source"); // TODO: get url for this
    }
}

export default Genres;
