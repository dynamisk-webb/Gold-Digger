function ArtistResultView(props){
    return (<div class="scrollable">
        {props.artistResults.map(getArtistACB)}
    </div>);

    function getArtistACB(result){
        // TODO: add buttons to include/exclude artists
        return (
            <div> 
                <p>result.title</p>
                <button> Add </button>
                <button> Remove </button>
            </div>
        ) 
    }

    // TODO: create functions for pushing buttons
}

export default ArtistResultView;