import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import { getGenres } from "../spotifySource.js";
import { useEffect, useState } from "react";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise.js";

function Genres(props) {
   
    const [promiseState, setState] = useState({});
    useEffect(()=>{    
        async function getGenreACB() {
            resolvePromise(getGenres(), promiseState, setState);
            
            // resolve promise with sort function, promiseState and setPromise
            // resolvePromise(filterGenreACB, promiseState, setPromise);
        } 
        getGenreACB();
    }, []);

    // function getGenreACB() {}

    // TODO: sort function. Sort the chosen genres to display. Sort based on... what?
    function filterGenreACB() {
        // filter out everything that matches the searchTerm from the list of genres

    }

    // Add some loading
    return (
        <div id="genreMainGrid">
            <SearchView id="search"></SearchView>
            {promiseNoData(promiseState) || <GenreResultView id="genreResults" genreResults={promiseState.data} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
            <FilterView filterType="genre" title="Select Genres" nextTitle="Next" ></FilterView>
        </div>
    );

    function setSelectDeselectACB(genre , mode) {
        if(mode === 1) {
            props.model.addGenre(genre);
        } else if(mode === -1) {
            props.model.removeGenre(genre);
        }
    }
}

// TODO: export searchTerm and setSearch to genreView
export default Genres;
