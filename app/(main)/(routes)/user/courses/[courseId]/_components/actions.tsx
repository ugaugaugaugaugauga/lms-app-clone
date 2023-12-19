'use client'

import { ConfirmModal } from '@/components/modals/confirm-modal'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  disabled: boolean
  courseId: string
  isPublished: boolean
}

export const Actions = ({ disabled, courseId, isPublished }: ActionsProps) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`)
        toast.success('Course unpublished')
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`)
        toast.success('Course published')
      }
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true)

      await axios.delete(`/api/courses/${courseId}`)

      toast.success('Course deleted')
      router.push(`/teacher/courses`)
      router.refresh()
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isMounted) return null

  return (
    <div className='flex items-center gap-x-2'>
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant={'outline'}
        size={'sm'}
      >
        {isPublished ? 'UnPublish' : 'Publish'}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size={'sm'}>
          <Trash className='h-4 w-4' />
        </Button>
      </ConfirmModal>
    </div>
  )
}
