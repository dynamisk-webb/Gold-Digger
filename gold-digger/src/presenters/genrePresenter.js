import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import {getGenres, getSavedTracks } from "../spotifySource.js";
import promiseNoData from "../views/promiseNoData.js";
import { useEffect, useState } from "react";
import resolvePromise from "../resolvePromise.js";

function Genres(props) {
    const [promiseState, setPromise] = useState({});
    //useEffect(getGenreACB, [setPromise]);

    const genres = ["acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"];

    return (
        <div id="genreMainGrid">
            <FilterView filterType="genre" title="Select Genres" nextTitle="Next" ></FilterView>
            <SearchView id="search"></SearchView>
            {promiseNoData(promiseState) || <GenreResultView genreResults={genres} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
        </div>
    );

    function setSelectDeselectACB(genre , mode) {
        if(mode === 1) {
            props.model.addGenre(genre);
        } else if(mode === -1) {
            props.model.removeGenre(genre);
        }
    }
    /*
    function getGenreACB() {
        resolvePromise(getGenres(), promiseState, setPromise);
    }
    */
}

export default Genres;
