import { fetchMovies } from "../api/tmdb-api";
import { Movies } from "../api/valibot";
import { getContentSection, renderLoadingScreen } from "./utils";

export async function renderInTheatersPage() {
    const contentSec = getContentSection();
    renderLoadingScreen(true);
    const movies = await fetchMovies();
    const movieListHtml = createHtml(movies);
    renderLoadingScreen(false);
    contentSec.innerHTML = contentSec.innerHTML + movieListHtml;

}

function createHtml(movies: Movies) {
    const movieListHtml = movies.map(movie => {
        return `
         <section class="movie-card">
          <section class="image-container" >
          <img src="https://image.tmdb.org/t/p/w500/${movie.posterPath}" alt="${movie.title}" />
          </section>
          <section class="movie-data">
          <h3>${movie.title}</h3>
          <p class="overview">${movie.overview}</p>
          <section class='movie-date'> 
          <span class='attribute'>
            Year:
          </span>
           <span class='value'>
           ${movie.releaseDate.split('-')[0]}</section>
          </span>
          <section>
          <span class='attribute'>
          Genres: 
         </span>
          <span class='value'>
          ${movie.genres.map(genre => ` ${genre?.name}`)}
         </span> 
         </section>
         <section>
          <span class='attribute'>
          Vote average:
         </span>
          <span class='value'>
          ${movie.voteAverage.toFixed(1)}
         </span>
          </section>  
          </section>
          </section>
        `;
    }).join('');
    return movieListHtml;
}