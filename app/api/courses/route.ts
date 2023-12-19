import getCurrentUser from "@/actions/get-current-user"
import db from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const { title } = await req.json()
    const userId = currentUser.id

    const course = await db.course.create({
      data: {
        userId: userId,
        title: title,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSES]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
