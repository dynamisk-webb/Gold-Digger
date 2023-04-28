import magnify from "./../img/magnify.png"
function SearchView(props){
    return (
        <div id="search">
            <img scr={magnify}></img>
                <input type="text" onKeyDown={changeInputACB}  placeholder="Search.." id="searchBar">
            </input>
        </div>
        );
    
        function changeInputACB(evt){

            let searchTerm = "";

            if(evt.key === "Enter"){
                searchTerm = document.getElementById("searchBar").value;
                props.search(searchTerm);
            }
        }
}

export default SearchView;