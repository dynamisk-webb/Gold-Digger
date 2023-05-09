import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import artistImg from "./../img/genericArtistIcon.png";

function ArtistResultView(props){
    return (<div className="scrollable" id="artistResults">
        {props.artistResults.map(getArtistACB)}
    </div>);

    function getArtistACB(result){

        function handleChange(evt){
            props.setExcludeInclude(result.id, evt.target.value);
        }

        // TODO: add buttons to include/exclude artists
        return (
            <div id="artistResult" key={result.name}>
                <img src={artistImg} id="artistImg"></img>
                <p>{result.name /*IDK IF THIS IS CORRECT*/}</p>
            <div> 
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{result.title}</FormLabel>
                    <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={props.value}
                    onChange={handleChange}>
                        <FormControlLabel value="include" control={<Radio />} label="include" />
                        <FormControlLabel value="neutral" control={<Radio />} label="neutral" />
                        <FormControlLabel value="exclude" control={<Radio />} label="exclude" />
                    </RadioGroup>
                </FormControl>
            </div>
            </div>
        );
    }

    // TODO: create functions for pushing buttons
}

export default ArtistResultView;