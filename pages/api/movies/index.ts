import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import prismaDb from '@/lib/prismadb';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {

    if (request.method !== 'GET')
        return response.status(405).end()
    try {
        await serverAuth(request, response);
        const movies = await prismaDb.movie.findMany()
        return response.status(200).json(movies)

    } catch (error) {
        return response.status(400).end()
    }
}