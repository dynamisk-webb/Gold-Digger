import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import { getGenresSaved, getGenresPlaylist } from "../spotifySource.js";
import { useEffect, useState } from "react";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise.js";
import { update } from "firebase/database";

function Genres(props) {

    // add observer for notifications for state changes
    useEffect(addObserverOnCreatedACB, []);
    const [, forceReRender ]= useState(); 

    function addObserverOnCreatedACB() {
        props.model.addObserver(notifyACB);

        function removeObserverOnDestroyACB() {
            props.model.removeObserver(notifyACB);
        }
        return removeObserverOnDestroyACB;
    }

    // rerender on state change
    function notifyACB() {
        forceReRender({});
    }

    //state for list of generes
    const [promiseState, setState] = useState({});
    const [filteredState, setFilteredState] = useState([])
    const [genreListState, setGenreListState] = useState([]);
    const [searchState, setSearchState] = useState("");
    const [nextState, setNextState] = useState("Include all");

    // get genres
    useEffect(()=>{    
        async function getGenreACB() {
            // Get all genres from Spotify
            const playlist = props.model.source;
            if(playlist === "saved") {
                resolvePromise(getGenresSaved(), promiseState, setState);
            } else {
                resolvePromise(getGenresPlaylist(playlist), promiseState, setState);
            }
            notifyACB();
        }
        getGenreACB();
    }, []);
    
    // fill genrelist
    useEffect(() =>{
        if(promiseState.data != null){
            // transfer results from promisestate into genreList
            let genreList = promiseState.data.map(x => {return {genre: x, checked: false}})
            genreList.forEach(element => {
                if(props.model.genres.includes(element.genre))
                element.checked = true;
            })
            
            // transfer results from genreList into filteredState and genreListState
            setFilteredState(genreList);
            setGenreListState(genreList);
            updateNext();
            
        }
    }, [promiseState, setState]);

    function filterGenre(searchTerm) {
        // filter and include everything that matches the searchTerm from the list of genres
        setFilteredState(genreListState.filter(element => element.genre.toLowerCase().includes (searchTerm.toLowerCase())));
    }

    function searchGenreACB(searchData){
        // filter based on the search term
        filterGenre(searchData);
        // save the search term
        setSearchState(searchData);
    }

    // Add some loading
    return (
        <div id="genreMainGrid">
            <SearchView id="search" search={searchGenreACB}></SearchView>
            {promiseNoData(promiseState) || <GenreResultView id="genreResults" genreResults={filteredState} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
            <FilterView 
                filterType="genre" 
                title="Select Genres" 
                noTitle="Step 2 of 4" 
                nextTitle={nextState}
                loadingComplete={promiseState.data != null}></FilterView>
        </div>
    );

    function setSelectDeselectACB(genre , mode) {
        
        let genreList = genreListState;
        if(mode === 1) {
            props.model.addGenre(genre);
            genreList.find(element => {return element.genre == genre}).checked = true;
            
        } else if(mode === -1) {
            props.model.removeGenre(genre);
            genreList.find(element => {return element.genre == genre}).checked = false;
        }
        setGenreListState(genreList);

        // Re-render the filtered list with updated states
        filterGenre(searchState);

        // Update "next" button
        updateNext();
        
    }

    /* Update the text on the button navigating the user to the Artist view. Include all if no genres have been selected*/
    function updateNext(){
        if(nextState == "Include all" && props.model.genres.length != 0) setNextState("Next");
        else if (nextState == "Next" && props.model.genres.length == 0) setNextState("Include all");
    }
}

export default Genres;
