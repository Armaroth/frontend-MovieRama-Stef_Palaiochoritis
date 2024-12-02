import { addModalEvent } from "../events";
import { ModalMovie, Movie, Movies } from "./typings";
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
export function createModal(movie: ModalMovie): HTMLElement {
  const modal = document.createElement('section');
  modal.classList.add('modal');
  modal.innerHTML = `
  <setion class="modal-overlay">
   <section class="modal-content">
    <button class="modal-close">&times;</button>
    <section class="movie-data">
     <h3>${movie.title}</h3>
     <header>
      <section class="overview">
       <p >${movie.overview ? movie.overview : 'No overview available'}</p>
      </section>
      <section class='metadata'>
       <section class="movie-date">
        <span class="attribute">Year:</span>
        <span class="value">${movie.releaseDate?.split('-')[0]}</span>
       </section>
       <section class='genres'>
        <span class="attribute">Genres:</span>
        <span class="value">${movie.genres.map(genre => genre?.name).join(', ')}</span>
       </section>
       <section>
        <span class="attribute">Vote average:</span>
        <span class="value">${movie.voteAverage.toFixed(1)}</span>
      </section>
    </section>
   </header>

          <h3>Trailer:</h3>
          <section class="trailer-container">
            ${movie.videos?.length
      ? `<iframe 
                  class="trailer-player"
                   src="https://www.youtube-nocookie.com/embed/${movie.videos[0].key}" 
                  frameborder="0" 
                  allowfullscreen>
                </iframe>`
      : '<p>No trailer available.</p>'
    }
          </section>
          <h3>Similar Movies:</h3>
          <ul class="similar-movies">
            ${movie.similarMovies
      .map(
        (movie) =>
          `<li class="movie-item">
            <span class="similar-movie-title">${movie.title}</span>
            <img class="similar-movie-img see-more"  src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" data-movie-id="${movie.id}" alt="Image unavailable"/>
           </li>`
      )
      .join('') || '<li>No similar movies available.</li>'}
          </ul>
          <h3>Reviews:</h3>
          <ul class="reviews">
            ${movie.reviews?.map(
        (review) =>
          `<li><strong class="author">${review.author}:</strong"> <span class="review"> ${review.content}</span></li>`
      ).join('') || '<li>No reviews available.</li>'
    }
          </ul>
         </section>
        </section>
       </section>
  `;
  const overlay = modal.querySelector('.modal-overlay');
  const closeButton = modal.querySelector('.modal-close');
  overlay?.addEventListener('click', () => closeModal(modal));
  closeButton?.addEventListener('click', () => closeModal(modal));
  const modalContent = modal.querySelector('.modal-content');
  modalContent?.addEventListener('click', (e) => e.stopPropagation());
  addModalEvent(modal)
  return modal;
}
export function showModal(modal: HTMLElement) {
  const contentSection = getContentSection();
  contentSection.appendChild(modal);
  document.body.classList.add('no-scroll');
}
export function closeModal(modal: HTMLElement) {
  modal.remove();
  document.body.classList.remove('no-scroll');
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