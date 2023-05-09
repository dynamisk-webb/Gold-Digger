import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import { getGenres } from "../spotifySource.js";
import { useEffect, useState } from "react";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise.js";

function Genres(props) {
   
    //state for list of generes
    const [promiseState, setState] = useState({});
<<<<<<< Updated upstream
    const [filteredState, setFilteredState] = useState([])
    const [genreListState, setGenreListState] = useState([]);
    const [searchState, setSearchState] = useState("");
   
=======
    const genres = [];
    const sentGenres = [];
    let searchTerm = ""; // TODO: ta in vad användaren skriver
>>>>>>> Stashed changes
    useEffect(()=>{    
        async function getGenreACB() {
            // Get all genres from Spotify
            resolvePromise(getGenres(), promiseState, setState);
        }

        getGenreACB();
    }, []);
    
    useEffect(() =>{
        if(promiseState.data != null){
            // transfer results from promisestate into genreList
            let genreList = promiseState.data.map(x => {return {genre: x, checked: false}})
            genreList.forEach(element => {
                if(props.model.genres.includes(element.genre))
                    element.checked = true;
                })

<<<<<<< Updated upstream
            // transfer results from genreList into filteredState and genreListState
            setFilteredState(genreList);
            setGenreListState(genreList);
            
        }
    }, [promiseState, setState])

    function filterGenre(searchTerm) {
        // filter and include everything that matches the searchTerm from the list of genres
        setFilteredState(genreListState.filter(element => element.genre.includes (searchTerm)));
    }

    function searchGenreACB(searchData){
        // filter based on the search term
        filterGenre(searchData);
        // save the search term
        setSearchState(searchData);
=======
    useEffect (convertACB, [promiseState]);

    /* Convert to variable so that we minmise number of expensive API calls */
    function convertACB () {
        // om genres är undefined, kasta error? Annars, ansätt till variabler så vi slipper göra många API calls.
        if (!promiseState.data)
            console.log("promiseState.data is undefined");

        genres = promiseState.data;
        sentGenres = genres;
    }

    /* TODO: sort function. Sort the chosen genres to display.
    Filter out everything that matches the searchTerm from the list of genres */
    function filterGenreACB() {
        sentGenres = genres.filter (searchTerm);
>>>>>>> Stashed changes
    }

    // Add some loading
    return (
        <div id="genreMainGrid">
<<<<<<< Updated upstream
            <SearchView id="search" search={searchGenreACB}></SearchView>
            {promiseNoData(promiseState) || <GenreResultView id="genreResults" genreResults={filteredState} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
            <FilterView filterType="genre" title="Select Genres" noTitle="Step 2 of 4" nextTitle="Next" ></FilterView>
=======
            <SearchView id="search"></SearchView>
            {promiseNoData(promiseState) || <GenreResultView id="genreResults" genreResults={sentGenres} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
            <FilterView filterType="genre" title="Select Genres" nextTitle="Next" ></FilterView>
>>>>>>> Stashed changes
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
