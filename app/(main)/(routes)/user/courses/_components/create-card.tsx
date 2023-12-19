'use client'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface CreateCardProps {
  href?: string
}

const CreateCard = ({ href }: CreateCardProps) => {
  const path = usePathname()
  const link = `${path}/${href}`
  return (
    <Link href={link} className='md:p-3 md:pt-3 pb-3'>
      <div className='aspect-video rounded-md flex items-center justify-center group hover:bg-zinc-100 bg-zinc-50'>
        <div className='relative flex justify-center'>
          <Plus
            className=' bg-[#d2b4de] rounded-full group-hover:text-white text-purple-500'
            size={30}
          />
          <div className='absolute whitespace-nowrap top-10 text-zinc-400 text-sm'>
            새 강의 만들기
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CreateCard
