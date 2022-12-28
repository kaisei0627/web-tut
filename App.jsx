import { useEffect, useState } from "react";
import { fetchImages } from "./api";

function Header() {
    return (
      <header className="hero is-dark is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Super Smash Bros Character</h1>
            <h1>5421038 大美浪海晟</h1>
            <h1>日本大学文理学部情報科学科webプログラミング課題</h1>
          </div>
        </div>
      </header>
    );
  }
  
  function Image(props){
    return (
      <div className="card">
        <div className="card-image">
          <figure className="image">
          <img src={props.src} alt="Amiibo!" />
          </figure>
        </div>
      </div>
    );
  }
  
  function Loading(){
    return <p>Loading...</p>
  }

  function Gallery(props) {
    const { urls } = props;
    if(urls == null){
        return <Loading />
    }
    return (
      <div className="columns is-vcentered is-multiline">
      {urls.map((url) => {
        return (
          <div key={url.image} className="column is-3">
            <Image src={url.image} />
          </div>
        );
      })}
      </div>
    );
  }
  
  function Form(props) {
    function handleSubmit(event) {
      event.preventDefault();
      const { character } = event.target.elements;
      props.onFormSubmit(character.value);
    }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="character" defaultValue="Link">
                  <option value="Link">Link</option>
                  <option value="Donkey Kong">Donkey Kong</option>
                  <option value="Samus">Samus</option>
                  <option value="Bowser">Bowser</option>
                  <option value="Villager">Villager</option>
                  <option value="Rosalina & Luna">Rosalina & Luna</option>
                  <option value="King DeDeDe">King DeDeDe</option>
                  <option value="Charizard">Charizard</option>
                  <option value="Ivysaur">Ivysaur</option>
                  <option value="Squirtle">Squirtle</option>
                  <option value="Greninja">Greninja</option>
                  <option value="JigglyPuff">JigglyPuff</option>
                  <option value="Robin">Robin</option>
                  <option value="Lucina">Lucina</option>
                  <option value="Corrin">Corrin</option>
                  <option value="Dark Pit">Dark Pit</option>
                  <option value="Pit">Pit</option>
                  <option value="Mario">Mario</option>
                  <option value="Luigi">Luigi</option>
                  <option value="Peach">Peach</option>
                  <option value="Mega Man">Mega Man</option>
                  <option value="Yoshi">Yoshi</option>
                  <option value="Kirby">Kirby</option>
                  <option value="Fox">Fox</option>
                  <option value="Pikachu">Pikachu</option>
                  <option value="Ness">Ness</option>
                  <option value="Captain Falcon">Captain Falcon</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Reload
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
  

  function Main() {
    const [urls, setUrls] = useState(null);
    useEffect(() => {
        fetchImages("Link").then((urls) => {
            setUrls(urls);
        });
    },[]);
    function reloadImages(character) {
      fetchImages(character).then((urls) => {
        setUrls(urls);
      });
    }
    return (
      <main>
        <section className="section">
          <div className="container">
            <Form onFormSubmit={reloadImages} />
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Gallery urls={urls}/>
          </div>
        </section>
      </main>
    );
  }
  
  function Footer() {
    return (
      <footer className="footer">
        <div className="content has-text-centered">
          <p>Amiibo images are retrieved from Amiibo API</p>
          <p>
            <a href="https://amiiboapi.com">Donate to Amiibo API</a>
          </p>
        </div>
      </footer>
    );
  }
  
  function App() {
    return (
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
  
  export default App;