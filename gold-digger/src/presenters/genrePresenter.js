/*
TODO

Props: Genres want/unwanted
Component state members: Search term
Lifecycle: GET /recommendations/available-genre-seeds (only available genres from the library/playlist)
Event: onClick go back to previous page
Event: Set search term in component state
GET /search type:genre
Event: onCheck set/unset genres
Event: onClick window.location to Parameters

*/

function Genres() {

    return (
        <div>
            <FilterView goBack={goBackACB} goForward={goForwardACB}></FilterView>
            <SearchView></SearchView>
            <GenreResultView></GenreResultView>
        </div>
    );

    function goForwardACB () {
        window.location = ""; // TODO: get url for this
    }
    
    function goBackACB () {
        window.location = ""; // TODO: get url for this
    }
}

export default Genres;
