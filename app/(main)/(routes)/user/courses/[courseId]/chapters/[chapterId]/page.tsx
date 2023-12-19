import getCurrentUser from '@/actions/get-current-user'
import { redirect } from 'next/navigation'

import db from '@/lib/prismadb'
import Link from 'next/link'
import { ArrowLeft, Eye, LayoutDashboard, Video } from 'lucide-react'
import { IconBadge } from '@/components/icon-badge'
import { ChapterTitleForm } from './_components/chapter-title-form'
import { ChapterDescriptionForm } from './_components/chapter-description-form'
import { ChapterAccessForm } from './_components/chapter-access-form'
import { ChapterVideoForm } from './_components/chapter-video-form'
import { Banner } from '@/components/banner'
import { ChapterActions } from './_components/chapter-actions'

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return redirect('/')

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  })

  if (!chapter) return redirect('/')

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl]

  const totalFields = requiredFields.length
  const completedFields = requiredFields.filter(Boolean).length

  const completionText = `(${completedFields}/${totalFields})`

  const isComplete = requiredFields.every(Boolean)

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant={'warning'}
          label='This chapter is unpublished. It will not be visible in the course'
        />
      )}
      <div className='p-6'>
        <div className='flex items-center justify-center'>
          <div className='w-full'>
            <Link
              href={`/user/courses/${params.courseId}`}
              className='flex items-center text-sm hover:opacity-75 transition bg-6'
            >
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to course setup
            </Link>
            <div className='flex items-center justify-between w-full'>
              <div className='flex flex-col gap-y-2'>
                <h1 className='text-2xl font-medium'>Chapter Creation</h1>
                <span className='text-sm text-slate-700'>
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className='grid gird-cols-1 md:grid-cols-2 gap-6 mt-16'>
          <div className='space-y-4'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard} />
                <h2>Customize your chapter</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={Eye} />
                <h2 className='text-xl'>Access Settings</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className='flex items-center gap-x-2'>
              <IconBadge icon={Video} />
              <h2 className='text-xl'>Add a video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChapterIdPage
