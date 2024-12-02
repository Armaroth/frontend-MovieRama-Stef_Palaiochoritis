import * as v from 'valibot';
import { genres } from './tmdb-api';
export const MovieSchema = v.pipe(
    v.object({
        title: v.string(),
        original_title: v.string(),
        backdrop_path: v.optional(v.nullable(v.string())),
        genre_ids: v.optional(v.array(v.number())),
        id: v.number(),
        overview: v.string(),
        poster_path: v.optional(v.nullable(v.string())),
        vote_average: v.optional(v.number()),
        release_date: v.optional(v.string()),
        popularity: v.optional(v.number())
    }),
    v.transform((o) => ({
        title: o.title,
        genres: o.genre_ids?.map((genreId: number) => {
            const genre = genres.find(g => g.id === genreId);
            return genre;
        }) || [],
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

export const ExpandedMovieSchema = v.pipe(
    v.object({
        id: v.number(),
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
    v.transform(o => {
        const videoId = o.videos.results.filter(v => v.type.includes('Trailer') && v.site.includes('YouTube')).at(0);
        const trailerUrl = `https://www.youtube-nocookie.com/embed/${videoId?.key}`;
        return {
            id: o.id,
            trailer: trailerUrl,
            reviews: o.reviews?.results.slice(0, 2).map(r => ({ author: r.author, rating: r.author_details.rating, content: r.content })) || [],
            similar: o.similar.results.slice(0, 4).map(m => ({ posterPath: m.posterPath, title: m.originalTitle }))
        };
    })
);

export const GenresSchema = v.array(v.object({
    id: v.number(),
    name: v.string()
}))

