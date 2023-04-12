import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismaDb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, response: NextApiResponse) {

    if (req.method !== 'GET')
        return response.status(405).end()
    try {
        await serverAuth(req, response);
        const moviesCount = await prismaDb.movie.count();
        const randomIndex = Math.floor(Math.random() * moviesCount);

        const randomMovie = await prismaDb.movie.findMany({
            take: 1,
            skip: randomIndex
        })

        return response.status(200).json(randomMovie[0])

    } catch (error) {
        return response.status(400).end()
    }
}