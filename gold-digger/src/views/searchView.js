/**
 * SearchView is a React component that renders a search bar view containing an input field. 
 */

import magnify from "./../img/magnify.png"
function SearchView(props){

    // Functions

    /* Evaluates if 'enter' is pressed in order to perform a search */
    function evalKeyACB(evt){

        let searchTerm = "";

        if(evt.key === "Enter"){
            searchTerm = document.getElementById("searchBar").value;
            props.search(searchTerm);
        }
    }

    return (
        <div id="search">
            <img scr={magnify}></img>
                <input type="text" onKeyDown={evalKeyACB}  placeholder="Search.." id="searchBar">
            </input>
        </div>
        );
}

export default SearchView;