import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import { getGenres } from "../spotifySource.js";
import { useEffect, useState } from "react";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise.js";
import React from "react";

function Genres(props) {
    // debug
    // props.model.debugModelState("/genre init");

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
        //props.model.debugModelState("/genre rerender");
    }


    //state for list of generes
    const [promiseState, setState] = useState({});
    const [filteredState, setFilteredState] = useState([])
    const [genreListState, setGenreListState] = useState([]);
    const [searchState, setSearchState] = useState("");

    // get genres
    useEffect(()=>{    
        async function getGenreACB() {
            // Get all genres from Spotify
            resolvePromise(getGenres(), promiseState, setState);
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
            
        }
    }, [promiseState, setState])

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
            <FilterView filterType="genre" title="Select Genres" noTitle="Step 2 of 4" nextTitle="Next" ></FilterView>
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
    }
}

export default Genres;
