import { Checkbox } from "@mui/material";

function GenreResultView(props){
    return (<div class="scrollable" id="genreResults">
        <p>test tetsttstestettt tetst testtetsw</p>
        {props.genreResults.map(getGenreACB)}
    </div>);

    function getGenreACB(result){
        function selectDeselectGenreACB(){
            // TODO: Evaluate if this work, getElementById could be an issue
            const checkBox = document.getElementById("genreCheck");
            if (checkBox.checked){
                props.setSelectDeselect(result, 1);
              } else {
                props.setSelectDeselect(result, -1);
              }
        }

        return (
            <div > 
                <p>{result}</p>
                
            </div>
        ) 
    }

    
}

export default GenreResultView;