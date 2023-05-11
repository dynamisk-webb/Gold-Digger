import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import ArtistResultView from "../views/artistResultView.js";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise.js";
import { getArtistsPlaylist } from "../spotifySource.js";
import { useEffect, useState } from "react";

function Artists(props) {

  // State for list of artists
  const [promiseState, setState] = useState({});
  const [filteredState, setFilteredState] = useState([])
  const [artistListState, setArtistListState] = useState([]);
  const [searchState, setSearchState] = useState("");

  useEffect(() => {
    // TODO: get all artists from *saved tracks* or a *chosen playlist*
    // Right now: gets them all from Spotify(?) from a playlist. Unclear if this API call works. 
    async function getArtistsACB() {
      let playlist = props.model.source; // TODO: is this the right way to get the playlist in here? 
      // Check if a saved playlist exists before getting the artists from it
      if (playlist) {
        resolvePromise(getArtistsPlaylist(playlist), promiseState, setState);
      }
    }
    getArtistsACB();

  }, []);

  useEffect(() => {

    // TODO: vi ska bara kolla på *intressanta* artister, dvs include och exclude.
    // TODO: filtrera först igenom listan IncludedArtists (kolla DiggerModel) och markera alla med value:"include"
    // TODO: gör sedan det igenom listan ExcludedArtists (kolla DiggerModel) och markera alla med value:"exclude"

    /* retrieve from model and mark artists as Exclude or Include values*/
    function getIncludeOrExcludeACB(artist) {
      // default
      //let artistObject = {artist: x, value: "neutral"};
      
      // filter on included artists
      if(props.model.includedArtists.find(element => element == artist.id))
        artist.value = "include";

      // filter on excluded artists
      if(props.model.excludedArtists.find(element => element == artist.id))
        artist.value = "exclude";
    }


    if (promiseState.data != null) {      
      // Transfer results from promiseState into artistList
      // Make use the values are unique
      let artistList = promiseState.data.map(obj => ({ ...obj, value: 'neutral' }));
      
      artistList.forEach(getIncludeOrExcludeACB)

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

  // Filter
  function filterArtist (searchTerm) {
    setFilteredState(artistListState.filter(element => element.name.toLowerCase().includes(searchTerm.toLowerCase()))); // TODO: eller element.artist.includes (searchTerm) ?
  }


  // For testing
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
    </div>
  );

  /* Update state based on user input (artist selection)
  */
  function setExcludeIncludeACB(id, type) {

    let artistList = artistListState;
    if (type === "include") {
      props.model.includeArtist(id);
      artistList.find(element => element.id == id ).value = "include";  // TODO: element.artist == artist elllerrrr element == artist (?)

    } else if (type === "neutral") {
      props.model.removeArtist(id);
      artistList.find(element => element.id == id ).value = "neutral";  

    } else if (type === "exclude") {
      props.model.excludeArtist(id);
      artistList.find(element => element.id == id).value = "exclude";
    }

    setArtistListState(artistList);

    // Re-render the filtered list with updated states
    filterArtist(searchState);
  }
}

export default Artists;
