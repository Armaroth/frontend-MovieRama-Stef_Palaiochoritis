import * as v from 'valibot'
import { genres } from './tmdb-api.js';
import { Movie } from '../utils/typings.js';
export const MovieSchema = v.pipe(
    v.object({
        title: v.string(),
        original_title: v.string(),
        backdrop_path: v.optional(v.nullable(v.string())),
        genre_ids: v.array(v.number()),
        id: v.number(),
        overview: v.string(),
        poster_path: v.optional(v.nullable(v.string())),
        vote_average: v.number(),
        release_date: v.string(),
        popularity: v.number()
    }),
    v.transform((o) => ({
        title: o.title,
        genres: o.genre_ids.map((genreId: number) => {
            const genre = genres.find(g => g.id === genreId);
            return genre;
        }),
        id: o.id,
        originalTitle: o.original_title,
        overview: o.overview,
        posterPath: o.poster_path ? o.poster_path : o.backdrop_path,
        voteAverage: o.vote_average,
        releaseDate: o.release_date,
        popularity: o.popularity
    }))
);
export const MoviesSchema = v.array(MovieSchema);

export const ModalMovieSchema = v.pipe(
    v.object({
        title: v.string(),
        original_title: v.string(),
        genres: v.array(v.object({ id: v.number(), name: v.string() })),
        id: v.number(),
        overview: v.string(),
        backdrop_path: v.nullable(v.string()),
        poster_path: v.nullable(v.string()),
        vote_average: v.number(),
        vote_count: v.number(),
        first_air_date: v.optional(v.string()),
        release_date: v.optional(v.string()),
        videos: v.object({ results: v.array(v.object({ type: v.string(), key: v.string(), site: v.string() })) }),
        reviews: v.optional(
            v.object({
                results: v.array(v.object({
                    author: v.nullable(v.string()),
                    author_details: v.object({
                        rating: v.nullable(v.number())
                    }),
                    content: v.string()
                }))
            })),
        similar: v.object({ results: MoviesSchema }),

    }),
    v.transform((o) => ({
        title: o.title,
        originalTitle: o.original_title,
        overview: o.overview,
        genres: o.genres,
        videos: o.videos.results.filter(video => video.type.includes('Trailer') && video.site.includes('YouTube')),
        posterPath: o.poster_path ? o.poster_path : o.backdrop_path,
        voteAverage: o.vote_average,
        releaseDate: o.first_air_date ? o.first_air_date : o.release_date,
        reviews: o.reviews?.results.slice(0, 2).map(result => {
            return {
                author: result.author,
                rating: result.author_details.rating,
                content: result.content
            }
        }),
        similarMovies: o.similar.results.sort((a: Movie, b: Movie) => b.popularity - a.popularity).slice(0, 4).map(movie => movie)
    }))
);

export const genresSchema = v.array(v.object({
    id: v.string(),
    name: v.string()
}))

