import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function PUT(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const { list } = await req.json()

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    })

    if (!ownCourse) return new NextResponse('Unauthorized', { status: 401 })

    for (let item of list) {
      await db.chapter.update({
        where: { id: item.id },
        data: { position: item.position },
      })
    }

    return new NextResponse('Success', { status: 200 })
  } catch (error) {
    console.log('[REORDER]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
