import { ModalMovie, Movies } from "./typings";
import { getContentSection } from "./utils";

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
    <section class="button-container">
    <button class="see-more">See more</button>
    </section>
    </section>
    `;
        fragment.appendChild(movieCard);
    });
    movieListHtml.appendChild(fragment);
    return movieListHtml;
}


export function createModal(data: ModalMovie): HTMLElement {
    const modal = document.createElement('section');
    modal.classList.add('modal');
    modal.innerHTML = `
    <div class="modal-overlay"></div>
    <div class="modal-content">
      <button class="modal-close">&times;</button>
      <section class="movie-data">
        <h3>${data.title}</h3>
        <p class="overview">${data.overview ? data.overview : 'No overview available'}</p>
        <div class="additional-info">
          <section class="movie-date">
            <span class="attribute">Year:</span>
            <span class="value">${data.releaseDate?.split('-')[0]}</span>
          </section>
          <section>
            <span class="attribute">Genres:</span>
            <span class="value">${data.genres.map(genre => genre?.name).join(', ')}</span>
          </section>
          <section>
            <span class="attribute">Vote average:</span>
            <span class="value">${data.voteAverage.toFixed(1)}</span>
          </section>

          <h3>Trailer:</h3>
          <div class="trailer-container">
            ${data.videos?.length
            ? `<iframe 
                  class="trailer-player"
                   src="https://www.youtube-nocookie.com/embed/${data.videos[0].key}" 
                  frameborder="0" 
                  allowfullscreen>
                </iframe>`
            : '<p>No trailer available.</p>'
        }
          </div>

          <h3>Similar Movies:</h3>
          <ul class="similar-movies">
            ${data.similarMovies
            .map(
                (movie) =>
                    `<li>
                    <span class="similar-movie-title">${movie.title}</span>
                    <img class="similar-movie-img" src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="Image unavailable"/>
                  </li>`
            )
            .join('') || '<li>No similar movies available.</li>'}
          </ul>
          <h3>Reviews:</h3>
          <ul>
            ${data.reviews?.map(
                (review) =>
                    `<li><strong>${review.author}:</strong> ${review.content}</li>`
            ).join('') || '<li>No reviews available.</li>'
        }
          </ul>
        </div>
      </section>
    </div>
  `;

    const overlay = modal.querySelector('.modal-overlay');
    const closeButton = modal.querySelector('.modal-close');
    overlay?.addEventListener('click', () => closeModal(modal));
    closeButton?.addEventListener('click', () => closeModal(modal));
    return modal;

}
export function showModal(modal: HTMLElement) {
    const contentSection = getContentSection();
    contentSection.appendChild(modal);

}
function closeModal(modal: HTMLElement) {
    modal.remove();
}