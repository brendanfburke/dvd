import logo from './logo.svg';
import './App.css';
import { supabase } from "../src/lib/api";
import { useEffect, useState } from 'react';
import { random } from 'lodash';


function App() {

  const [movies, setMovies] = useState(null)
  const [movieSelection, setMovieSelection] = useState("")

  const fetchNumbers = async () => {
    let { data: dvds, error } = await supabase
            .from("dvds")
            .select("*")
        if (error) console.log("error", error);
        else setMovies(dvds)
  }

  useEffect(() => {
    fetchNumbers()
  }, [])

  function randomMovie(num) {
    let choice = Math.floor(Math.random() * (num + 1))
    return choice
  }

  function getNewMovie() {
    let number = randomMovie(movies.length-1)
    setMovieSelection(movies[number].Title)
    console.log(number, movieSelection)


  }

  
  const loaded = () => {
    
    let ourMovie = randomMovie(movies.length)
    
    // console.log(movies)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div> 
            {movieSelection}
          </div>
          <button onClick={getNewMovie}>Get a Movie</button>
        </header>
      </div>
    );
  }

  const loading = () => {
    return (
      <div>Loading</div>
    )
  }

  return movies ? loaded() : loading()
}

export default App;
