import getCurrentUser from '@/actions/get-current-user'
import { NextResponse } from 'next/server'

import db from '@/lib/prismadb'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    })

    if (!course) return new NextResponse('Not found', { status: 404 })

    const unpublishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
      data: {
        isPublished: false,
      },
    })

    return NextResponse.json(unpublishedCourse)
  } catch (error) {
    console.log('[COURSE_ID_UnPUBLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
