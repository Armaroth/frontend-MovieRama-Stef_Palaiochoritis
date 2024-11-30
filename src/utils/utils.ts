import { TMDB_API_KEY, TMDB_BASE_URL } from "../api/constants";
import { ModalMovieSchema } from "../api/valibot";
import { Movies } from "./typings";
import { safeParse } from 'valibot'
import { createMovieList, showModal, createModal } from "./views";
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
  await addModalEvent(movies, movieListHtml);
}

export function resetHtml() {
  const contentSec = getContentSection();
  contentSec.replaceChildren();
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
export async function addModalEvent(movies: Movies, container: HTMLElement) {
  const buttons = container.querySelectorAll('button');
  const imgs = container.querySelectorAll('img');
  buttons.forEach(async (button, key) => {
    const modalInfo = await fetch(`${TMDB_BASE_URL}/movie/${movies[key].id}?api_key=${TMDB_API_KEY}&append_to_response=videos,reviews,similar`).
      then(data => data.json());
    const { output, success } = safeParse(ModalMovieSchema, modalInfo)
    if (!success) {
      if (button.parentElement) button.parentElement.innerHTML = '<h1 class="no-info">No additional info</h1>'
    } else {
      const modal = createModal(output)
      button.addEventListener('click', () => {
        showModal(modal);
      });
      imgs[key].addEventListener('click', () => {
        showModal(modal);
      })
    }
  });
}
