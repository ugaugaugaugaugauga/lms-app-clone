import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('Unauthorized', { status: 401 })

    const { url } = await req.json()

    const courseOwner = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    })

    if (!courseOwner) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const attachment = await db.attachment.create({
      data: {
        url,
        name: url.split('/').pop(),
        courseId: params.courseId,
      },
    })

    return NextResponse.json(attachment)
  } catch (error) {
    console.log('COURSE_ID_ATTACHMENTS', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
