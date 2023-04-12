import MovieCard from "./MovieCard";

interface IMovieList {
    movies: any[];
    title: string;
}

const MovieList: React.FC<IMovieList>  = ({title, movies}) => {

    if (movies.length === 0)
        return <></>
    
    return <div className="px-4 md:px-12 mt-12 mb-12 space-y-12">
        <div className="flex flex-col gap-6">
            <p className="text-white text-md md:text-xl lg:text-4xl font-semibold mb-4">
                {title}
            </p>
            <div className="flex flex-row gap-4">
                {
                    movies.map((movie, index) => {
                        return <MovieCard key={index} movie={movie}/>
                    })
                }
            </div>

        </div>
    </div>
}

export default MovieList;