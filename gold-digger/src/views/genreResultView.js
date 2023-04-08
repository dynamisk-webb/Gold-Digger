import { Checkbox } from "@mui/material";

function GenreResultView(props){
    return (<div class="scrollable">
        {props.genreResults.map(getGenreACB)}
    </div>);

    function getGenreACB(result){
        function selectDeselectGenreACB(){
            // TODO: Evaluate if this work, getElementById could be an issue
            const checkBox = document.getElementById("genreCheck");
            if (checkBox.checked){
                props.setSelectDeselect(result.genre, 1);
              } else {
                props.setSelectDeselect(result.genre, -1);
              }
        }

        return (
            <div> 
                <p>result.title</p>
                <Checkbox id="genreCheck" onclick={selectDeselectGenreACB}></Checkbox>
            </div>
        ) 
    }

    
}

export default GenreResultView;