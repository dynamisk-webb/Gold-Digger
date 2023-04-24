import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import { getGenres } from "../spotifySource.js";
import { useEffect, useState } from "react";
import promiseNoData from "../views/promiseNoData.js";

function Genres(props) {
    const [genres, setGenres] = useState();
    const [promiseState, setState] = useState({});
    useEffect(()=>{    
        async function getGenreACB() {
            let response = await getGenres();
            setGenres(response);
            console.log("Genres: " + genres[0]);
        } 
        getGenreACB();
    }, []);

    // Add some loading
    return (
        <div id="genreMainGrid">
            <SearchView id="search"></SearchView>
            {promiseNoData(promiseState) || <GenreResultView id="genreResults" genreResults={genres} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
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

export default Genres;
