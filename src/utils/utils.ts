import { fetchMovieDetails } from "../api/tmdb-api";
import { setIsFetching } from "../state";
import { navigateTo } from "../urlRouter";
import { Movies } from "./typings";
import { createMovieList, renderExpandMovie } from "./views";

export function loadMoviesPage(movies: Movies) {

  const contentSection = getContentSection();
  const movieListHtml = createMovieList(movies);
  contentSection.appendChild(movieListHtml);
  setIsFetching(false);
}
export function extractCurrentPage(): string {
  const url = URL.parse(window.location.href) as URL;
  return url.searchParams.get('page') || '1';
}
export function extractSearchTerm(): string {
  const url = URL.parse(window.location.href) as URL;
  return url.searchParams.get('term') || '';

}
export function resetPageParam() {
  const url = URL.parse(window.location.origin) as URL;
  url.searchParams.delete('page');
  url.searchParams.delete('term');
  window.history.pushState({}, '', url);
}
export function patchSearchInput() {
  const searchInput = document.querySelector('input') as HTMLInputElement
  if (!searchInput.value) {
    const url = URL.parse(window.location.href) as URL;
    navigateTo(url);
  }
}
export async function handleExpandedMovie(movieCard: Element) {
  if (movieCard?.classList.contains('expanded')) {
    movieCard.querySelector('.details')?.remove();
    movieCard.classList.remove('expanded');
    movieCard.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    window.scrollBy({
      top: movieCard.getBoundingClientRect().y - 200,
      behavior: 'smooth'
    });
    return;
  };
  movieCard?.classList.add('expanded');
  const id = movieCard?.getAttribute('data-movie-id');
  if (!id) throw new Error("see-more: movie id not found");
  const movieDetais = await fetchMovieDetails(id);
  if (movieDetais)
    renderExpandMovie(movieDetais);
  movieCard.querySelector('iframe')?.scrollIntoView({ behavior: 'smooth' });
}



export function renderHeading(content: string): void {
  const headerSection = document.getElementById('header');
  if (!headerSection) {
    throw new Error('App is not properly Rendered. Cannot find header Section')
  }
  headerSection.innerHTML = content;
}
export function renderPage(movies: Movies) {
  resetHtml();
  loadMoviesPage(movies);
}

export function getContentSection(): HTMLElement {
  const contentSec = document.getElementById('content');
  if (!contentSec) throw new Error('The app is not mounted properly. Cannot find the #content section');
  return contentSec;
}
export function resetHtml() {
  const contentSec = getContentSection();
  contentSec.replaceChildren();
}


