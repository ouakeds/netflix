import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    console.log('lalalalala')
  try {
    if (req.method === 'POST') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;
  
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });
  
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }
  
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
          favoriteMoviesIds: {
            push: movieId
          }
        }
      });
  
      return res.status(200).json(user);
    }

    if (req.method === 'PATCH') {
      const { currentUser } = await serverAuth(req, res);

      const { movieId } = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = currentUser.favoriteMoviesIds.filter((id) => id !== movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: currentUser.email || '',
        },
        data: {
            favoriteMoviesIds: updatedFavoriteIds,
        }
      });

      return res.status(200).json(updatedUser);
    }
    
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}