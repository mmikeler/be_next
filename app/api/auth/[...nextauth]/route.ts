import NextAuth from "next-auth"
import YandexProvider from "next-auth/providers/yandex";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const handler = NextAuth({
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
      const upsertUser = await prisma.user.upsert({
        where: { email: user.email || '' },
        update: {},
        create: {
          email: user.email || '',
          name: user.name
        }
      })

      upsertUser ? console.log('new user is added') : console.log('nope')

      // Return true for valid auth
      return true
    },
    async session({ session, user, token }) {
      if (session.user) {
        const u = await prisma.user.findUnique({
          where: {
            email: session.user?.email || ''
          }
        })
        if (u) {
          let modSession = {
            ...session,
            user: {
              ...session.user,
              id: u.id,
              ya_disk_token: u.ya_disk
            }
          }
          return modSession
        }
      }
      return session
    },
  }
})

export { handler as GET, handler as POST }