/**
 * GenreResultView renders a view displaying a list of genres with checkboxes to select/deselect them.
 */

import { Checkbox } from "@mui/material";
import { orange, grey } from '@mui/material/colors';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

function GenreResultView(props){

    // Functions

    /* Renders each genre in the genre list*/
    function getGenreACB(result){
        function selectDeselectGenreACB(event){
            if (event.target.checked){
                props.setSelectDeselect(result.genre, 1);
              } else {
                props.setSelectDeselect(result.genre, -1);
              }
        }

        return (
            <div id = "genreResult" key={result.genre}> 
                <Checkbox
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    checked={result.checked}
                    sx={{
                        color: grey[700],
                        '&.Mui-checked': {
                            color: orange[900],
                        },
                        '& .MuiSvgIcon-root': { fontSize: 32 }
                    }}
                    onChange={selectDeselectGenreACB}
                />
                <p id="genreText">{result.genre}</p>
                
            </div>
        ) 
    }

    return (<div className="scrollable" id="genreResults">
        {props.genreResults.map(getGenreACB)}
    </div>); 
}

export default GenreResultView;