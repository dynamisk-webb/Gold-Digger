function FilterView(props){
    return(
        <div>
            <button onClick={returnACB}></button>
            <h1>{props.title}</h1>
            <button onClick={continueACB}>Next</button>
        </div>
    );

    function returnACB(){
        props.goBack(); 
    }

    function continueACB(){
        props.goForward();
    }
}

export default FilterView;