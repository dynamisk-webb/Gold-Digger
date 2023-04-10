import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import GenreResultView from "../views/genreResultView.js";
import {getGenres } from "../spotifySource.js";
import promiseNoData from "../views/promiseNoData.js";
import { useEffect, useState } from "react";
import resolvePromise from "../resolvePromise.js";

function Genres(props) {
    const [promiseState, setPromise] = useState({});
    useEffect(onMountACB, []);

    return (
        <div>
            <FilterView filterType="genre" title="Select Genres" nextTitle="Next" ></FilterView>
            <SearchView></SearchView>
            {promiseNoData(promiseState) || <GenreResultView genreResults={promiseState.data} setSelectDeselect={setSelectDeselectACB}></GenreResultView>}
        </div>
    );

    function setSelectDeselectACB(genre , mode) {
        if(mode === 1) {
            props.model.addGenre(genre);
        } else if(mode === -1) {
            props.model.removeGenre(genre);
        }
    }
    function onMountACB() {
        resolvePromise(getGenres(), promiseState, setPromise);

    }
}

export default Genres;
