import BillBoard from '@/components/Movies/BillBoard';
import MovieList from '@/components/Movies/MovieList/MovieList';
import NavBar from '@/components/NavBar/NavBar';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFavoriteMovies from '@/hooks/useFavoriteMovies';
import useMovieList from '@/hooks/useMovieList';
import { NextPageContext } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

export default function Home() {

  const { data: movies = [] } = useMovieList();
  const { data: favoriteMovies = [] } = useFavoriteMovies();
  const {data: currentUser} = useCurrentUser()

  const router = useRouter();

  useEffect(() => {
    if (!currentUser)
      router.push('/auth')
  }, [currentUser, router]);

  console.log('current user: ', currentUser)
  return (
   <>
    <NavBar />
    <BillBoard/>
    <div className='h-[80vh]'>
      <MovieList title="Tendance Now" movies={movies}/>
        <MovieList title="Favorites Movies" movies={favoriteMovies}/>
    </div>
   </>
  )
}
