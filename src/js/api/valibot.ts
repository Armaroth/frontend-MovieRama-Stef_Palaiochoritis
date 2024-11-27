import * as v from '../../../node_modules/valibot/dist/index.js'
import { genres } from './tmdb-api.js';
export const MovieSchema = v.pipe(
    v.object({
        title: v.string(),
        original_title: v.string(),
        backdrop_path: v.nullable(v.string()),
        genre_ids: v.array(v.number()),
        id: v.number(),
        overview: v.string(),
        poster_path: v.string(),
        vote_average: v.number(),
    }),
    v.transform((o) => ({
        title: o.title,
        backdropPath: o.backdrop_path,
        genres: o.genre_ids.map((genreId: number) => {
            const genre = genres.find(g => g.id === genreId);
            return genre;
        }),
        id: o.id,
        originalTitle: o.original_title,
        overview: o.overview,
        posterPath: o.poster_path,
        voteAverage: o.vote_average,
    }))
);
export const MoviesSchema = v.array(MovieSchema);

export const genresSchema = v.array(v.object({
    id: v.string(),
    name: v.string()
}))

export type Genres = v.InferOutput<typeof genresSchema>;
export type Movie = v.InferOutput<typeof MovieSchema>;
export type Movies = Movie[];
