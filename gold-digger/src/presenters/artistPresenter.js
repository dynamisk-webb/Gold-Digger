
/*

Props: Artists wanted/unwanted
Component state members: Search term
Lifecycle: GET /me/top/artists or get all artists in playlist (place in included artists)

Event: onClick go back to previous page
Event: onInput set search term in component state
GET /search type:artist
Event: onCheck set/unset artist wanted
if in artist unwanted
Disabled
Event: onCheck set/unset artist unwanted
if in artists wanted
Disabled
Event: onClick window.location to Genres


*/

function Artists() {

    return (
        <div>
            <FilterView goBack={goBackACB} goForward={goForwardACB}></FilterView>
            <SearchView></SearchView>
            <ParameterView></ParameterView>
        </div>
    );

    /* Event: onClick go to next page */
    function goForwardACB () {
        return redirect("/");  // TODO: get url for this
    }
    
    /* Event: onClick go back to previous page */
    function goBackACB () {
        // return redirect("/login");
        return redirect("/"); // TODO: get url for this
    }
}

export default Artists;
