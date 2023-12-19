'use client'

import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
})

const CreateCourse = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  })
  const { isSubmitting, isValid } = form.formState
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/courses', values)
      router.push(`/course`)
      router.refresh()
      toast.success('Course created')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }
  return (
    <div className='pt-[250px] w-full flex justify-center md:px-0 px-5'>
      <div>
        <h1 className='text-2xl'>강의 이름을 정해주세요.</h1>
        <p className='text-sm text-slate-600'>
          강의 이름을 정하지 못하셧나요? 추후에 수정이 가능하니 걱정하지마세요.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>강의 이름</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder='타이틀'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center gap-x-2'>
              <Link href={'/course'}>
                <Button variant={'ghost'} type='button'>
                  취소
                </Button>
              </Link>
              <Button type='submit' disabled={!isValid || isSubmitting}>
                만들기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreateCourse
