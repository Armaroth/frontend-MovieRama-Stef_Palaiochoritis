import { fetchMovies } from "../api/tmdb-api";
import { Movies } from "../api/valibot";
import { getContentSection, renderLoadingScreen } from "./utils";

export async function renderInTheatersPage() {
  const contentSec = getContentSection();
  renderLoadingScreen(true);
  const movies = await fetchMovies();
  const movieListHtml = createHtml(movies);
  renderLoadingScreen(false);
  contentSec.appendChild(movieListHtml)

}

function createHtml(movies: Movies): HTMLElement {
  const fragment = document.createDocumentFragment();
  const movieListHtml = document.createElement('section');
  movieListHtml.className = 'movie-list';
  movies.forEach(movie => {
    const movieCard = document.createElement('section');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <section class="image-container">
        <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title}" />
      </section>
      <section class="movie-data">
        <h3>${movie.title}</h3>
        <p class="overview">${movie.overview}</p>
        <section class="movie-date"> 
          <span class="attribute">Year:</span>
          <span class="value">${movie.releaseDate.split('-')[0]}</span>
        </section>
        <section>
          <span class="attribute">Genres:</span>
          <span class="value">${movie.genres.map(genre => genre?.name).join(', ')}</span>
        </section>
        <section>
          <span class="attribute">Vote average:</span>
          <span class="value">${movie.voteAverage.toFixed(1)}</span>
        </section>
      </section>
    `;
    fragment.appendChild(movieCard);
  });
  movieListHtml.appendChild(fragment);
  return movieListHtml;
}
