import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type { NextAuthOptions } from "next-auth"
import { getServerSession } from "next-auth"
import prisma from "@/src/db/prisma";
import YandexProvider from "next-auth/providers/yandex";
import { AuthOptions } from "next-auth";

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    YandexProvider({
      clientId: process.env.YANDEX_CLIENT_ID || '',
      clientSecret: process.env.YANDEX_CLIENT_SECRET || ''
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const upsertUser = await prisma?.user.upsert({
        where: { email: user.email || '' },
        update: {
          last_login: new Date()
        },
        create: {
          email: user.email || '',
          name: user.name,
          points: 1000
        },
        select: {
          id: true
        }
      })

      if (upsertUser?.id) {
        console.log('new user is added or updated');
        // Return true for valid auth
        return true;
      }
      else {
        console.log('error - new user not added')
        return false;
      }
    },
    async session({ session, user, token }) {
      if (session.user) {
        const u = await prisma?.user.findUnique({
          where: {
            email: session.user?.email || ''
          }
        })
        if (u) {
          let modSession = {
            ...session,
            user: {
              ...session.user,
              ...u
            }
          }
          return modSession
        }
      }
      return session
    },
  }
} satisfies NextAuthOptions

// Use it in server contexts
export function auth(...args: [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]] | [NextApiRequest, NextApiResponse] | []) {
  return getServerSession(...args, authOptions)
}