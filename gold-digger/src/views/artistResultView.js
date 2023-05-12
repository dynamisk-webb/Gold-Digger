import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';

import artistImg from "./../img/genericArtistIcon.png";
import { orange, grey } from '@mui/material/colors';

// Icon Import
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';
import SentimentSatisfiedTwoToneIcon from '@mui/icons-material/SentimentSatisfiedTwoTone';
import SentimentVeryDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentVeryDissatisfiedTwoTone';

function ArtistResultView(props){
    const TooltipStyle = {
        color: "white",
        marginTop: 0,
        marginBottom: 0,
        top: 0
      };

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
                <img src={result.images[0].url} id="artistImg"></img>
                <p id="artistName">{result.name}</p>
                <div id="includeExcludeButtons"> 
                    <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">{result.title}</FormLabel>
                        <RadioGroup
                        row
                        name="controlled-radio-buttons-group"
                        value={result.value}
                        onChange={handleChange}
                        >
                             <Tooltip title={<p style={TooltipStyle}>Include artist if possible</p>}>
                            <FormControlLabel value="include" control={<Radio 
                                className="radioButton"
                                icon={<SentimentVerySatisfiedIcon className="smileyIcon"/>}
                                checkedIcon={<SentimentVerySatisfiedTwoToneIcon className="smileyIcon"/>}
                                sx={{
                                color: grey[800],
                                '&.Mui-checked': {
                                color: orange[900],
                                },
                          }}/>} />
                            </Tooltip>
                            <Tooltip title={<p style={TooltipStyle}>No preference</p>}>
                            <FormControlLabel value="neutral" control={<Radio 
                            className="radioButton"
                            icon={<SentimentSatisfiedIcon className="smileyIcon"/>}
                            checkedIcon={<SentimentSatisfiedTwoToneIcon className="smileyIcon"/>}
                            sx={{   
                            color: grey[800],
                            '&.Mui-checked': {
                              color: orange[900],
                            },
                          }}/>} />
                          </Tooltip>
                          <Tooltip title={<p style={TooltipStyle}>Exclude artist</p>}>
                            <FormControlLabel value="exclude" control={<Radio 
                            className="radioButton"
                            icon={<SentimentVeryDissatisfiedIcon className="smileyIcon"/>}
                            checkedIcon={<SentimentVeryDissatisfiedTwoToneIcon className="smileyIcon"/>}
                            sx={{
                            color: grey[800],
                            '&.Mui-checked': {
                              color: orange[900],
                            },
                          }}/>} />
                          </Tooltip>
                        
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        );
    }

    // TODO: create functions for pushing buttons
}

export default ArtistResultView;