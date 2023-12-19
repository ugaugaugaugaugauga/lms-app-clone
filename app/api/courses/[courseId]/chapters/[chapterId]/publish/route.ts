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

    const chapter = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
    })

    if (
      !chapter ||
      !chapter.title ||
      !chapter.description ||
      !chapter.videoUrl
    ) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    const publishedChapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        isPublished: true,
      },
    })

    return NextResponse.json(publishedChapter)
  } catch (error) {
    console.log('[CHAPTER_PUBLISH]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
