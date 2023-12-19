import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } },
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    })

    if (!ownCourse) return new NextResponse('Unauthorized', { status: 401 })

    const unpublishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: false,
      },
    })

    const publishedChapterInCourse = await db.chapter.findMany({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    })

    if (!publishedChapterInCourse.length) {
      await db.course.update({
        where: {
          id: params.courseId,
        },
        data: {
          isPublished: false,
        },
      })
    }

    return NextResponse.json(unpublishedChapter)
  } catch (error) {
    console.log('[CHAPTER_UNPUBLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
