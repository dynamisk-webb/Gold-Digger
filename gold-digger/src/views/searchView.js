function SearchView(props){
    return (
        <div id="search">
            <input onChange={changeInputACB}>
            </input>
            <button onClick={searchClickACB}>
                Search
            </button>
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