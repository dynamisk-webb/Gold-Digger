
/** 
 * artistResultView renders a view containing a list of artists with options to include or exclude them 
 */

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Tooltip from '@mui/material/Tooltip';

import InfiniteScroll from 'react-infinite-scroller';

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

  // Styles
  const TooltipStyle = {
    color: "white",
    marginTop: 0,
    marginBottom: 0,
    top: 0
  };


  // Functions

  /* Load more artist to render */
  const loadMore = () => {
    if (props.record === props.artistResults.length || props.record >= props.artistResults.length) {
      props.setHasMore(false);
    } else {
      setTimeout(() => {
        props.setRecord(props.record + props.itemsPerPage);
      }, 2000);
    }
  };

  /* Retrive the artists to be rendered */
  function getArtists(){
    let artists = [];
    
    for (let i = 0; i < props.record; i++) {
      if(props.artistResults[i]){
      artists.push(getArtistCB(props.artistResults[i]));
      }
    }
    return artists;
  }

  /* Render all information about each artist */
  function getArtistCB(result) {

    /* Retrive and render the image of the artist */
    function renderImg() {
      if (result.images) {
        if (result.images[2]) {
          return <img src={result.images[2].url} id="artistImg"></img>
        } else return <img src={artistImg} id="artistImg"></img>
      } else return <img src={artistImg} id="artistImg"></img>
    }

    /* Update Exclude/Include of an artist */
    function handleChange(evt) {
      props.setExcludeInclude(result.id, evt.target.value);
    }

    return (
      <div id="artistResult" key={result.name}>
        {renderImg()}
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
                  icon={<SentimentVerySatisfiedIcon className="smileyIcon" />}
                  checkedIcon={<SentimentVerySatisfiedTwoToneIcon className="smileyIcon" />}
                  sx={{
                    color: grey[800],
                    '&.Mui-checked': {
                      color: orange[900],
                    },
                  }} />} />
              </Tooltip>
              <Tooltip title={<p style={TooltipStyle}>No preference</p>}>
                <FormControlLabel value="neutral" control={<Radio
                  className="radioButton"
                  icon={<SentimentSatisfiedIcon className="smileyIcon" />}
                  checkedIcon={<SentimentSatisfiedTwoToneIcon className="smileyIcon" />}
                  sx={{
                    color: grey[800],
                    '&.Mui-checked': {
                      color: orange[900],
                    },
                  }} />} />
              </Tooltip>
              <Tooltip title={<p style={TooltipStyle}>Exclude artist</p>}>
                <FormControlLabel value="exclude" control={<Radio
                  className="radioButton"
                  icon={<SentimentVeryDissatisfiedIcon className="smileyIcon" />}
                  checkedIcon={<SentimentVeryDissatisfiedTwoToneIcon className="smileyIcon" />}
                  sx={{
                    color: grey[800],
                    '&.Mui-checked': {
                      color: orange[900],
                    },
                  }} />} />
              </Tooltip>

            </RadioGroup>
          </FormControl>
        </div>
      </div>
    );
  }

  return (<div className="scrollable" id="artistResults">
    <InfiniteScroll
      pageStart={0}
      loadMore={loadMore}
      hasMore={props.hasMore}
      loader={<h2 className="loadingArtist" key={0}>Loading ...</h2>}
      useWindow={false}
    >
      {getArtists()}
    </InfiniteScroll>
  </div>);
}

export default ArtistResultView;