import { Movies } from "./typings";

export function getContentSection(): HTMLElement {
  const contentSec = document.getElementById('content');
  if (!contentSec) throw new Error('The app is not mounted properly. Cannot find the #content section');
  return contentSec;
}
export function renderHeading(content: string): void {
  const headerSection = document.getElementById('header');
  if (!headerSection) {
    throw new Error('App is not properly Rendered. Cannot find header Section')
  }
  headerSection.innerHTML = content;
}
export async function renderPage(movies: Movies) {
  resetHtml();
  await loadMoviesPage(movies);
}
export async function loadMoviesPage(movies: Movies) {
  const contentSection = getContentSection();
  const movieListHtml = createMovieList(movies);
  contentSection.appendChild(movieListHtml);
}

export function resetHtml() {
  const contentSec = getContentSection();
  contentSec.replaceChildren();
}
export function createMovieList(movies: Movies): HTMLElement {
  const fragment = document.createDocumentFragment();
  const movieListHtml = document.createElement('section');
  movieListHtml.className = 'movie-list';
  if (movies.length === 0) {
    movieListHtml.innerHTML = `
    <h3>
    Cannot find the movie you are looking for
    </h3>
    `
  }
  movies.forEach(movie => {
    const movieCard = document.createElement('section');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
    <section class="image-container">
    <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title}" />
    </section>
    <section class="movie-data">
    <h3>${movie.title}</h3>
    <p class="overview">${movie.overview ? movie.overview : 'No overview available'}</p>
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