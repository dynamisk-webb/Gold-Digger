import FilterView from "../views/filterView.js";
import SearchView from "../views/searchView.js";
import ArtistResultView from "../views/artistResultView.js";

function Artists(props) {
    const artist = [{
          id: "4UXqAaa6dQYAk18Lv7PEgX",
          name: "Fall Out Boy"
        }, 
        {
          id: "0gxyHStUsqpMadRV0Di1Qt",
          name: "Rick Astley"
        },
        {
          id: "6goK4KMSdP4A8lw8jk4ADk",
          name: "Pokémon"
        },
        {
          id: "04gDigrS5kc9YWfZHwBETP",
          name: "Maroon 5"
        },
        {
          id: "137W8MRPWKqSmrBGDBFSop",
          name: "Wiz Khalifa"
        },
        {
          id: "5HZsYhRCMH3zR0yndRcLVw",
          name: "MOB CHOIR"
        },
        {
          id: "74XFHRwlV6OrjEM0A2NCMF",
          name: "Paramore"
        }
    ];

    return (
        <div>
            <FilterView filterType="artist" title="Include or Exclude Artists" nextTitle="Next"></FilterView>
            <SearchView></SearchView>
            <ArtistResultView artistResults={artist} setExcludeInclude={setExcludeIncludeACB}></ArtistResultView>
        </div>
    );

    function setExcludeIncludeACB(id, type) {
        if(type === 1) {
            props.model.includeArtist(id);
        } else if(type === 0) {
            props.model.removeArtist(id);
        } else if(type === -1) {
            props.model.excludeArtist(id);
        }
    }
}

export default Artists;
