import getCurrentUser from '@/actions/get-current-user'
import db from '@/lib/prismadb'
import { NextResponse } from 'next/server'

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return new NextResponse('UnAuthorized', { status: 401 })

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: currentUser.id,
      },
    })

    if (!course) {
      return new NextResponse('Not found', { status: 404 })
    }

    const deletedCourse = await db.course.delete({
      where: {
        id: params.courseId,
      },
    })

    return NextResponse.json(deletedCourse)
  } catch (error) {
    console.log('[COURSE_ID_DELETE]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } },
) {
  try {
    const currentUser = await getCurrentUser()
    const { courseId } = params
    const values = await req.json()

    if (!currentUser) return new NextResponse('UnAuthorized', { status: 401 })

    const course = await db.course.update({
      where: {
        id: courseId,
        userId: currentUser.id,
      },
      data: {
        ...values,
      },
    })

    return NextResponse.json(course)
  } catch (error) {
    console.log('[COURSE_ID]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
