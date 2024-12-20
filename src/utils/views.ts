import { ExpandedMovie, Movie, Movies, Review } from "./typings";
import { extractCurrentPage, getContentSection, handleExpandedMovie } from "./utils";

//creates the html content depending on if there are movies fetched
export function createMovieList(movies: Movies) {
  let movieList = document.querySelector('.movie-list');
  if (!movieList) {
    movieList = document.createElement('section');
    movieList.classList.add('movie-list');
  }
  if (movies.length === 0 && +extractCurrentPage() === 1) {
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
  movieList.querySelectorAll('.movie-card').forEach
    (b => b.addEventListener('click', () => handleExpandedMovie(b)));
  return movieList;
}

//shows the movie details of a movie-card
export function renderExpandMovie(movie: ExpandedMovie) {
  const movieCard = document.querySelector(`[data-movie-id="${movie.id}"]`);
  if (!movieCard) throw new Error('movie card does not exist');
  const el = document.createElement('section');
  el.classList.add('details');
  el.innerHTML = createExpandedMovie(movie);
  movieCard.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = '1';
  });
}

//return the movie card of a fetched movie
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

//returns the movie details section as a string to be added on the movie-card html
function createExpandedMovie(movie: ExpandedMovie): string {
  return `
  <iframe  src="${movie.trailer}"></iframe>
  <section class="reviews">
  <h2>Reviews</h2>
  ${movie.reviews.map(m => createReview(m)).reduce((a, c) => a + c, '') || '<span>No reviews found.</span>'}
  </section>
  <section class="similar-movies">
  <h2>Similar Movies</h2>
  <section>
  ${movie.similar.map(s => `<img width=200 alt=${s.title} src="https://image.tmdb.org/t/p/w500/${s.posterPath}" />`).reduce((a, c) => a + c, '')}
  </section>
  </section>
  `;
}
//returns the reviews section as a string to be added on the expanded movie section
function createReview(review: Review): string {
  return `
  <article class="review">
  <header>
  <strong>${review.author}:</strong>
  ${review.rating ? '<span>' + review.rating + '/10</span>' : ''}
  </header>
  <section>
  ${review.content}
  </section>
  </article>
  `;
}
// renders a header element saying 'loading' on the screen when fetching movies or loading a new page
export function renderLoadingScreen(on: boolean) {
  const contentSec = getContentSection();
  const loadingscreen = document.getElementById('loading-screen');
  if (on && !loadingscreen) {
    const loadingscreen = `
        <section id="loading-screen">
    <h2>Loading...</h2>
        </section>
      `
    contentSec.innerHTML = contentSec.innerHTML + loadingscreen;
  }
  else {
    loadingscreen?.parentElement?.removeChild(loadingscreen);
  }
}