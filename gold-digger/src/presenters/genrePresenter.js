import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import { getGenres } from "../spotifySource.js";
import { useEffect, useState } from "react";
import Loading from "../views/loadingView.js"

function Genres(props) {
    const [genres, setGenres] = useState();
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
            <FilterView filterType="genre" title="Select Genres" nextTitle="Next" ></FilterView>
            <SearchView id="search"></SearchView>
            {<Loading/> || <GenreResultView genreResults={genres} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
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
