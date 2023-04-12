import useCurrentUser from '@/hooks/useCurrentUser';
import useFavoriteMovies from '@/hooks/useFavoriteMovies';
import { patchRequest, postRequest } from '@/lib/fetcher';
import { useCallback, useMemo } from 'react';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';

interface IFavoriteButton {
    movieId: string;
}

const FavoriteButton: React.FC<IFavoriteButton> = ({movieId}) => {

    const { mutate: mutateFavorites } = useFavoriteMovies();
    const { data: currentUser, mutate} = useCurrentUser();

    const isFavorite = useMemo(() => {
        const favoriteMoviesIds = currentUser?.favoriteMoviesIds || [];
        return favoriteMoviesIds.includes(movieId)
    }, [currentUser, movieId])

    const toggleFavorites = useCallback(async () => {
        let response;

        if (isFavorite) {
            response = await patchRequest('/api/movies/favorites', {movieId})
        } else {
            response = await postRequest('/api/movies/favorites', {movieId})
        }

        const updatedFavoriteIds = response?.data?.favoriteMoviesIds;

        mutate({
            ...currentUser,
            favoriteIds: updatedFavoriteIds
        })
        mutateFavorites()
    
    }, [currentUser, movieId, isFavorite, mutate, mutateFavorites])

    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus
    return (
        <div className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300" onClick={toggleFavorites}>
            <Icon className='text-white' size={30}/>
        </div>
    )
}

export default FavoriteButton;