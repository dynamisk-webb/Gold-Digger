import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import ArtistResultView from "../views/artistResultView.js";
import promiseNoData from "../views/promiseNoData.js";
import resolvePromise from "../resolvePromise.js";
import { getAllArtistsPlaylist, getAllArtistsSaved} from "../spotifySource.js";
import { useEffect, useState } from "react";

function Artists(props) {

  useEffect(addObserverOnCreatedACB, [])
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
      if (playlist === "") {
        resolvePromise(getAllArtistsSaved(), promiseState, setState);
      }else {
        resolvePromise(getAllArtistsPlaylist(playlist), promiseState, setState);
      }
    }
    getArtistsACB();
    notifyACB();

  }, []);

  useEffect(() => {

    /* retrieve from model and mark artists as Exclude or Include values*/
    function getIncludeOrExcludeACB(artist) {
      
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
    if(searchData != ""){
      // filter based on the search term
      filterArtist(searchData);
    }else{
      console.log("quick");
      setFilteredState(artistListState);
    }
    notifyACB();
    
    // save the search term
    setSearchState(searchData);
  }

  // Filter
  function filterArtist (searchTerm) {
    setFilteredState(artistListState.filter(element => element.name.toLowerCase().includes(searchTerm.toLowerCase()))); // TODO: eller element.artist.includes (searchTerm) ?
  }

  // Show loading, then search results
  return (
    <div>
      <FilterView filterType="artist" title= "Select Artists" noTitle="Step 3 of 4" nextTitle="Next"></FilterView>
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
