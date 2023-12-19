'use client'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ImageOff, User2 } from 'lucide-react'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { convertToKoreanDate } from '@/lib/convert-to-korea-time'
import { useRouter } from 'next/navigation'

interface CourseCardProps {
  courseId: string
  thumbnailUrl?: string | null
  isPublished: boolean
  userImg?: string
  username: string
  title: string
  createdDate: string
}

const CourseCard = ({
  courseId,
  isPublished,
  thumbnailUrl,
  userImg,
  username,
  title,
  createdDate,
}: CourseCardProps) => {
  const router = useRouter()

  const onClick = () => {
    router.push(`/user/courses/${courseId}`)
  }

  return (
    <Card className='border-none shadow-none md:p-3'>
      <CardContent
        onClick={onClick}
        className='relative p-0 cursor-pointer group'
      >
        {!isPublished && (
          <div className='absolute w-full h-10 z-10 bg-yellow-200 flex justify-start items-center group-hover:bg-yellow-300'>
            <p className='pl-3 text-rose-500 text-sm'>
              아직 배포를 하지 않았습니다.
            </p>
          </div>
        )}
        <div className='aspect-video bg-transparent'>
          {thumbnailUrl ? (
            <Image
              src={thumbnailUrl}
              alt='thumbnail'
              fill
              className='object-cover'
            />
          ) : (
            <div className='relative w-full h-full bg-zinc-50 rounded-md flex items-center justify-center'>
              <ImageOff size={32} className='text-zinc-500' />
              <div className='absolute pt-20 text-muted-foreground text-sm'>
                이미지를 등록해주세요.
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className='p-0 py-3 '>
        <div className='flex'>
          <Avatar>
            <AvatarImage src={userImg} />
            <AvatarFallback>
              <User2 />
            </AvatarFallback>
          </Avatar>
          <div className='flex-col ml-4'>
            <h2 className='text-md line-clamp-2'>{title}</h2>
            <p className='text-muted-foreground text-sm'>
              {username}
              <span className='text-sm pl-2'>
                {convertToKoreanDate(createdDate)}
              </span>
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CourseCard
