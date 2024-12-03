import { fetchMovieDetails } from "../api/tmdb-api";
import { setIsFetching } from "../state";
import { Movies } from "./typings";
import { createMovieList, renderExpandMovie } from "./views";

//appends a page of movie-cards to the #content section
export function loadMoviesPage(movies: Movies) {
  const contentSection = getContentSection();
  const movieListHtml = createMovieList(movies);
  contentSection.appendChild(movieListHtml);
  setIsFetching(false);
}
//extracts the current page from the url search params
//if there is no page param, it defaults to 1
export function extractCurrentPage(): string {
  const url = URL.parse(window.location.href) as URL;
  return url.searchParams.get('page') || '1';
}
//extracts the search term from the url search params
export function extractSearchTerm(): string {
  const url = URL.parse(window.location.href) as URL;
  return url.searchParams.get('term') || '';

}
//resets url search params
export function resetParams() {
  const url = URL.parse(window.location.origin) as URL;
  url.searchParams.delete('page');
  url.searchParams.delete('term');
  window.history.pushState({}, '', url);
}
// handles the rendering of movie card details
export async function handleExpandedMovie(movieCard: Element) {
  //if any  other movie card is already clicked
  const movieId = movieCard.getAttribute('data-movie-id');
  const movieCards = document.querySelectorAll('.movie-card');
  movieCards.forEach(m => {
    const mId = m.getAttribute('data-movie-id');
    if (mId !== movieId) {
      m.classList.remove('expanded')
      m.querySelector('.details')?.remove();
    }
  }
  )
  //if selected card was expanded
  if (movieCard?.classList.contains('expanded')) {
    movieCard.querySelector('.details')?.remove();
    movieCard.classList.remove('expanded');
    //scrolls the clicked movie card back into view
    movieCard.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });

    return;
  };
  // if not
  movieCard?.classList.add('expanded');
  const id = movieCard?.getAttribute('data-movie-id');
  if (!id) throw new Error("see-more: movie id not found");
  const movieDetais = await fetchMovieDetails(id);
  if (movieDetais)
    renderExpandMovie(movieDetais);
  movieCard.querySelector('iframe')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
//renders the page heading section depending on the content given
export function renderHeading(content: string): void {
  const headerSection = document.getElementById('header');
  if (!headerSection) {
    throw new Error('App is not properly Rendered. Cannot find header Section')
  }
  headerSection.innerHTML = content;
}

// 'refreshes' the content section by emptying it and loading a new page
export function renderPage(movies: Movies) {
  resetHtml();
  loadMoviesPage(movies);
}
// fetches the content section
export function getContentSection(): HTMLElement {
  const contentSec = document.getElementById('content');
  if (!contentSec) throw new Error('The app is not mounted properly. Cannot find the #content section');
  return contentSec;
}
// empties the content section
export function resetHtml() {
  const contentSec = getContentSection();
  contentSec.replaceChildren();
}


