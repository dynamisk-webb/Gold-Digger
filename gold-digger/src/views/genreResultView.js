import { Checkbox } from "@mui/material";
import { orange } from '@mui/material/colors';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

function GenreResultView(props){

    return (<div className="scrollable" id="genreResults">
        {props.genreResults.map(getGenreACB)}
    </div>);

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
                        color: 'white',
                        '&.Mui-checked': {
                            color: orange[800],
                        },
                        '& .MuiSvgIcon-root': { fontSize: 32 }
                    }}
                    onChange={selectDeselectGenreACB}
                />
                <p id="genreText">{result.genre}</p>
                
            </div>
        ) 
    }

    
}

export default GenreResultView;