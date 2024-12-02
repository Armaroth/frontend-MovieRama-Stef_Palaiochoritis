import {  Movie, Movies } from "./typings";
import { getContentSection } from "./utils";
//////////////////
/////////////////// make the search query appear on the url
export function createMovieList(movies: Movies) {
  let movieList = document.querySelector('.movie-list');
  if (!movieList) {
    movieList = document.createElement('search');
    movieList.classList.add('movie-list');
  }
  if (movies.length === 0) {
    movieList.innerHTML = `
    <h3>
    Cannot find the movie you are looking for
    </h3>
    `;
    return movieList;
  }
  movies.forEach(movie => {
    const movieCard = document.createElement('section');
    movieCard.className = 'movie-card';
    movieCard.setAttribute('data-movie-id', movie.id.toString());
    movieCard.innerHTML = createMovieCard(movie);
    movieList.appendChild(movieCard);
  });
  movieList.querySelectorAll('.movie-card').forEach(b => b.addEventListener('click', () => {
    // const id = movieCard?
    const id = b.getAttribute('data-movie-id');
    console.log(id)
  }));
  // handleExpandedMovie(b)
  return movieList;
}

function createMovieCard(movie: Movie): string {
  return `
  <section>
    <img class='thumbnail' data-movie-id="${movie.id}" src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title}"  />
    <section class="movie-data">
      <h2>${movie.title}</h2>
      <section class="movie-content">
        <section class="overview">
        <p >${movie.overview ?? 'No overview available'}</p>
        </section>
        <section class='metadata'>
        <section class="movie-date"> 
          <span class="attribute">Year:</span>
          <span class="value">${movie.releaseDate ? movie.releaseDate.split('-')[0] : 'N/A'}</span>
        </section>
        <section class='genres'>
          <span class="attribute">Genres:</span>
          <span class="value">${movie.genres.map(genre => genre?.name).join(', ')}</span>
        </section>
          <section>
          <span class="attribute">Vote average:</span>
          <span class="value">${movie.voteAverage ? movie.voteAverage.toFixed(1) : '-'}</span>
          </section>
        </section>
      </section>
      </section>
    </section>
    `;
}

export function renderLoadingScreen(on: boolean) {
  const contentSec = getContentSection();
  if (on) {
    const loadingscreen = `
        <section id="loading-screen">
    <h2>Loading...</h2>
        </section>
      `
    contentSec.innerHTML = contentSec.innerHTML + loadingscreen;
  }
  else {
    const loadingscreen = document.getElementById('loading-screen');
    loadingscreen?.parentElement?.removeChild(loadingscreen);
  }
}