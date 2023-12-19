import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import db from '@/lib/prismadb'
import { User } from '@prisma/client'

export async function getSession() {
  return await getServerSession(authOptions)
}

export default async function getCurrentUser(): Promise<User | null> {
  try {
    const session = await getSession()
    if (!session?.user?.email) {
      return null
    }

    const currentUser = await db?.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }
    return currentUser
  } catch (error: any) {
    return null
  }
}
