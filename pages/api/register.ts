// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import bcrypt from 'bcrypt';
import prismaDb from '@/lib/prismadb';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  if (request.method !== 'POST') {
    return response.status(405).end()
  }

  try {
    const {email, password, name} = request.body

    const existingUser = await prismaDb.user.findUnique({where: {email: email}})

    if (existingUser) {
      return response.status(422).json({error: 'Account already created.'})
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismaDb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    })  
    response.status(200).json(user)
  } catch (error) {
    console.log('error: ', error)
    return response.status(400).end()
  }
}