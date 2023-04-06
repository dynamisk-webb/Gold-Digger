function FilterView(props){
    return(
        <div>
            <button onClick={returnACB}></button>
            <h1>{props.title}</h1>
            <button onClick={continueACB}>Next</button>
        </div>
    );

    function returnACB(){
        //TODO: return 
    }

    function continueACB(){
        //TODO: continue
    }
}

export default FilterView;