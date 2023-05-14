/** 
 * aboutUsView renders a view containing information about the Gold Digger application and its authors.
 */

/* Import Images*/
import julia from "./../img/julia.png";
import jessica from "./../img/jessica.png";
import rej from "./../img/rej.png";
import maria from "./../img/maria.png";

function AboutUsView(props){

    // Variables
    const authors = [
        {
            image: jessica,
            name: "Jessica Gorwat",
            about: "Song: "
        },
        {
            image: julia,
            name: "Julia Wang",
            about: "Song: "
        },
        {
            image: maria,
            name: "Maria Moliteus",
            about: "Song: "
        },
        {
            image: rej,
            name: "Rej Karlander",
            about: "Song: Destroyed by hippie Powers - Car Seat Headrest"
        }
    ];

    // Functions

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    function closeAboutCB() {
        props.closeAbout();
    } 

    /* Display infor about each author*/ 
    function displayInfoCB(author){
        return (<div key={author.name} id="authorInfo">
            <img src={author.image} id="authorImg"></img>
            <h2 id="authorName">{author.name}</h2>
            <p id="authorAbout">{author.about}</p>
        </div>);
    }

    return (<div id="aboutUsContainer">
        <button id="closeField" onClick={closeAboutCB}></button>
        <div id="aboutUs">
            <h1 id="aboutTitle">About Gold Digger</h1>
            <h2>Refine your listening experience by filtering your <br></br>
                Spotify playlists by genre, artist and more! </h2>
            <p>
               Filter any public playlist, or why not use one from your own library? <br></br>
               You can even choose to filter your saved songs on the off chance that<br></br>
               you, like us, have far too many of them.
            </p>
            <h2 id="aboutAuthorTitle">The Authors</h2>
            {authors.map(displayInfoCB)}
        </div>
    </div>);
}

export default AboutUsView;