import React, { useState } from 'react'

const Movies = () => {

const[Movie, setMovies] = useState('')
const [searchResults, setSearchResults] = useState([]);

const handleMovie = (e) =>{
setMovies(e.target.value)
}

const handleSubmit = async() =>{
 
  try {
    const response = await fetch(
      `http://www.omdbapi.com/?s=${Movie}&apikey=1fd2cadd`
    );
    
    if (!response.ok) {
      throw new Error('Error fetching movie data');
    }

    const data = await response.json();
    setSearchResults(data.Search || []);
  } catch (error) {
    console.error('Fetch error:', error.message);
  }
};


return (
  <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#"></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"></a>
              </li>
              
            </ul>
            <form className="d-flex" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={Movie}
                onChange={handleMovie}
              />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="row">
        {searchResults.map((value) => (
          <div key={value.imdbID} className="col-md-4">
            <div className="card mb-4">
              <img src={value.Poster} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{value.Title}</h5>
                <p className="card-text">{value.Year}</p>
              
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies
