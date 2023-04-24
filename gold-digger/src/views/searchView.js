import magnify from "./../img/magnify.png"
function SearchView(props){
    return (
        <div id="search">
            <img scr={magnify}></img>
            <input type="text" onChange={changeInputACB}  placeholder="Search.." id="searchBar">
            </input>
        </div>
        );
    
        //TODO: decide how to do search and implement
    
        function changeInputACB(evt){
            props.updateInput(evt.target.value);
        }
    
        function searchClickACB(evt){
            props.search();
        }
}

export default SearchView;