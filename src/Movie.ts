export interface Movie {
    backdrop_path: string;
    id: number;
    overview: string;
    title: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
}

export interface Person {
    name: string;
    job?: string;
}

export interface Character {
    cast: Person[];
    crew: Person[];
}

export interface MovieApiResponse {
    results: Movie[];
}