import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismaDb from '@/lib/prismadb';

const addFavoriteMovie = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const { currentUser } = await serverAuth(request, response);
        const { movieId } = request.body;
        const existingMovie = await prismaDb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if (!existingMovie) {
            console.log('not founded')
            return response.status(400).end()
        }

        const updatedUser = await prismaDb.user.update({
            where: {
                email: currentUser.email ?? '',
            },
            data: {
                favoriteMoviesIds: {
                    push: movieId
                }
            }
        })

        return response.status(200).json(updatedUser)

    } catch (error) {
        console.log('error: ', error)
        return response.status(400).end()
    }
}

const deleteFavoriteMovie = async (request: NextApiRequest, response: NextApiResponse) => {

    console.log('inside delete movie')

    try {
        const { currentUser } = await serverAuth(request, response);
        const { movieId } = request.body;
        const existingMovie = await prismaDb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        console.log('existing ?: ', existingMovie)
        if (!existingMovie)
            return response.status(401).end()

        const updatedFavoriteIds =  currentUser.favoriteMoviesIds.filter((favoriteMovieId) => favoriteMovieId !== movieId)
        const updatedUser = await prismaDb.user.update({
            where:{
                email: currentUser.email ?? ''
            },
            data: {
                favoriteMoviesIds: updatedFavoriteIds
            }
        })
        return response.status(200).json(updatedUser)
    } catch (error) {
        console.log('error: ', error)
        return response.status(402).end()
    }
}

const getFavoriteMovies = async (request: NextApiRequest, response: NextApiResponse) => {
    try {
        const { currentUser } = await serverAuth(request, response);
        const movies = await prismaDb.movie.findMany({
            where: {
                id: {
                    in: currentUser?.favoriteMoviesIds
                }
            }
        })
        return response.status(200).json(movies)
    } catch (error) {
        return response.status(400).end()
    }
}


export default async function handler(request: NextApiRequest, response: NextApiResponse) {

    console.log('inside favorites, request.method :', request.method)
    if (request.method === 'POST') {
        console.log('try adding')
        return addFavoriteMovie(request, response)
    }
        
    if (request.method === 'PATCH') {
        return deleteFavoriteMovie(request, response)
    }
    
    if (request.method === 'GET') {
        console.log('try getting movie')
        return getFavoriteMovies(request, response)
    }

    return response.status(405).end()
}