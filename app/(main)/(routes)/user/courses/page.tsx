import db from '@/lib/prismadb'
import CourseCard from './_components/course-card'
import getCurrentUser from '@/actions/get-current-user'
import CreateCard from './_components/create-card'

const CoursePage = async () => {
  const currentUser = await getCurrentUser()

  const myCourses = await db.course.findMany({
    take: 3,
    where: {
      userId: currentUser?.id,
    },
  })
  if (!currentUser) return null

  return (
    <div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 transition-all'>
      <CreateCard href='create' />
      {myCourses.map((course) => (
        <CourseCard
          key={course.id}
          isPublished={course.isPublished}
          courseId={course.id}
          thumbnailUrl={course.imageUrl}
          userImg={currentUser.image!}
          username={currentUser.name!}
          title={course.title}
          createdDate={course.createdAt.toISOString()}
        />
      ))}
    </div>
  )
}

export default CoursePage
