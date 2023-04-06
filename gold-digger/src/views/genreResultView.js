function GenreResultView(props){
    return (<div class="scrollable">
        {props.genreResults.map(getGenreACB)}
    </div>);

    function getGenreACB(result){
        // TODO: add buttons to include genre
        return (
            <div> 
                <p>result.title</p>
            </div>
        ) 
    }
}

export default GenreResultView;