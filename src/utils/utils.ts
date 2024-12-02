import { TMDB_API_KEY, TMDB_BASE_URL } from "../api/constants";
import { ModalMovieSchema } from "../api/valibot";
import { Movies } from "./typings";
import { safeParse } from 'valibot'
import { createMovieList, showModal, createModal, closeModal, renderLoadingScreen } from "./views";
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
  await addModalEvent(movieListHtml);
  contentSection.appendChild(movieListHtml);
}

export function resetHtml() {
  const contentSec = getContentSection();
  contentSec.replaceChildren();
}
renderLoadingScreen
export async function addModalEvent(node: HTMLElement) {
  const oldModal = document.querySelector('.modal') as HTMLElement;
  if (oldModal) closeModal(oldModal);
  const buttons = node.querySelectorAll('.see-more');
  buttons.forEach(async (button) => {
    button.addEventListener('click', async () => {
      const movieId = button.getAttribute('data-movie-id');
      const modalInfo = await fetch(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,reviews,similar`).
        then(data => data.json());
      const { output, success } = safeParse(ModalMovieSchema, modalInfo)
      if (!success) {
        if (button.parentElement) button.parentElement.innerHTML = '<h1 class="no-info">No additional info</h1>'
      }
      else {
        const modal: HTMLElement = createModal(output)
        showModal(modal);
      }
    })

  });
}

