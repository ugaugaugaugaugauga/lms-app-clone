import ThumbnailCard from '@/components/thumbnail-card'
import db from '@/lib/prismadb'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const courses = await db.course.findMany({
    take: 10,
    where: {
      isPublished: true,
    },
  })

  return (
    <div className='flex flex-col md:p-5'>
      <Link href={'/user/learning'} className='flex w-24 hover:text-zinc-500'>
        <h2 className='font-bold text-xl'>내 학습</h2>
        <ChevronRight />
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 pt-5'>
        {courses.map((course) => {
          return (
            <ThumbnailCard
              key={course.id}
              courseId={course.id}
              userId={course.userId}
              thumbnailUrl={course.imageUrl!}
              title={course.title}
              createdDate={course.createdAt.toISOString()}
            />
          )
        })}
      </div>

      <div className='flex py-5'>
        <h2 className='font-bold text-xl'>추천 영상</h2>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5'>
        {courses.map((course) => {
          return (
            <ThumbnailCard
              key={course.id}
              courseId={course.id}
              userId={course.userId}
              thumbnailUrl={course.imageUrl!}
              title={course.title}
              createdDate={course.createdAt.toISOString()}
            />
          )
        })}
      </div>
    </div>
  )
}
