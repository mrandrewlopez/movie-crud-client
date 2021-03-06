window.addEventListener('load', () => {


  const baseURL = 'http://localhost:3015/movies';

  const createMovie = () => {
    event.preventDefault();
    console.log('createMovie');
    const title = document.querySelector('#title').value;
    const director = document.querySelector('#director').value;
    const year = document.querySelector('#year').value;
    const rating = document.querySelector('#rating').value;
    const poster_url = document.querySelector('#poster_url').value;
    axios.post(baseURL, {title, director, year, rating, poster_url})
      .then( result => {
        showMovie( result.data );
      })
      .catch( error => { console.error( error ); });
  }

  const newMovie = () => {
    document.querySelector('#app').innerHTML = `
      <form>
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" id="title" class="form-control" />
        </div>
        <div class="form-group">
          <label for="director">Director</label>
          <input type="text" id="director" class="form-control" />
        </div>
        <div class="form-group">
          <label for="year">Year</label>
          <input type="text" id="year" class="form-control" />
        </div>
        <div class="form-group">
          <label for="rating">Rating</label>
          <input type="text" id="rating" class="form-control" />
        </div>
        <div class="form-group">
          <label for="poster_url">Poster URL</label>
          <input type="text" id="poster_url" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary" id="create-movie">Create</button>
      </form>
    `;
    document.querySelector('#create-movie').addEventListener('click', createMovie);
  }

  const showMovie = movie => {
    console.log('Show page for movie:');
    console.log(movie);
    document.querySelector('#app').innerHTML = `
      <div class="h3">${movie.title}</div>
      <img src="${movie.poster_url}" width="40%" />
      <table class="table table-striped">
        <tbody>
          <tr>
            <th scope="row">Director</th>
            <td>${movie.director}</td>
          </tr>
          <tr>
            <th scope="row">Year</th>
            <td>${movie.year}</td>
          </tr>
          <tr>
            <th scope="row">Rating</th>
            <td>${movie.rating}</td>
          </tr>
        </tbody>
      </table>
    `;
  }

  const updateMovie = id =>{
    event.preventDefault();
    console.log('createMovie');
    const title = document.querySelector('#edit-title').value;
    const director = document.querySelector('#edit-director').value;
    const year = document.querySelector('#edit-year').value;
    const rating = document.querySelector('#edit-rating').value;
    const poster_url = document.querySelector('#edit-poster_url').value;
    axios.put(`${baseURL}/${id}`, {title, director, year, rating, poster_url})
      .then( result => {
        showMovie( result.data );
      })
      .catch( error => { console.error( error ); });
  }

  const editMovie = movie => {
    document.querySelector('#app').innerHTML = `
      <form>
        <div class="form-group">
          <label for="ediit-title">Title</label>
          <input type="text" id="edit-title" class="form-control" />
        </div>
        <div class="form-group">
          <label for="edit-director">Director</label>
          <input type="text" id="edit-director" class="form-control" />
        </div>
        <div class="form-group">
          <label for="edit-year">Year</label>
          <input type="text" id="edit-year" class="form-control" />
        </div>
        <div class="form-group">
          <label for="edit-rating">Rating</label>
          <input type="text" id="edit-rating" class="form-control" />
        </div>
        <div class="form-group">
          <label for="edit-poster_url">Poster URL</label>
          <input type="text" id="edit-poster_url" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary" id="update-movie">Update</button>
      </form>
    `;
    document.querySelector('#edit-title').value = movie.title;
    document.querySelector('#edit-director').value = movie.director;
    document.querySelector('#edit-year').value = movie.year;
    document.querySelector('#edit-rating').value = movie.rating;
    document.querySelector('#edit-poster_url').value = movie.poster_url;
    document.querySelector('#update-movie').addEventListener('click', ()=>{
      updateMovie(movie.id); });
  }

  const deleteMovie = id => {
    console.log('Deleting movie no.', id);
    axios.delete(`${baseURL}/${id}`)
    .then(result => {allMovies(); })
    .catch(error => {console.error(error); });
  }

  const allMovies = () => {
    document.querySelector('#app').innerHTML = `
      <div>
        <button type="button" class="btn btn-success" id="new-movie">Add a movie</button>
      </div>
      <table class="table table-striped table-dark">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Director</th>
            <th scope="col">Year</th>
            <th scope="col">Rating</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody id="movie-tbody"></tbody>
      </table>
    `;
    document.querySelector('#new-movie').addEventListener('click', newMovie);
    axios.get( baseURL )
      .then( movies => {
        movies.data.forEach( movie => {
          const trEl = document.createElement('tr');
          trEl.innerHTML = `
            <td>${movie.title}</td>
            <td id="show-${movie.id}">${movie.title}</td>
            <td>${movie.director}</td>
            <td>${movie.year}</td>
            <td>${movie.rating}</td>
            <td><button type="button" class="btn btn-info btn-sm" id="edit-${movie.id}">Edit</button>&nbsp;<button type="button" class="btn btn-danger btn-sm" id="delete-${movie.id}">Delete</button></td>
          `;
          document.querySelector('#movie-tbody').appendChild(trEl);
          document.querySelector(`#show-${movie.id}`).addEventListener('click', () => { showMovie(movie); });
          document.querySelector(`#edit-${movie.id}`).addEventListener('click', () => { editMovie(movie); });
          document.querySelector(`#delete-${movie.id}`).addEventListener('click', () => { deleteMovie(movie.id); });
        });
      })
      .catch( error => { console.error( error ); });
  }

  document.querySelector('#app-start').addEventListener('click', allMovies);
  allMovies();
});

// this is a finished product
