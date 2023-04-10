import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import ArtistResultView from "../views/artistResultView.js";

function Artists(props) {

    // TODO: add parameter setIncludeExclude 
    return (
        <div>
            <FilterView filterType="artist" title="Include or Exclude Artists" nextTitle="Next"></FilterView>
            <SearchView></SearchView>
            <ArtistResultView></ArtistResultView>
        </div>
    );
}

export default Artists;
