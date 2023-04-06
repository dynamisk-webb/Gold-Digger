import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

function ArtistResultView(props){
    return (<div class="scrollable">
        {props.artistResults.map(getArtistACB)}
    </div>);

    function getArtistACB(result){
        // TODO: add buttons to include/exclude artists
        return (
            <div> 
                <p>result.title</p>
                <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}>
                <FormControlLabel value="include" control={<Radio />} label="include" />
                <FormControlLabel value="neutral" control={<Radio />} label="neutral" />
                <FormControlLabel value="exclude" control={<Radio />} label="exclude" />
                </RadioGroup>
            </div>
        );
    }

    function handleChange(evt){
        if(evt.target.value == "include")
            props.setExcludeInclude(1);
        if(evt.target.value == "neutral")
            props.setExcludeInclude(0);
        if(evt.target.value == "exclude")
            props.setExcludeInclude(-1);
    }

    // TODO: create functions for pushing buttons
}

export default ArtistResultView;