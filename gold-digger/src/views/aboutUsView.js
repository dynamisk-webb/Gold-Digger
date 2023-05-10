import julia from "./../img/julia.png";
import jessica from "./../img/jessica.png";
import rej from "./../img/rej.png";
import maria from "./../img/maria.png";

function AboutUsView(props){

    const authors = [
        {
            image: jessica,
            name: "Jessica Gorwat",
            about: "As royal as a queen, as buzzed as a bee"
        },
        {
            image: julia,
            name: "Julia Wang",
            about: "As fast as a hare, as brave as a bear"
        },
        {
            image: maria,
            name: "Maria Moliteus",
            about: "As free as a bird, as neat as a word"
        },
        {
            image: rej,
            name: "Rej Karlander",
            about: "As warm as the sun, as silly as fun"
        }
    ];

    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    function closeAboutCB() {
        props.closeAbout();
    } 

    return (<div id="aboutUsContainer">
        <button id="closeField" onClick={closeAboutCB}></button>
        <div id="aboutUs">
            <h1 id="aboutTitle">About the authors</h1>
            {authors.map(displayInfoCB)}
        </div>
    </div>);

    function displayInfoCB(author){
        return (<div key={author.name} id="authorInfo">
            <img src={author.image} id="authorImg"></img>
            <h2 id="authorName">{author.name}</h2>
            <p id="authorAbout">{author.about}</p>
        </div>);
    }
}

export default AboutUsView;