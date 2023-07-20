import logo from './logo.svg';
import './App.css';
import { supabase } from "../src/lib/api";
import { useEffect, useState } from 'react';


function App() {

  const [movies, setMovies] = useState(null)

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


  const loaded = () => {

    console.log(movies)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            {movies.map((dvd, key) => {
              return (
                <div key={key}>{dvd.numbers}</div>
              )
            })}
          </div>
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
