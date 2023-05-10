import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import ArtistResultView from "../views/artistResultView.js";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise.js";
import { getArtist } from "../spotifySource.js";
import { useEffect, useState } from "react";

function Artists(props) {

  // State for list of artists
  const [promiseState, setState] = useState({});
  const [filteredState, setFilteredState] = useState([])
  const [artistListState, setArtistListState] = useState([]);
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    // TODO: get all artists from saved tracks or a chosen playlist

    // Right now: gets them all from Spotify(?)
    async function getArtistsACB() {
      resolvePromise(getArtist(), promiseState, setState);
    }
    getArtistsACB();

  }, []);

  useEffect(() => {
    if (promiseState.data != null) {
      // transfer results from promisestate into artistList
      let artistList = promiseState.data.map(x => { return { artist: x, checked: false } })
      artistList.forEach(element => {
        if (props.model.artist.includes(element.artist)) // TODO: kan man skriva såhär..?
          element.checked = true;
      })

      // transfer results from artistList into filteredState and artistListState
      setFilteredState(artistList);
      setArtistListState(artistList);

    }
  }, [promiseState, setState])

  function searchArtistACB(searchData) {
    // filter based on the search term
    filterArtist(searchData);
    // save the search term
    setSearchState(searchData);
  }
  const artist = [{
    id: "4UXqAaa6dQYAk18Lv7PEgX",
    name: "Fall Out Boy"
  },
  {
    id: "0gxyHStUsqpMadRV0Di1Qt",
    name: "Rick Astley"
  },
  {
    id: "6goK4KMSdP4A8lw8jk4ADk",
    name: "Pokémon"
  },
  {
    id: "04gDigrS5kc9YWfZHwBETP",
    name: "Maroon 5"
  },
  {
    id: "137W8MRPWKqSmrBGDBFSop",
    name: "Wiz Khalifa"
  },
  {
    id: "5HZsYhRCMH3zR0yndRcLVw",
    name: "MOB CHOIR"
  },
  {
    id: "74XFHRwlV6OrjEM0A2NCMF",
    name: "Paramore"
  }
  ];

  // Show loading, then search results
  return (
    <div>
      <FilterView filterType="artist" title="Include/Exclude Artists" noTitle="Step 3 of 4" nextTitle="Next"></FilterView>
      <SearchView id="search" search={searchArtistACB}></SearchView>
      {promiseNoData(promiseState) || <ArtistResultView artistResults={filteredState} setExcludeInclude={setExcludeIncludeACB}></ArtistResultView>}
      {/*promiseNoData(promiseState) || <ArtistResultView artistResults={artist} setExcludeInclude={setExcludeIncludeACB}></ArtistResultView>*/}

    </div>
  );

  // Update state based on user input (artist selection)
  function setExcludeIncludeACB(id, type) {

    let artistList = artistListState;
    if (type === include) {
      props.model.includeArtist(id);
      artistList.find(element => { return element == artist }).checked = "include";  // TODO: element.artist == artist elllerrrr element == artist (?)

    } else if (type === neutral) {
      props.model.removeArtist(id);
      artistList.find(element => { return element == artist }).checked = "neutral";   // TODO: does it need to be a String?

    } else if (type === exclude) {
      props.model.excludeArtist(id);
      artistList.find(element => { return element == artist }).checked = "exclude";
    }

    setArtistListState(artistList);

    // Re-render the filtered list with updated states
    filterArtist(searchState);
  }
}

export default Artists;
