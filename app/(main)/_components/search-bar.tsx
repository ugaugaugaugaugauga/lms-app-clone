'use client'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Search } from 'lucide-react'
import { useState } from 'react'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <div className='relative hidden md:block'>
        <Input className='md:w-[320px] pr-10' />
        <Search
          role='button'
          className='absolute top-2 right-3 hover:opacity-60'
        />
      </div>
      <Search
        onClick={onOpen}
        role='button'
        className='block md:hidden mr-5 hover:opacity-60'
      />
      {isOpen && (
        <div className='absolute left-0 flex items-center w-full h-full z-50 bg-zinc-50 gap-3 px-3'>
          <ArrowLeft
            onClick={onClose}
            role='button'
            className='hover:opacity-60'
          />
          <div className='relative flex-1'>
            <Input
              className='rounded-full'
              placeholder='강의 검색하기 ex)자바, 파이썬'
            />
            <Search
              role='button'
              className='absolute top-2 right-4 hover:opacity-60'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default SearchBar
