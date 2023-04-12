// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import prismaDb from '@/lib/prismadb';
import {compare} from 'bcrypt';
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";

const authorize = async (credentials: Record<"email" | "password", string> | undefined) => {
  if (!credentials?.email || !credentials?.password)
    throw new Error('Email and password required')
  
  const user = await prismaDb.user.findUnique({where: {email: credentials.email}})

  if (!user || !user.hashedPassword) 
    throw new Error('Email does not exist');

  const isCorrectPassword = await compare(credentials.password, user.hashedPassword)

  if (!isCorrectPassword)
    throw new Error('Wrong password.')

  return user;
}

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      authorize
    })
  ],
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismaDb),
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)