import { NextResponse } from 'next/server'

import db from '@/lib/prismadb'
import getCurrentUser from '@/actions/get-current-user'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const userId = await getCurrentUser()

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: userId.id,
      },
    })

    if (!course) {
      return new NextResponse('Not found', { status: 404 })
    }

    if (
      !course.title ||
      !course.description ||
      !course.imageUrl ||
      !course.categoryId
    ) {
      return new NextResponse('Missing required fields', { status: 401 })
    }

    const publishedCourse = await db.course.update({
      where: {
        id: params.courseId,
        userId: userId.id,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(publishedCourse)
  } catch (error) {
    console.log('[COURSE_ID_PUBLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
