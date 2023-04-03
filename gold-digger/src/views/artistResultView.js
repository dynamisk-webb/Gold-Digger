function artistResultView(props){
    return (<div class="scrollable">
        {props.artistResults.map(getArtistInfoACB)}
    </div>);

    getArtistInfoACB(result){
        // TODO: add buttons to include/exclude artists
        return (
            <div> 
                <p>result.title</p>
            </div>
        ) 
    }
}