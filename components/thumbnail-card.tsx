import Image from 'next/image'
import { Card, CardContent, CardFooter } from './ui/card'
import db from '@/lib/prismadb'
import { convertToKoreanDate } from '@/lib/convert-to-korea-time'
import Link from 'next/link'

interface ThumbnailCardProps {
  thumbnailUrl: string
  userId: string
  courseId: string
  title: string
  createdDate: string
}
export const ThumbnailCard = async ({
  thumbnailUrl,
  userId,
  courseId,
  title,
  createdDate,
}: ThumbnailCardProps) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      image: true,
    },
  })

  return (
    <Card className='border-none shadow-none'>
      <Link href={`/courses/${courseId}`}>
        <CardContent className='relative aspect-video clear-none cursor-pointer'>
          <Image
            src={thumbnailUrl}
            alt={'thumbnail'}
            fill
            className='object-cover rounded-xl '
          />
        </CardContent>
      </Link>
      <CardFooter className='p-0 pt-3 items-start'>
        <Image
          src={user?.image ? user?.image : '/placeholder.jpg'}
          alt='image'
          width={40}
          height={40}
          className='rounded-full cursor-pointer'
        />
        <div className='flex flex-col'>
          <div className='ml-2 line-clamp-2 cursor-pointer'>{title}</div>
          <div className='flex text-muted-foreground text-sm'>
            <p className='pl-2'>{user?.name}</p>
            <span className='pl-2'>{convertToKoreanDate(createdDate)}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default ThumbnailCard
