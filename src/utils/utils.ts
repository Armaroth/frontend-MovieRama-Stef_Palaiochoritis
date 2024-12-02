import { fetchMovieDetails } from "../api/tmdb-api";
import { Movies } from "./typings";
import { createMovieList, renderExpandMovie } from "./views";
export function getContentSection(): HTMLElement {
  const contentSec = document.getElementById('content');
  if (!contentSec) throw new Error('The app is not mounted properly. Cannot find the #content section');
  return contentSec;
}

export async function handleExpandedMovie(movieCard: Element) {
  if (movieCard?.classList.contains('expanded')) {
    movieCard.classList.remove('expanded');
    movieCard.querySelector('.details')?.remove();
    return;
  };
  movieCard?.classList.add('expanded');
  const id = movieCard?.getAttribute('data-movie-id');
  if (!id) throw new Error("see-more: movie id not found");
  const movieDetais = await fetchMovieDetails(id);
  if (movieDetais)
    renderExpandMovie(movieDetais);
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
  // await addModalEvent(movieListHtml);
  contentSection.appendChild(movieListHtml);
}

export function resetHtml() {
  const contentSec = getContentSection();
  contentSec.replaceChildren();
}


