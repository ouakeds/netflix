import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from '@/lib/serverAuth';

export default async function handler(request: NextApiRequest, res: NextApiResponse) {

    if (request.method !== 'GET')
        return res.status(405).end()
    
    try {
        const {currentUser} = await serverAuth(request, res);
        return res.status(200).json(currentUser);
    } catch (error) {
        console.log('error: ', error)
        return res.status(400).end();
    }

}