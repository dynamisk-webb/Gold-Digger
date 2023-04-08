import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function ArtistResultView(props){
    return (<div class="scrollable">
        {props.artistResults.map(getArtistACB)}
    </div>);

    function getArtistACB(result){

        function handleChange(evt){
            if(evt.target.value == "include")
                props.setExcludeInclude(result.id, 1);
            if(evt.target.value == "neutral")
                props.setExcludeInclude(result.id, 0);
            if(evt.target.value == "exclude")
                props.setExcludeInclude(result.id, -1);
        }

        // TODO: add buttons to include/exclude artists
        return (
            <div> 
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">result.title</FormLabel>
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
        );
    }

    // TODO: create functions for pushing buttons
}

export default ArtistResultView;